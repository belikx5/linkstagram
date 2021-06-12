import "./userCard.scss";
import React, { useState } from "react";
import UserIcon from "../UserIcon/UserIcon";
import { UserIconSize } from "../../../ts/enums";

import history from "../../../services/history";
import Modal from "../../ui/Modal/Modal";
import EditForm from "../EditProfile/EditForm";
import CreatePostForm from "../../Post/CreatePost/CreatePostForm";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { openCreatePostModal } from "../../../store/actions/postActions";

type UserCardProps = {
  isProfilePage: boolean;
};

const UserCard = ({ isProfilePage }: UserCardProps) => {
  const dispatch = useDispatch();
  const [t] = useTranslation("common");
  const currentUser = useTypedSelector((state) => state.userState.currentUser);
  const createModalOpened = useTypedSelector(
    (state) => state.postsState.createModalOpened
  );
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const toggleCreateModal = (value: boolean) => {
    dispatch(openCreatePostModal(value));
  };
  const onEditClick = () => {
    if (history.location.pathname === "/") {
      setModalEditOpen(true);
    } else {
      history.push("/edit");
    }
  };
  const onCreateClick = () => {
    if (history.location.pathname === "/") {
      toggleCreateModal(true);
    } else {
      history.push("/create");
    }
  };
  return (
    <>
      {modalEditOpen && (
        <Modal modalMarginTop={15} openModal={setModalEditOpen}>
          <EditForm openModal={setModalEditOpen} />
        </Modal>
      )}
      {createModalOpened && (
        <Modal modalMarginTop={15} openModal={toggleCreateModal}>
          <CreatePostForm setModalOpen={toggleCreateModal} />
        </Modal>
      )}
      <div className="user-card">
        <div className="user-card-header">
          <div className="user-card-header-followers">
            <p>{currentUser?.followers}</p>
            <p>{t("userCard.followers")}</p>
          </div>
          <div className="user-card-header-image">
            <UserIcon
              icon={currentUser?.profile_photo_url}
              size={UserIconSize.Large}
            />
            {!isProfilePage && (
              <img
                className="user-card-header-image-plus"
                src="../../assets/ava-plus.svg"
                alt="plus"
              />
            )}
          </div>
          <div className="user-card-header-following">
            <p>{currentUser?.following}</p>
            <p>{t("userCard.following")}</p>
          </div>
        </div>
        <p className="user-card-author-main">
          {currentUser?.first_name} {currentUser?.last_name} -{" "}
          {currentUser?.job_title}
        </p>
        <p className="user-card-author-description">
          {currentUser?.description}
        </p>
        <div className="user-card-actions">
          <button onClick={onEditClick} className={isProfilePage ? "wide" : ""}>
            {t("userCard.edit")}
          </button>
          <button
            onClick={onCreateClick}
            className={isProfilePage ? "wide" : ""}>
            {t("userCard.new")}
          </button>
        </div>
        {!isProfilePage && (
          <div className="user-card-terms">
            <p>{t("userCard.smallText")}</p>
            <p>&#169; 2020 Linkstagram</p>
          </div>
        )}
      </div>
    </>
  );
};

export default UserCard;
