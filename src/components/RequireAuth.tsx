import React from "react";
import { Redirect } from "react-router-dom";
import { useTypedSelector } from "../hooks/useTypedSelector";

type ReqAuthProps = {
  children: React.ReactNode;
};
function RequireAuth({ children }: ReqAuthProps) {
  const currentUser = useTypedSelector((state) => state.userState.currentUser);
  if (!currentUser && !localStorage.getItem("token"))
    return <Redirect exact to={{ pathname: "/signin" }} />;
  return <>{children}</>;
}

export default RequireAuth;
