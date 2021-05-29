import "../styles/userIcon.scss";
import React, { useEffect, useState } from "react";
import { UserIconSize } from "../ts/enums";


type UserIconProps = {
  icon?: string;
  size: UserIconSize;
};
const areEqual = (prevProps: UserIconProps, nextProps: UserIconProps) => {
  return prevProps.icon === nextProps.icon;
};

const UserIcon = ({ icon = "", size }: UserIconProps) => {
  const [image, setImage] = useState("");
  const DEFAULT_IMAGE = "../../assets/default-user.png";

  //  setImage(`https://i.pravatar.cc/150?img=${getRandomInt(1, 50)}`)
  const handleError = () => {
    if (typeof icon === "string" && icon?.includes("lh3.googleusercontent")) {
      setImage(icon);
    } else 
    setImage(DEFAULT_IMAGE);
  };


  return (
    // <img className={`user-image ${size}`} src={image ? image : '../../assets/default-user.png'} />
    // <img className={`user-image ${size}`} src={!image ? icon : image} onError={() => setImage('../../assets/default-user.png')} />
    <img
      className={`user-image ${size}`}
      src={icon ? icon : DEFAULT_IMAGE}
      onError={handleError}
    />
  );
};
export default React.memo(UserIcon, areEqual);
// export default UserIcon
