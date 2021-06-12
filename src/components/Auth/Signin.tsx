import "./authPage.scss";
import React from "react";
import AuthForm from "./AuthForm";
import { useTranslation } from "react-i18next";

const Signin = () => {
  const [t] = useTranslation("common");
  const authParams = {
    action: t("auth.login"),
    isSignup: false,
    linkTo: "/signup",
    linkHeader: t("auth.noAccount"),
    linkName: t("auth.createAccount"),
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

export default Signin;
