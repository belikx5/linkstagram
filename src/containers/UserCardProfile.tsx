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
import { RootStore } from "../store";
import { Dispatch, bindActionCreators } from "redux";
import { fetchUser } from "../store/actions/userActions";
import { connect } from "react-redux";

type UserCardProps = {
  isProfilePage: boolean;
  currentUser: CurrentUser | null;
};

const UserCard = ({ isProfilePage, currentUser }: UserCardProps) => {
  const onEditClick = () => {
    history.push("/edit");
  };
  const onCreateClick = () => {
    history.push("/create");
  };
  return (
    <>
      <div className="user-card-profile">
        <div className="user-card-left">
          <div className="user-card-header-image">
            <UserIcon icon={currentUser?.avatar} size={UserIconSize.Large} />
          </div>
          <div className="user-card-left-data">
            <h3>
              {currentUser?.name} {currentUser?.surname}
            </h3>
            <p className="user-card-left-data-job">{currentUser?.job}</p>
            <p className="user-card-left-data-descr">
              {currentUser?.description}
            </p>
          </div>
        </div>
        <div className="user-card-right">
          <div className="user-card-right-stats">
            <div className="user-card-header-followers">
              <p>1,1 K</p>
              <p>Followers</p>
            </div>
            <div className="user-card-header-following">
              <p>15</p>
              <p>Following</p>
            </div>
          </div>
          <div className="user-card-right-actions">
            <button
              onClick={onEditClick}
              className={isProfilePage ? "wide" : ""}>
              Edit profile
            </button>
            <button
              onClick={onCreateClick}
              className={isProfilePage ? "wide" : ""}>
              New post
            </button>
          </div>
        </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(UserCard);
