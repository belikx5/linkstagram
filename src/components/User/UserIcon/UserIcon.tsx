import "./userIcon.scss";
import React, { useEffect, useState } from "react";
import { UserIconSize } from "../../../ts/enums";

const DEFAULT_IMAGE = "../../assets/default-user.png";

type UserIconProps = {
  icon?: string;
  size: UserIconSize;
};

const UserIcon = ({ icon = "", size }: UserIconProps) => {
  const [image, setImage] = useState(icon ? icon : DEFAULT_IMAGE);

  const handleError = () => {
    setImage(DEFAULT_IMAGE);
  };
  useEffect(() => {
    setImage(icon ? icon : DEFAULT_IMAGE);
  }, [icon]);
  return (
    <img
      className={`user-image ${size}`}
      src={image}
      onError={handleError}
      alt="user"
    />
  );
};
export default UserIcon;
