import "../styles/authForm.scss";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import history from "../services/history";
import { signInWithProvider, subscribeToAllUsers } from "../firebase/helpers";
import { FireBaseAuthError } from "../store/actionTypes/index";
import { SignInProviders } from "../ts/enums";

const validate = (fieldName: string, value: string) => {
  switch (fieldName) {
    case "email": {
      let emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
      return emailValid ? "" : "Email is invalid. Please check it";
    }
    case "password":
      let passwordValid = value.length >= 6;
      return passwordValid ? "" : "Password is too short";
    case "nickname":
      let nicknameValid = !value.trim().includes(" ");
      return nicknameValid ? "" : "User name can't include white spaces";
    default:
      break;
  }
};

const defineAuthError = (errorCode: string) => {
  switch (errorCode) {
    case "auth/user-not-found":
      return "Invalid email or pasword";
    case "auth/user-disabled":
      return "This account account has been disabled by an administrator";
    case "auth/network-request-failed":
      return "Oops, something wrong with yuor network. Try later";
    default:
      return "Oops, something went wrong. Try again later";
  }
};

type AuthFormprops = {
  action: string;
  onSubmit: Function;
  isSignup: boolean;
  linkTo: string;
  linkHeader: string;
  linkName: string;
};

const AuthForm = (props: AuthFormprops) => {
  const {
    action,
    onSubmit,
    isSignup = false,
    linkTo,
    linkHeader,
    linkName,
  } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [validationErrors, setValidationErrors] = useState({
    email: null,
    password: null,
    nickname: null,
  });
  const [authError, setAuthError] = useState("");

  const handleSubmit = () => {
    if (isSignup)
      onSubmit(email, nickname, password)
        .then(() => {
          history.push("/");
        })
        .catch((err: FireBaseAuthError) => {
          setAuthError(defineAuthError(err.code));
        });
    else
      onSubmit(email, password)
        .then(() => {
          history.push("/");
        })
        .catch((err: FireBaseAuthError) => {
          setAuthError(defineAuthError(err.code));
        });
  };
  const handleAuthWithProvider = (provider: SignInProviders) => {
    signInWithProvider(provider)
      .then(() => {
        history.push("/");
      })
      .catch((err: FireBaseAuthError) => {
        setAuthError(defineAuthError(err.code));
      });
  };

  const onBlur = (fieldName: string, value: string) => {
    const res = validate(fieldName, value);
    setAuthError("");
    if (res) setValidationErrors({ ...validationErrors, [fieldName]: res });
    else setValidationErrors({ ...validationErrors, [fieldName]: "" });
  };
  return (
    <>
      <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
        <h1>{action}</h1>
        <div className="auth-form-item">
          <label htmlFor="email" className="auth-form-item-label">
            Email
          </label>
          <div className="auth-form-item-with-validation">
            <input
              id="email"
              type="text"
              className="form-item-text-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => onBlur("email", email)}
            />
            {validationErrors.email !== null && (
              <img
                className={`form-item-validation-image `}
                src={`../../assets/validation-${
                  validationErrors.email ? "error" : "success"
                }.svg`}
              />
            )}
          </div>
        </div>
        {isSignup && (
          <div className="auth-form-item">
            <label htmlFor="nickname" className="auth-form-item-label">
              User Name
            </label>
            <div className="auth-form-item-with-validation">
              <input
                id="nickname"
                type="text"
                className="form-item-text-input"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                onBlur={() => onBlur("nickname", nickname)}
              />
              {validationErrors.nickname !== null && (
                <img
                  className={`form-item-validation-image `}
                  src={`../../assets/validation-${
                    validationErrors.nickname ? "error" : "success"
                  }.svg`}
                />
              )}
            </div>
          </div>
        )}
        <div className="auth-form-item">
          <label htmlFor="pass" className="auth-form-item-label">
            Password
          </label>
          <div className="auth-form-item-with-validation">
            <input
              id="pass"
              type="password"
              className="form-item-text-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => onBlur("password", password)}
            />
            {validationErrors.password !== null && (
              <img
                className={`form-item-validation-image `}
                src={`../../assets/validation-${
                  validationErrors.password ? "error" : "success"
                }.svg`}
              />
            )}
          </div>
        </div>

        <div className="auth-form-actions">
          {authError && (
            <p className="auth-form-actions-error-message">{authError}</p>
          )}
          <button
            onClick={handleSubmit}
            disabled={
              !!validationErrors.email ||
              !!validationErrors.password ||
              !!validationErrors.nickname
            }>
            {action}
          </button>
          <p>
            {linkHeader}&nbsp;
            <Link to={linkTo}>{linkName}</Link>
          </p>
          <div className="auth-form-actions-providers">
            <div className="auth-form-actions-alternative">
              <img src="../../assets/google-icon.png" />
              <button
                onClick={() => handleAuthWithProvider(SignInProviders.Google)}>
                Sign in with Google
              </button>
            </div>
            <div className="auth-form-actions-alternative">
              <img src="../../assets/facebook-icon.png" />
              <button
                onClick={() =>
                  handleAuthWithProvider(SignInProviders.Facebook)
                }>
                Sign in with Facebook
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default AuthForm;
