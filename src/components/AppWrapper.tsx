import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ErrorAlert from "./ui/ErrorAlert";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { ClearPostActionError } from "../store/actions/postActions";
import { clearUserActionError } from "../store/actions/userActions";

type AppWrapperProps = {
  children: JSX.Element;
};

function AppWrapper({ children }: AppWrapperProps) {
  const postActionError = useTypedSelector(
    (state) => state.postsState.actionError
  );
  const userActionError = useTypedSelector(
    (state) => state.userState.actionError
  );
  const dispatch = useDispatch();
  const [postError, setPostError] = useState(false);
  const [userError, setUserError] = useState(false);
  const setPostAlertOpen = (val: boolean) => {
    setPostError(val);
    dispatch(ClearPostActionError());
  };
  const setUserAlertOpen = (val: boolean) => {
    setUserError(val);
    dispatch(clearUserActionError());
  };
  useEffect(() => {
    setPostError(!!postActionError);
  }, [postActionError]);
  useEffect(() => {
    setUserError(!!userActionError);
  }, [userActionError]);
  return (
    <>
      {userError && (
        <ErrorAlert
          error={userActionError}
          isAlertOpen={userError}
          setAlertOpen={setUserAlertOpen}
          autoHideTime={20000}
        />
      )}
      {postError && (
        <ErrorAlert
          error={postActionError}
          isAlertOpen={postError}
          setAlertOpen={setPostAlertOpen}
          autoHideTime={20000}
        />
      )}
      {children}
    </>
  );
}

export default AppWrapper;
