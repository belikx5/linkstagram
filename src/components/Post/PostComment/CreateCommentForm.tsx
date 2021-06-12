import "./comment.scss";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { addComment } from "../../../store/actions/postActions";
import { Profile } from "../../../store/actionTypes/userActionTypes";

type CreateCommentProps = {
  postId: number;
  currentUser: Profile | null;
};

function CreateCommentForm({ postId, currentUser }: CreateCommentProps) {
  const [t] = useTranslation("common");
  const dispatch = useDispatch();
  const [commentText, setCommentText] = useState("");
  const onSend = () => {
    if (commentText.trim()) {
      dispatch(addComment(postId, commentText));
      setCommentText("");
    } else return;
  };
  const requireAuthForAction = (action: Function) => {
    if (currentUser?.username) {
      action();
    } else return;
  };
  return (
    <div className="create-post-input">
      <textarea
        placeholder={t("post.addComment")}
        className="create-post-input_input-field"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      <button
        className="create-post-input_action-button"
        onClick={() => requireAuthForAction(onSend)}>
        {t("common.post")}
      </button>
    </div>
  );
}

export default CreateCommentForm;
