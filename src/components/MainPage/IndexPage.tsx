import "./indexPage.scss";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { fetchAllUsers } from "../../store/actions/userActions";
import {
  fetchAllPosts,
  openPostDetailsModal,
  setIsPostsFetched,
} from "../../store/actions/postActions";
import Stories from "../Stories/Stories";
import Posts from "../Post/PostList/Posts";
import UserCard from "../User/UserCard/UserCard";

const IndexPage = () => {
  const dispatch = useDispatch();
  const { users, currentUser } = useTypedSelector((state) => state.userState);
  const { posts, isPostsFetched } = useTypedSelector(
    (state) => state.postsState
  );
  const loca = useLocation();
  useEffect(() => {
    dispatch(fetchAllUsers());
    dispatch(fetchAllPosts());
    if (loca.hash.includes("#")) {
      dispatch(openPostDetailsModal(+loca.hash.split("#")[1], true));
    }
    return () => {
      dispatch(setIsPostsFetched(false));
    };
  }, []);
  return currentUser ? (
    <div className="main-container">
      <div className="main-container-posts">
        <Stories users={users} />
        <Posts feed={posts} isPostsFetched={isPostsFetched} />
      </div>
      <div className="aside-user-card">
        <UserCard isProfilePage={false} />
      </div>
    </div>
  ) : (
    <div className="main-container unauthorized">
      <div className="main-container-posts">
        <Stories users={users} />
        <Posts feed={posts} isPostsFetched={isPostsFetched} />
      </div>
    </div>
  );
};

export default IndexPage;
