import "./ownerPostList.scss";
import React, { useEffect, useState } from "react";
import { Post } from "../../../store/actionTypes/postActionTypes";
import { useTranslation } from "react-i18next";
import { sortPostsDesc } from "../../../services/sorting";
import Modal from "../../ui/Modal/Modal";
import PostDetails from "../PostDetails/PostDetails";
import { useDispatch } from "react-redux";
import { fetchComments } from "../../../store/actions/postActions";
import { useHistory, useLocation } from "react-router-dom";

type OwnerPostListProps = {
  posts: Post[];
};

const OwnerPostList = ({ posts }: OwnerPostListProps) => {
  const [t] = useTranslation("common");

  if (!posts.length) {
    return (
      <>
        <h2>{t("profile.noPosts")} </h2>
        <h3>{t("profile.tryToAdd")}</h3>
      </>
    );
  }
  return (
    <div className="owner-posts">
      {sortPostsDesc(posts).map((post, index) => {
        return <ListItem key={index} postData={post} />;
      })}
    </div>
  );
};

type ListItemProps = {
  postData: Post;
};

const ListItem = ({ postData }: ListItemProps) => {
  const [modalOpened, setModalOpened] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const { pathname } = useLocation();
  const navigateToPostView = () => {
    history.push(`/postDetails/${postData.id}`);
  };
  const validateLocationForAction = (action: () => void) => {
    !pathname.includes("/postDetails") && action();
  };
  const postDetailsProps = {
    openModal: setModalOpened,
    postData,
    isPostDetails: true,
  };
  useEffect(() => {
    dispatch(fetchComments(postData.id));
  }, []);
  const PostImage = () => {
    return (
      <img
        className="owner-posts-image"
        src={postData?.photos[0]?.url}
        alt="post-owner"
      />
    );
  };
  return (
    <>
      {modalOpened && (
        <Modal modalMarginTop={20} openModal={setModalOpened}>
          <PostDetails {...postDetailsProps} />
        </Modal>
      )}
      <div className="owner-posts-item mobile" onClick={navigateToPostView}>
        <PostImage />
      </div>
      <div
        className="owner-posts-item desktop"
        onClick={() => setModalOpened(true)}>
        <PostImage />
      </div>
    </>
  );
};
export default OwnerPostList;
