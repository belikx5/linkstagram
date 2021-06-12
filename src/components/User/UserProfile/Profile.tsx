import "./profile.scss";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import UserCard from "../UserCard/UserCard";
import OwnerPostList from "../../Post/OwnerPostList/OwnerPostList";
import Loading from "../../ui/Loading/Loading";
import UserCardProfile from "../UserCard/UserCardProfile";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { fetchCurrentUser } from "../../../store/actions/userActions";
import { fetchPostByUser } from "../../../store/actions/postActions";

type ProfileProps = {};

const Profile = (props: ProfileProps) => {
  const currentUser = useTypedSelector((state) => state.userState.currentUser);
  const postsByUser = useTypedSelector((state) => state.postsState.postsByUser);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!currentUser) {
      dispatch(fetchCurrentUser());
    }
  }, []);
  useEffect(() => {
    if (currentUser) {
      dispatch(fetchPostByUser(currentUser.username));
    }
  }, [currentUser]);

  const userCardProps = {
    isProfilePage: true,
  };

  if (!currentUser && !postsByUser.length) {
    return <Loading />;
  }

  return (
    <>
      <div className="profile mobile">
        <UserCard {...userCardProps} />
        <OwnerPostList posts={postsByUser} />
      </div>
      <div className="profile desktop">
        <UserCardProfile {...userCardProps} />
        <OwnerPostList posts={postsByUser} />
      </div>
    </>
  );
};

export default Profile;
