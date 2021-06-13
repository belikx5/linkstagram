import "./authFormStyles.scss";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { validate } from "../../services/validation";
import { useDispatch } from "react-redux";
import { clearAuthError, signin, signup } from "../../store/actions/userActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useTranslation } from "react-i18next";

type AuthFormprops = {
  action: string;
  isSignup: boolean;
  linkTo: string;
  linkHeader: string;
  linkName: string;
};

const AuthForm = (props: AuthFormprops) => {
  const [t] = useTranslation("common");
  const { action, isSignup = false, linkTo, linkHeader, linkName } = props;
  const authError = useTypedSelector((state) => state.userState.authError);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [validationErrors, setValidationErrors] = useState({
    email: null,
    password: null,
    nickname: null,
  });

  const handleSubmit = () => {
    isSignup
      ? dispatch(signup(nickname, email, password))
      : dispatch(signin(email, password));
  };
  const showValidationError = (field: string) => {
    switch(field) {
      case "email":
        return validationErrors.email ? validationErrors.email : null;
      case "password":
        return validationErrors.password ? validationErrors.password : null;
      case "nickname":
        return validationErrors.nickname ? validationErrors.nickname : null;
      default: 
      return null;
    }
  }
  const onBlur = (fieldName: string, value: string) => {
    const res = validate(fieldName, value);
    if (res) setValidationErrors({ ...validationErrors, [fieldName]: res });
    else setValidationErrors({ ...validationErrors, [fieldName]: "" });
  };
  useEffect(() => {
    return () => {
      dispatch(clearAuthError());
    };
  }, []);
  return (
    <>
      <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
        <h1>{action}</h1>
        <div className="auth-form-item">
          <label htmlFor="email" className="auth-form-item-label">
            {t("auth.email")}
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
                alt="validation"
              />
            )}
          </div>
        </div>
        {isSignup && (
          <div className="auth-form-item">
            <label htmlFor="nickname" className="auth-form-item-label">
              {t("auth.username")}
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
                  alt="validation"
                />
              )}
            </div>
          </div>
        )}
        <div className="auth-form-item">
          <label htmlFor="pass" className="auth-form-item-label">
            {t("auth.password")}
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
                alt="validation"
              />
            )}
          </div>
        </div>

        <div className="auth-form-actions">
          {authError.error && (
            <p className="auth-form-actions-error-message">{authError.error} {authError.fieldError[1] ? "- " + authError.fieldError[1] : ""}</p>
          )}
          <p className="auth-form-actions-error-message">{showValidationError("email")}</p>
          <p className="auth-form-actions-error-message">{showValidationError("password")}</p>
          <p className="auth-form-actions-error-message">{showValidationError("nickname")}</p>
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
        </div>
      </form>
    </>
  );
};

export default AuthForm;
