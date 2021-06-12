import "./stories.scss";
import React from "react";
import UserIcon from "../User/UserIcon/UserIcon";
import { UserIconSize } from "../../ts/enums";
import { Profile } from "../../store/actionTypes/userActionTypes";

type StoriesProps = {
  users: Profile[];
};

const Stories = ({ users }: StoriesProps) => {
  return (
    <div className="stories">
      <div className="stories-container">
        {users.map((u, i) => {
          return (
            <div key={i} className="story">
              <UserIcon icon={u.profile_photo_url} size={UserIconSize.Medium} />
            </div>
          );
        })}
        <div className="empty-story">
          <p></p>
        </div>
      </div>
    </div>
  );
};

export default Stories;
