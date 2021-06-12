import "./authPage.scss";
import React from "react";
import { useTranslation } from "react-i18next";
import AuthForm from "../Auth/AuthForm";

const Signup = () => {
  const [t] = useTranslation("common");
  const authParams = {
    action: t("auth.signup"),
    isSignup: true,
    linkTo: "/signin",
    linkHeader: t("auth.alreadyHaveAcc"),
    linkName: t("auth.login"),
  };

  return (
    <div className="auth">
      <div className="auth-img-container">
        <img src={`${process.env.PUBLIC_URL}/assets/login-img-1.png`} alt="login-1" />
        <img src={`${process.env.PUBLIC_URL}/assets/login-img-2.png`} alt="login-2"/>
      </div>
      <AuthForm {...authParams} />
    </div>
  );
};

export default Signup;
