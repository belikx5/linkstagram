import "./userCard.scss";
import React from "react";
import UserIcon from "../UserIcon/UserIcon";
import { UserIconSize } from "../../../ts/enums";

import history from "../../../services/history";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useTranslation } from "react-i18next";

type UserCardProps = {
  isProfilePage: boolean;
};

const UserCard = ({ isProfilePage }: UserCardProps) => {
  const currentUser = useTypedSelector((state) => state.userState.currentUser);
  const [t] = useTranslation("common");
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
            <UserIcon
              icon={currentUser?.profile_photo_url}
              size={UserIconSize.Large}
            />
          </div>
          <div className="user-card-left-data">
            <h3>
              {currentUser?.first_name} {currentUser?.last_name}
            </h3>
            <p className="user-card-left-data-job">{currentUser?.job_title}</p>
            <p className="user-card-left-data-descr">
              {currentUser?.description}
            </p>
          </div>
        </div>
        <div className="user-card-right">
          <div className="user-card-right-stats">
            <div className="user-card-header-followers">
              <p>{currentUser?.followers}</p>
              <p>{t("userCard.followers")}</p>
            </div>
            <div className="user-card-header-following">
              <p>{currentUser?.following}</p>
              <p>{t("userCard.following")}</p>
            </div>
          </div>
          <div className="user-card-right-actions">
            <button
              onClick={onEditClick}
              className={isProfilePage ? "wide" : ""}>
              {t("userCard.edit")}
            </button>
            <button
              onClick={onCreateClick}
              className={isProfilePage ? "wide" : ""}>
              {t("userCard.new")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;
