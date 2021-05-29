import "../styles/userCard.scss";
import React, { useState } from "react";
import UserIcon from "../components/UserIcon";
import { UserIconSize } from "../ts/enums";
import {
  CurrentUser,
  GeneralUser,
  LinkstaDispatchTypes,
} from "../store/actionTypes";
import history from "../services/history";
import Modal from "../components/Modal";
import EditForm from "./EditForm";
import CreatePostForm from "./CreatePostForm";
import { RootStore } from "../store";
import { Dispatch, bindActionCreators } from "redux";
import { fetchUser } from "../store/actions/userActions";
import { connect } from "react-redux";

type UserCardProps = {
  isProfilePage: boolean;
  //following: string[],
  currentUser: CurrentUser | null;
};

const areEqual = (prevProps: UserCardProps, nextProps: UserCardProps) => {
  return prevProps.currentUser?.avatar === nextProps.currentUser?.avatar;
};

const UserCard = ({
  isProfilePage,
  currentUser /*following*/,
}: UserCardProps) => {
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [modalCreateOpen, setModalCreateOpen] = useState(false);

  const onEditClick = () => {
    if (history.location.pathname === "/") {
      setModalEditOpen(true);
    } else {
      history.push("/edit");
    }
  };
  const onCreateClick = () => {
    if (history.location.pathname === "/") {
      setModalCreateOpen(true);
    } else {
      history.push("/create");
    }
  };
  console.log("currentUser", currentUser);
  return (
    <>
      {modalEditOpen && (
        <Modal modalMarginTop={15} openModal={setModalEditOpen}>
          <EditForm openModal={setModalEditOpen} />
        </Modal>
      )}
      {modalCreateOpen && (
        <Modal modalMarginTop={15} openModal={setModalCreateOpen}>
          <CreatePostForm setModalOpen={setModalCreateOpen} />
        </Modal>
      )}
      <div className="user-card">
        <div className="user-card-header">
          <div className="user-card-header-followers">
            <p>1,1 K</p>
            <p>Followers</p>
          </div>
          <div className="user-card-header-image">
            <UserIcon icon={currentUser?.avatar} size={UserIconSize.Large} />
            {!isProfilePage && (
              <img
                className="user-card-header-image-plus"
                src="../../assets/ava-plus.svg"
              />
            )}
          </div>
          <div className="user-card-header-following">
            <p>15</p>
            <p>Following</p>
          </div>
        </div>
        <p className="user-card-author-main">
          {currentUser?.name} {currentUser?.surname} - {currentUser?.job}
        </p>
        <p className="user-card-author-description">
          {currentUser?.description}
        </p>
        <div className="user-card-actions">
          <button onClick={onEditClick} className={isProfilePage ? "wide" : ""}>
            Edit profile
          </button>
          <button
            onClick={onCreateClick}
            className={isProfilePage ? "wide" : ""}>
            New post
          </button>
        </div>
        {!isProfilePage && (
          <div className="user-card-terms">
            <p>About Help Privacy Terms Locations Language</p>
            <p>&#169; 2020 Linkstagram</p>
          </div>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state: RootStore) => ({
  currentUser: state.userState.currentUser,
});

const mapDispatchToProps = (dispatch: Dispatch<LinkstaDispatchTypes>) =>
  bindActionCreators(
    {
      fetchUser,
    },
    dispatch
  );
const memorizedCard = React.memo(UserCard, areEqual);
export default connect(mapStateToProps, mapDispatchToProps)(memorizedCard);
// export default UserCard
