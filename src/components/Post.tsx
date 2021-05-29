import "../styles/post.scss";
import React, { useEffect, useState } from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { formateDate } from "../services/moment";
import {
  CurrentUser,
  LinkstaDispatchTypes,
  PostDetailsOpen,
  UserPostHybrid,
} from "../store/actionTypes";
import { setPostDetailsOpened } from "../store/actions/userActions";
import { UserIconSize } from "../ts/enums";
import { onLikeClick, onDislikeClick } from "../firebase/helpers";
import { RootStore } from "../store";
import firebase from "../firebase";
import UserIcon from "../components/UserIcon";
import PostDetails from "../containers/PostDetails";
import DropdownMenu from "./DropdownMenu";
import Modal from "./Modal";

type PostProps = {
  postData: UserPostHybrid;
  currentUser: CurrentUser | null;
  isPostDetailsOpened: PostDetailsOpen;
  setPostDetailsOpened: Function;
};

const Post = ({
  postData,
  currentUser,
  isPostDetailsOpened,
  setPostDetailsOpened,
}: PostProps) => {
  const handleLikeClick = () => {
    postData.currentUserLike
      ? onDislikeClick(postData.user.uid, postData.id)
      : onLikeClick(postData.user.uid, postData.id);
  };
  const setModalOpen = (value: boolean) => {
    if (value) setPostDetailsOpened(value, postData.id);
    else setPostDetailsOpened(value, "");
  };
  const postDetailsProps = {
    openModal: setModalOpen,
    postData,
    handleLikeClick,
  };
  return (
    <>
      {isPostDetailsOpened.isOpen &&
        isPostDetailsOpened.postId === postData.id && (
          <Modal modalMarginTop={20} openModal={setModalOpen}>
            <PostDetails {...postDetailsProps} />
          </Modal>
        )}
      <div className="post">
        <div className="post-header">
          <div>
            {postData.user.uid === firebase.auth().currentUser?.uid ? (
              <UserIcon
                icon={currentUser?.avatar}
                size={UserIconSize.Small}
              />
            ) : (
              <UserIcon
                icon={postData.user.avatar}
                size={UserIconSize.Small}
              />
            )}

            <div className="post-header-data">
              <p>{postData.user.nickname}</p>
              <p>{formateDate(postData.creation.seconds)}</p>
            </div>
          </div>
          {postData.user.uid === firebase.auth().currentUser?.uid && (
            <DropdownMenu postId={postData.id} />
            // <img className="post-header-menu" src="../../assets/menu.svg"/>
          )}
        </div>
        <div>
          <img
            onClick={() => setModalOpen(true)}
            className="post-image"
            src={postData.image || "https://i.pravatar.cc/560?img=13"}
          />
          <p className="post-description">{postData.description}</p>
        </div>
        <div className="post-actions">
          <div>
            <div className="post-action" onClick={handleLikeClick}>
              <img
                src={`../../assets/like-${
                  postData.currentUserLike ? "red" : "grey"
                }.svg`}
              />
              <p>{postData.likesCount}</p>
            </div>
            <div
              className="post-action"
              onClick={() => setModalOpen(true)}>
              <img src="../../assets/comment.svg" />
              <p>{postData.commentsCount}</p>
            </div>
          </div>
          <div
            className="post-action"
            onClick={() => navigator.clipboard.writeText(postData.description)}>
            <p>Share</p>
            <img src="../../assets/arrow-right.svg" />
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: RootStore) => ({
  currentUser: state.userState.currentUser,
  isPostDetailsOpened: state.userState.isPostDetailsOpened,
});

const mapDispatchToProps = (dispatch: Dispatch<LinkstaDispatchTypes>) =>
  bindActionCreators(
    {
      setPostDetailsOpened,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Post);
