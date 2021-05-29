import { Dispatch } from "redux";
import firebase from "../../firebase";
import {
  FETCH_USER,
  FETCH_USER_POSTS,
  FETCH_USER_FOLLOWING,
  FETCH_USERS,
  FETCH_USERS_FOLLOWING_POSTS,
  CLEAR_DATA,
  FETCH_USER_LIKES_COMMENTS,
  DELETE_USER_POST,
  EDIT_USER,
  LinkstaDispatchTypes,
  GeneralUser,
  CurrentUser,
  Post,
  FETCH_ALL_POSTS,
  OPEN_CLOSE_POST_DETAILS
} from "../actionTypes";

export const logout = () => (dispatch: Dispatch<LinkstaDispatchTypes>) => {
  firebase.auth().signOut();
  dispatch({ type: CLEAR_DATA });
};

export const fetchUser = () => (dispatch: Dispatch<LinkstaDispatchTypes>) => {
  firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser?.uid)
    .get()
    .then((snapshot) => {
      if (snapshot.exists) {
        const data = snapshot.data() || {};
        const user = {
          avatar: data.avatar,
          email: data.email,
          name: data.name,
          surname: data.surname,
          nickname: data.nickname,
          job: data.job,
          description: data.description,
        };
        dispatch({ type: FETCH_USER, payload: user });
      } else {
        console.log("does not exist");
      }
    });
};

export const fetchUserPosts =
  () => (dispatch: Dispatch<LinkstaDispatchTypes>) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(firebase.auth().currentUser?.uid)
      .collection("userPosts")
      .orderBy("creation", "asc")
      .get()
      .then((snapshot) => {
        let posts = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          const post = {
            id,
            creation: data.creation,
            description: data.description,
            image: data.image,
            likesCount: data.likesCount,
            commentsCount: data.commentsCount,
          };
          return post;
        });
        dispatch({ type: FETCH_USER_POSTS, payload: posts });
      });
  };

export const deleteUserPost =
  (postId: string) => (dispatch: Dispatch<LinkstaDispatchTypes>) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(firebase.auth().currentUser?.uid)
      .collection("userPosts")
      .doc(postId)
      .delete()
      .then(() => {
        dispatch({ type: DELETE_USER_POST, payload: { postId } });
      });
  };

export const editUser =
  (user: CurrentUser) => (dispatch: Dispatch<LinkstaDispatchTypes>) => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser?.uid)
      .update({
        ...user,
      })
      .then(() => {
        dispatch({ type: EDIT_USER, payload: user });
      });
  };

// export const fetchUserFollowing = () => (dispatch:Dispatch<LinkstaDispatchTypes>, getState:Function) => {
//     firebase.firestore()
//         .collection('following')
//         .doc(firebase.auth().currentUser?.uid)
//         .collection('userFollowing')
//         .onSnapshot((snapshot) => {
//             let following = snapshot.docs.map(doc => {
//                 return doc.id
//             })
//             dispatch({ type: FETCH_USER_FOLLOWING, payload: following })
//             for(let i = 0; i < following.length; i++){
//                 // @ts-ignore: Unreachable code error
//                 dispatch(fetchUsersData(following[i], true))
//             }
//             // @ts-ignore: Unreachable code error
//             //dispatch(fetchUsersData(firebase.auth().currentUser?.uid, true))
//         })
// }

// export const fetchUsersData = (uid: string, getPosts:boolean) => (dispatch:Dispatch<LinkstaDispatchTypes>, getState:Function) => {
//         const found = getState().usersState.users.some((el:GeneralUser) => el.uid === uid);
//         if (!found) {
//             firebase.firestore()
//                 .collection('users')
//                 .doc(uid)
//                 .get()
//                 .then((snapshot) => {
//                     if (snapshot.exists) {
//                         const data = snapshot.data() || {};
//                         const user = {
//                             uid: snapshot.id,
//                             avatar: data.avatar,
//                             email: data.email,
//                             name: data.name,
//                             surname: data.surname,
//                             nickname: data.nickname,
//                             job: data.job,
//                             description: data.description
//                         }
//                         dispatch({ type: FETCH_USERS, payload: user })
//                     }
//                     else {
//                         console.log('does not exist')
//                     }
//                 })
//                 if(getPosts){
//                     // @ts-ignore: Unreachable code error
//                     dispatch(fetchUsersFollowingPosts(uid))
//                 }
//         }
// }

// export const fetchUsersFollowingPosts = (uid:string) => (dispatch:Dispatch<LinkstaDispatchTypes>, getState:Function) => {
//     firebase.firestore()
//         .collection('posts')
//         .doc(uid)
//         .collection('userPosts')
//         .orderBy('creation', 'asc')
//         .get()
//         .then((snapshot) => {
//            let _uid = uid;
//            // @ts-ignore: Unreachable code error
//             if(snapshot.query.EP){
//                // @ts-ignore: Unreachable code error
//                 _uid = snapshot.query.EP.path.segments[1];
//             }
//             const user = getState().usersState.users.find((el:GeneralUser) => el.uid === _uid);
//             let posts = snapshot.docs.map(doc => {
//                 const data = doc.data();
//                 const id = doc.id;
//                 const post = {
//                     id,
//                     creation: data.creation,
//                     description: data.description,
//                     image: data.image,
//                     likesCount: data.likesCount,
//                     commentsCount: data.commentsCount,
//                     currentUserLike: false
//                 }
//                 return { ...post, user }
//             })
//             for(let i = 0; i< posts.length; i++){
//                 // @ts-ignore: Unreachable code error
//                 dispatch(fetchUsersFollowingLikes(_uid, posts[i].id))
//             }

//             dispatch({ type: FETCH_USERS_FOLLOWING_POSTS, payload: {posts, uid: _uid} })
//         })
// }

// export const fetchUsersFollowingLikes = (uid: string, postId: string) => (dispatch:Dispatch<LinkstaDispatchTypes>) => {
//     const userPostsCollection = firebase.firestore()
//         .collection('posts')
//         .doc(uid)
//         .collection('userPosts');

//     userPostsCollection
//         .doc(postId)
//         .collection('likes')
//         .doc(firebase.auth().currentUser?.uid)
//         .onSnapshot((snapshot) => {
//             let _postId = postId;
//             // @ts-ignore: Unreachable code error
//              if(snapshot.ZE){
//                 // @ts-ignore: Unreachable code error
//                 _postId = snapshot.ZE.path.segments[3];
//              }
//             let currentUserLike = false;
//             if(snapshot.exists){
//                 currentUserLike = true;
//             }
//             let likesCount = 0;
//             let commentsCount = 0;
//             userPostsCollection
//             .doc(postId)
//             .onSnapshot(snapshot => {
//                 if (snapshot.exists) {
//                     const post = snapshot.data() || {}
//                     likesCount=post.likesCount;
//                     commentsCount=post.commentsCount;
//                     dispatch({ type: FETCH_USER_LIKES_COMMENTS, payload: { postId:_postId, currentUserLike, likesCount, commentsCount } })
//                 }
//             })
//         })
// }

export const fetchAllPosts =
  () => (dispatch: Dispatch<LinkstaDispatchTypes>, getState: Function) => {
    firebase
      .firestore()
      .collection("users")
      .get()
      .then((users) => {
        const usersIds = users.docs.map((e) => e.id);
        for (let i = 0; i < usersIds.length; i++) {
          // @ts-ignore: Unreachable code error
          dispatch(fetchUsersData(usersIds[i], true));
        }
      });
  };
export const fetchUsersData =
  (uid: string, getPosts: boolean) =>
  (dispatch: Dispatch<LinkstaDispatchTypes>, getState: Function) => {
    const found = getState().usersState.users.some(
      (el: GeneralUser) => el.uid === uid
    );
    if (!found) {
      firebase
        .firestore()
        .collection("users")
        .doc(uid)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            const data = snapshot.data() || {};
            const user = {
              uid: snapshot.id,
              avatar: data.avatar,
              email: data.email,
              name: data.name,
              surname: data.surname,
              nickname: data.nickname,
              job: data.job,
              description: data.description,
            };
            dispatch({ type: FETCH_USERS, payload: user });
          } else {
            console.log("does not exist");
          }
        });
      if (getPosts) {
        // @ts-ignore: Unreachable code error
        dispatch(fetchUsersPosts(uid));
      }
    }
  };

export const fetchUsersPosts =
  (uid: string) =>
  (dispatch: Dispatch<LinkstaDispatchTypes>, getState: Function) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(uid)
      .collection("userPosts")
      .orderBy("creation", "asc")
      .get()
      .then((snapshot) => {
        let _uid = uid;
        // @ts-ignore: Unreachable code error
        if (snapshot.query.EP) {
          // @ts-ignore: Unreachable code error
          _uid = snapshot.query.EP.path.segments[1];
        }
        const user = getState().usersState.users.find(
          (el: GeneralUser) => el.uid === _uid
        );
        let posts = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          const post = {
            id,
            creation: data.creation,
            description: data.description,
            image: data.image,
            likesCount: data.likesCount,
            commentsCount: data.commentsCount,
            currentUserLike: false,
          };
          return { ...post, user };
        });
        for (let i = 0; i < posts.length; i++) {
          // @ts-ignore: Unreachable code error
          dispatch(fetchUsersLikes(_uid, posts[i].id));
        }

        dispatch({ type: FETCH_ALL_POSTS, payload: { posts, uid: _uid } });
      });
  };

export const fetchUsersLikes =
  (uid: string, postId: string) =>
  (dispatch: Dispatch<LinkstaDispatchTypes>) => {
    const userPostsCollection = firebase
      .firestore()
      .collection("posts")
      .doc(uid)
      .collection("userPosts");

    userPostsCollection
      .doc(postId)
      .collection("likes")
      .doc(firebase.auth().currentUser?.uid)
      .onSnapshot((snapshot) => {
        let _postId = postId;
        // @ts-ignore: Unreachable code error
        if (snapshot.ZE) {
          // @ts-ignore: Unreachable code error
          _postId = snapshot.ZE.path.segments[3];
        }
        let currentUserLike = false;
        if (snapshot.exists) {
          currentUserLike = true;
        }
        let likesCount = 0;
        let commentsCount = 0;
        userPostsCollection.doc(postId).onSnapshot((snapshot) => {
          if (snapshot.exists) {
            const post = snapshot.data() || {};
            likesCount = post.likesCount;
            commentsCount = post.commentsCount;
            dispatch({
              type: FETCH_USER_LIKES_COMMENTS,
              payload: {
                postId: _postId,
                currentUserLike,
                likesCount,
                commentsCount,
              },
            });
          }
        });
      });
  };

export const setPostDetailsOpened =
  (isOpen:boolean, postId: string) => (dispatch: Dispatch<LinkstaDispatchTypes>) => {
    dispatch({ type: OPEN_CLOSE_POST_DETAILS, payload: { isOpen, postId } });
};
