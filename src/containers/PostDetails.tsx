import "../styles/postDetails.scss";
import React, { useEffect, useState } from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { fetchUsersData } from "../store/actions/userActions";
import { fetchComments, sendComment } from "../firebase/helpers";
import { RootStore } from "../store";
import firebase from "../firebase";
import {
  PostComment,
  CurrentUser,
  GeneralUser,
  LinkstaDispatchTypes,
  UserPostHybrid,
} from "../store/actionTypes";
import { UserIconSize } from "../ts/enums";

import UserIcon from "../components/UserIcon";
import Comment from "../components/Comment";

type PostDetailsProps = {
  postData: UserPostHybrid;
  openModal: Function;
  currentUser: CurrentUser | null;
  users: GeneralUser[];
  fetchUsersData: Function;
  handleLikeClick: Function;
};

const PostDetails = ({
  postData,
  openModal,
  currentUser,
  users,
  fetchUsersData,
  handleLikeClick,
}: PostDetailsProps) => {
  const [comments, setComments] = useState<PostComment[]>([]);
  const [text, setText] = useState("");
  const [update, setUpdate] = useState(0);
  const onCommentSend = () => {
    sendComment(postData.user.uid, postData.id, text);
    //setUpdate(update+1)
  };
  const matchUserToComment = (comments: PostComment[]) => {
    comments.forEach((comment) => {
      const user = users.find((u) => u.uid === comment.creator);

      if (user === undefined) {
        fetchUsersData(comment.creator, false);
      } else {
        if (user.email === currentUser?.email) {
          user.avatar = currentUser?.avatar;
        }
        comment.user = user;
      }
    });
    setComments(comments);
  };
  const requireAuthForAction = (action: Function) => {
    const uid = firebase.auth().currentUser?.uid;
    if (uid) {
      action();
    } else return;
  };
  useEffect(() => {
    //matchUserToComment(fetchComments(postData.user.uid, postData.id, (comments)=> matchUserToComment(comments)))
    fetchComments(postData.user.uid, postData.id, (comments: PostComment[]) =>
      matchUserToComment(comments)
    );
  }, [postData.id, update, currentUser]);
  return (
    <div className="post-details">
      <img className="post-details-image" src={postData.image} />
      <div className="post-details-data">
        <div className="post-details-header">
          <div>
            <UserIcon
              icon={postData.user.avatar}
              size={UserIconSize.Small}
            />
            <p>{postData.user.nickname}</p>
          </div>
          <img
            className="post-details-header-close"
            src="../../assets/close.svg"
            onClick={() => openModal(false)}
          />
        </div>
        <div className="post-details-comments">
          {comments.map((comment, index) => {
            return <Comment key={index} data={comment} />;
          })}
        </div>
        <div className="post-details-likes" onClick={() => requireAuthForAction(handleLikeClick)}>
          {/* > */}
          <img
            src={`../../assets/like-${
              postData.currentUserLike ? "red" : "grey"
            }.svg`}
          />
          <p className="post-details-total-likes">{postData.likesCount}</p>
        </div>
        <div className="post-details-actions">
          <textarea
            placeholder="Add a comment..."
            className="post-details-input-field"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            className="post-details-action-button"
            onClick={() => requireAuthForAction(onCommentSend)}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootStore) => ({
  currentUser: state.userState.currentUser,
  users: state.usersState.users,
});

const mapDispatchToProps = (dispatch: Dispatch<LinkstaDispatchTypes>) =>
  bindActionCreators({ fetchUsersData }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);
