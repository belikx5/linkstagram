import firebase from './index'
import { SignInProviders } from '../ts/enums'

export const onFollow = (uid: string) => {
    firebase.firestore()
    .collection('following')
    .doc(firebase.auth().currentUser?.uid)
    .collection('userFollowing')
    .doc(uid)
    .set({})    
}

export const onUnFollow = (uid: string) => {
    firebase.firestore()
    .collection('following')
    .doc(firebase.auth().currentUser?.uid)
    .collection('userFolowing')
    .doc(uid)
    .delete()    
}

export const savePhoto = async (file: File):Promise<string> => {
    const photoUri = `post/${firebase.auth().currentUser?.uid}/${Math.random().toString(36)}`;
    const fileRef = firebase.storage().ref().child(photoUri);
    await fileRef.put(file)
    return await fileRef.getDownloadURL()
} 

export const fetchComments = (uid: string, postId: string, callback:Function) => {
    firebase.firestore()
        .collection('posts')
        .doc(uid)
        .collection('userPosts')
        .doc(postId)
        .collection('comments')
        .orderBy('creation', 'desc')
        .get()
        .then(snapshot => {
            let comments = snapshot.docs.map(doc => {
                const data = doc.data()
                const id = doc.id
                return { id, ...data }
            })
            callback(comments) 
        })
}


export const sendComment = (uid: string, postId: string, comment: string) => {
    firebase.firestore()
        .collection('posts')
        .doc(uid)
        .collection('userPosts')
        .doc(postId)
        .collection('comments')
        .add({
          creator: firebase.auth().currentUser?.uid,
          text: comment,
          creation: firebase.firestore.FieldValue.serverTimestamp()
        });

        updatePostField(uid, postId, 'commentsCount', 1);
}

export const createPost = (image:string, description: string): Promise<any> => {
    return firebase.firestore()
        .collection('posts')
        .doc(firebase.auth().currentUser?.uid)
        .collection('userPosts')
        .add({
            image,
            description,
            likesCount: 0,
            commentsCount: 0,
            creation: firebase.firestore.FieldValue.serverTimestamp()
        })
}


export const onLikeClick = (uid: string, postId: string) => {
    const userPostsCollection = firebase.firestore()
        .collection('posts')
        .doc(uid)
        .collection('userPosts');

    userPostsCollection
        .doc(postId)
        .collection('likes')
        .doc(firebase.auth().currentUser?.uid)
        .set({});

        updatePostField(uid, postId, 'likesCount', 1);
}

export const onDislikeClick = (uid: string, postId: string) => {
    const userPostsCollection = firebase.firestore()
        .collection('posts')
        .doc(uid)
        .collection('userPosts');
    
    userPostsCollection
        .doc(postId)
        .collection('likes')
        .doc(firebase.auth().currentUser?.uid)
        .delete();
        
        updatePostField(uid, postId, 'likesCount',-1);
}

const updatePostField = (uid: string, postId: string, field:string ,newValue: number) => {
    const userPostsCollection = firebase.firestore()
        .collection('posts')
        .doc(uid)
        .collection('userPosts');
    
    userPostsCollection
        .doc(postId)
        .get()
        .then(snapshot => {
            if (snapshot.exists) {
                const post = snapshot.data() || {}
                userPostsCollection
                .doc(postId)
                .update({
                    ...post,
                    [field]: post[field] + newValue
                }).then(()=> {
                    console.log("successful update")
                }).catch(()=> {
                    console.log("error while update")
                })
            }
        })
}


export const signIn = async (email: string, password: string) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
}

export const signUp = async (email: string, nickname: string, password: string) => {
    const auth = firebase.auth();
    return auth.createUserWithEmailAndPassword(email, password)
    .then((res:any) => {
        firebase.firestore()
        .collection('users')
        .doc(res.user.uid)
        .set({
            name: 'Your name',
            surname: 'Your surname',
            avatar: '',
            nickname,
            email,
            job: 'Your job',
            description: 'Your description'
        })
    })

}

export const signInWithProvider = async (provider: SignInProviders ) => {
    let authProvider;
    if(provider === SignInProviders.Google)
        authProvider = new firebase.auth.GoogleAuthProvider();
    else 
        authProvider = new firebase.auth.FacebookAuthProvider();

    return firebase.auth()
    .signInWithPopup(authProvider)
    .then((res:any) => {
        const userInfo = res.additionalUserInfo;
        if(userInfo?.isNewUser && provider === SignInProviders.Google){
            firebase.firestore()
                .collection('users')
                .doc(res.user?.uid)
                .set({
                    name: userInfo.profile?.given_name || 'Your name',
                    surname: userInfo.profile?.family_name || 'Your surname',
                    avatar: userInfo.profile?.picture || '',
                    nickname: userInfo.profile?.email,
                    email: userInfo.profile?.email,
                    job: 'Your job',
                    description: 'Your description'
                })
        }else if(userInfo?.isNewUser && provider === SignInProviders.Facebook) {
            firebase.firestore()
                .collection('users')
                .doc(res.user?.uid)
                .set({
                    name: userInfo.profile?.first_name || 'Your name',
                    surname: userInfo.profile?.last_name || 'Your surname',
                    avatar: userInfo.profile?.picture.data.url || '',
                    nickname: userInfo.profile?.email,
                    email: userInfo.profile?.email,
                    job: 'Your job',
                    description: 'Your description'
                })
        }else{
            Promise.resolve()
        }
        
    })
}


export const subscribeToAllUsers = () => {
    firebase.firestore()
    .collection('users')
    .get()
    .then((res)=> {
        res.docs.map(doc => {
            onFollow(doc.id)
        })
    })
}
