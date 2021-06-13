import "./postDetails.scss";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { UserIconSize } from "../../../ts/enums";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import {
  addComment,
  removeLike,
  setLike,
  setPostActionError,
} from "../../../store/actions/postActions";
import { Post } from "../../../store/actionTypes/postActionTypes";
import { sortCommentsDesc } from "../../../services/sorting";
import { useTranslation } from "react-i18next";

import UserIcon from "../../User/UserIcon/UserIcon";
import Comment from "../PostComment/Comment";
import Slider from "../../Slider";

type PostDetailsProps = {
  postData: Post;
  openModal: Function;
};

const PostDetails = ({ postData, openModal }: PostDetailsProps) => {
  const [t] = useTranslation("common");
  const dispatch = useDispatch();
  const currentUser = useTypedSelector((state) => state.userState.currentUser);
  const [text, setText] = useState("");
  const onCommentSend = () => {
    if (text.trim()) {
      dispatch(addComment(postData.id, text));
      setText("");
    } else dispatch(setPostActionError("Comment can't be empty"));
  };
  const onLikeClick = () => {
    postData.is_liked
      ? dispatch(removeLike(postData.id))
      : dispatch(setLike(postData.id));
  };

  const requireAuthForAction = (action: Function) => {
    if (currentUser?.username) {
      action();
    } else dispatch(setPostActionError("Login to perform this action"));
  };

  return (
    <div className="post-details">
      <Slider images={postData.photos.map((p) => p.url)} isPostDetails={true} />
      <div className="post-details-data">
        <div className="post-details-header">
          <div>
            <UserIcon
              icon={postData.author.profile_photo_url}
              size={UserIconSize.Small}
            />
            <p>{postData.author.username}</p>
          </div>
          <img
            className="post-details-header-close"
            src="../../assets/close.svg"
            onClick={() => openModal(false)}
            alt="close-icon"
          />
        </div>
        <div className="post-details-comments">
          {sortCommentsDesc(postData?.comments)?.map((comment, index) => {
            return <Comment key={index} data={comment} />;
          })}
        </div>
        <div
          className="post-details-likes"
          onClick={() => requireAuthForAction(onLikeClick)}>
          <img
            src={`../../assets/like-${postData.is_liked ? "red" : "grey"}.svg`}
            alt="is-liked"
          />
          <p className="post-details-total-likes">{postData.likes_count}</p>
        </div>
        <div className="post-details-actions">
          <textarea
            placeholder={t("post.addComment")}
            className="post-details-input-field"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            className="post-details-action-button"
            onClick={() => requireAuthForAction(onCommentSend)}>
            {t("common.post")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
