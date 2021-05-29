import "../styles/indexPage.scss";
import React, { useEffect, useState } from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import {
  fetchUser,
  fetchUserPosts,
  // fetchUserFollowing,
  editUser,
  fetchAllPosts,
} from "../store/actions/userActions";
import {
  CurrentUser,
    GeneralUser,
  LinkstaDispatchTypes,
  Post,
  UserPostHybrid,
} from "../store/actionTypes";
import { RootStore } from "../store";
import firebase from "../firebase/index";
import history from "../services/history";

import Stories from "../components/Stories";
import Posts from "../components/Posts";
import UserCard from "./UserCard";

type IndexPageProps = {
  feed: UserPostHybrid[];
  users: GeneralUser[];
  userFollowingLoaded: number;
  currentUser: CurrentUser | null;
  following: string[];
  fetchUser: Function;
  fetchUserPosts: Function;
  // fetchUserFollowing: Function,
  editUser: Function;
  fetchAllPosts: Function;
};

const IndexPage = (props: IndexPageProps) => {
  const {
    fetchUser,
    fetchUserPosts,
    editUser,
    fetchAllPosts,
    // fetchUserFollowing,
    userFollowingLoaded,
    feed,
    users,
    following,
    currentUser,
  } = props;
  const [posts, setPosts] = useState<UserPostHybrid[]>([]);
  
  useEffect(() => {
    fetchUser();
    //fetchUserPosts()
    //fetchUserFollowing()
    fetchAllPosts();
  }, []);

  useEffect(() => {
    feed.sort((a, b) => b.creation.seconds - a.creation.seconds);
    setPosts(feed);
  }, [feed]);

  const uid = firebase.auth().currentUser?.uid || "";
  // if(!uid){
  //     history.push('/signin')
  // }
  const user = currentUser
    ? currentUser
    : {
        avatar: "",
        email: "",
        name: "",
        surname: "",
        nickname: "",
        job: "",
        description: "",
      };
  const userCardProps = {
    isProfilePage: false,
    user: { ...user, uid },
    // following,
    // editUser,
  };

  return (
      uid ? 
    <div className="main-container">
      <div className="main-container-posts">
        <Stories users={users} />
        <Posts feed={posts} />
      </div>
        <div className="aside-user-card">
          <UserCard {...userCardProps} />
        </div>
    </div>
    : 
    <div className="main-container unauthorized">
      <div className="main-container-posts">
        <Stories users={users} />
        <Posts feed={posts} />
      </div>
      </div>
  );
};

const mapStateToProps = (state: RootStore) => {
  return {
    // userFollowingLoaded: state.usersState.userFollowingLoaded,
    feed: state.usersState.feed,
    users: state.usersState.users,
    currentUser: state.userState.currentUser,
    // following: state.userState.following,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<LinkstaDispatchTypes>) =>
  bindActionCreators(
    {
      fetchUser,
      fetchUserPosts,
      // fetchUserFollowing,
      editUser,
      fetchAllPosts,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
