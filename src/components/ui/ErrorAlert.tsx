import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

type ErrorAlertProps = {
  error: string;
  isAlertOpen: boolean;
  setAlertOpen: (val: boolean) => void;
  autoHideTime: number;
};

function ErrorAlert({
  error,
  isAlertOpen,
  setAlertOpen,
  autoHideTime = 6000,
}: ErrorAlertProps) {
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
  };
  return (
    <Snackbar
      open={isAlertOpen}
      autoHideDuration={autoHideTime}
      onClose={handleClose}
      className="error-alert-message">
      <Alert onClose={handleClose} severity="error">
        {error}
      </Alert>
    </Snackbar>
  );
}

export default ErrorAlert;
