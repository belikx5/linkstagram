export const validate = (fieldName: string, value: string) => {
  switch (fieldName) {
    case "email": {
      let emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
      return emailValid ? "" : "Email is invalid. Please check it";
    }
    case "password":
      let passwordValid = value.length >= 6;
      return passwordValid ? "" : "Password is too short";
    case "nickname":
      let nicknameValid = value.match(/^[0-9a-zA-Z]+$/);
      return nicknameValid ? "" : "User name includes only number and letters";
    default:
      break;
  }
};
