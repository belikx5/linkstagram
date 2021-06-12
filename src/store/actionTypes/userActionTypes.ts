export const CLEAR_DATA = "CLEAR_DATA";
export const SIGN_IN = "SIGN_IN";
export const SIGN_UP = "SIGN_UP";
export const AUTH_ERROR = "AUTH_ERROR";
export const CLEAR_AUTH_ERROR = "CLEAR_AUTH_ERROR";

export const FETCH_ALL_USERS = "FETCH_ALL_USERS";
export const FETCH_CURRENT_USER = "FETCH_CURRENT_USER";
export const EDIT_USER = "EDIT_USER";

export const USER_ACTION_ERROR = "USER_ACTION_ERROR";
export const CLEAR_USER_ACTION_ERROR = "CLEAR_USER_ACTION_ERROR";

export type Profile = {
  username: string;
  description: string;
  first_name: string;
  followers: number;
  following: number;
  job_title: string;
  last_name: string;
  profile_photo_url: string;
};
export type ProfileToEdit = {
  account: {
    username?: string;
    description?: string;
    first_name?: string;
    job_title?: string;
    last_name?: string;
    profile_photo?: {
      id: string;
      storage: string;
      metadata: {
        size: number;
        mime_type: string;
        filename: string;
      };
    };
  };
};
export type Account = {
  username: string;
  login: string;
  password: string;
};

export type ApiAuthError = {
  fieldError: string[];
  error: string;
};

export interface ClearData {
  type: typeof CLEAR_DATA;
}

export interface AuthError {
  type: typeof AUTH_ERROR;
  payload: ApiAuthError;
}
export interface ClearAuthError {
  type: typeof CLEAR_AUTH_ERROR;
}
export interface SignIn {
  type: typeof SIGN_IN;
  payload: {
    token: string;
  };
}

export interface SignUp {
  type: typeof SIGN_UP;
  payload: {
    token: string;
  };
}

export interface EditUser {
  type: typeof EDIT_USER;
  payload: Profile;
}

export interface FetchCurrentUser {
  type: typeof FETCH_CURRENT_USER;
  payload: Profile | null;
}

export interface FetchAllUsers {
  type: typeof FETCH_ALL_USERS;
  payload: Profile[];
}

export interface UserActionError {
  type: typeof USER_ACTION_ERROR;
  payload: {
    error: string;
  };
}

export interface ClearUserActionError {
  type: typeof CLEAR_USER_ACTION_ERROR;
}

export type UserDispatchTypes =
  | ClearData
  | SignIn
  | SignUp
  | AuthError
  | ClearAuthError
  | FetchAllUsers
  | FetchCurrentUser
  | EditUser
  | UserActionError
  | ClearUserActionError;
