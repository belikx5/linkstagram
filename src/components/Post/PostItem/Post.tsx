import "./post.scss";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { formateDate } from "../../../services/moment";
import {
  setLike,
  removeLike,
  fetchComments,
  deletePost,
  openPostDetailsModal,
} from "../../../store/actions/postActions";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router";
import { Post as PostType } from "../../../store/actionTypes/postActionTypes";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { UserIconSize } from "../../../ts/enums";
import UserIcon from "../../User/UserIcon/UserIcon";
import PostDetails from "../PostDetails/PostDetails";
import DropdownMenu from "../PostDropdown/DropdownMenu";
import Modal from "../../ui/Modal/Modal";
import Slider from "../../Slider";


type PostProps = {
  postData: PostType;
};

const Post = ({ postData }: PostProps) => {
  const [t] = useTranslation("common");
  const dispatch = useDispatch();
  const history = useHistory();
  const { pathname } = useLocation();
  const [copiedShown, setCopiedShown] = useState(false);
  const currentUser = useTypedSelector((state) => state.userState.currentUser);
  const detailsModalOpened = useTypedSelector(
    (state) => state.postsState.detailsModalOpened
  );
  const handleLikeClick = () => {
    postData.is_liked
      ? dispatch(removeLike(postData.id))
      : dispatch(setLike(postData.id));
  };
  const isModalOpened = (value: boolean) => {
    dispatch(openPostDetailsModal(postData.id, value));
  };
  const navigateToPostView = () => {
    history.push(`/postDetails/${postData.id}`);
  };
  const validateLocationForAction = (action: () => void) => {
    !pathname.includes("/postDetails") && action();
  };
  const handleShareClick = () => {
    setCopiedShown(true);
    navigator.clipboard.writeText(`http://localhost:3000/#${postData.id}`);
    setTimeout(() => {
      setCopiedShown(false);
    }, 1200);
  };
  const postDetailsProps = {
    openModal: isModalOpened,
    postData,
  };
  useEffect(() => {
    dispatch(fetchComments(postData.id));
  }, []);

  return (
    <>
      {detailsModalOpened.value && postData.id === detailsModalOpened.postId && (
        <Modal modalMarginTop={20} openModal={isModalOpened}>
          <PostDetails {...postDetailsProps} />
        </Modal>
      )}
      <div className="post">
        <div className="post-header">
          <div>
            {postData.author.username === currentUser?.username ? (
              <UserIcon
                icon={currentUser?.profile_photo_url}
                size={UserIconSize.Small}
              />
            ) : (
              <UserIcon
                icon={postData.author.profile_photo_url}
                size={UserIconSize.Small}
              />
            )}
            <div className="post-header-data">
              <p>{postData.author.username}</p>
              <p>{formateDate(Date.parse(postData.created_at))}</p>
            </div>
          </div>
          {postData.author.username === currentUser?.username && (
            <DropdownMenu
              deletePost={() => dispatch(deletePost(postData.id))}
            />
          )}
        </div>
        <div className="post-image-block">
          <div className="post-details-button desktop">
            <Slider
              images={postData.photos.map((el) => el.url)}
              onImageClick={() =>
                validateLocationForAction(() => isModalOpened(true))
              }
            />
          </div>
          <div className="post-details-button mobile">
            <Slider
              images={postData.photos.map((el) => el.url)}
              onImageClick={() => validateLocationForAction(navigateToPostView)}
            />
          </div>
          {copiedShown && (
            <div className="post-copied-bufer">
              <img src="../../assets/copied.svg" alt="copied" />
              <p className="post-copied-bufer-text">{t("post.copied")}</p>
            </div>
          )}
        </div>
        <p className="post-description">{postData.description}</p>
        <div className="post-actions">
          <div>
            <div className="post-action" onClick={handleLikeClick}>
              <img
                src={`../../assets/like-${
                  postData.is_liked ? "red" : "grey"
                }.svg`}
                alt="is-liked"
              />
              <p>{postData.likes_count}</p>
            </div>
            <div
              className="post-action comment-action post-details-button desktop"
              onClick={() =>
                validateLocationForAction(() => isModalOpened(true))
              }>
              <img src="../../assets/comment.svg" alt="comment" />
              <p>{postData.comments?.length || 0}</p>
            </div>
            <div
              className="post-action comment-action post-details-button mobile"
              onClick={() => validateLocationForAction(navigateToPostView)}>
              <img src="../../assets/comment.svg" alt="comment" />
              <p>{postData.comments?.length || 0}</p>
            </div>
          </div>
          <div className="post-action" onClick={handleShareClick}>
            <p>{t("post.share")}</p>
            <img src="../../assets/arrow-right.svg" alt="share" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
