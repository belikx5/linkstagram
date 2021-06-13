import { Dispatch } from "redux";
import api from "../../services/api";
import history from "../../services/history";
import {
  CLEAR_DATA,
  AUTH_ERROR,
  SIGN_IN,
  SIGN_UP,
  UserDispatchTypes,
  FETCH_CURRENT_USER,
  Profile,
  EDIT_USER,
  ProfileToEdit,
  FETCH_ALL_USERS,
  CLEAR_AUTH_ERROR,
  CLEAR_USER_ACTION_ERROR,
  USER_ACTION_ERROR,
} from "../actionTypes/userActionTypes";

export const logout = () => (dispatch: Dispatch<UserDispatchTypes>) => {
  localStorage.removeItem("token");
  dispatch({ type: CLEAR_DATA });
};

export const clearAuthError = () => (dispatch: Dispatch<UserDispatchTypes>) => {
  dispatch({ type: CLEAR_AUTH_ERROR });
};
export const clearUserActionError =
  () => (dispatch: Dispatch<UserDispatchTypes>) => {
    dispatch({ type: CLEAR_USER_ACTION_ERROR });
  };
export const tryLocalSignIn =
  () => async (dispatch: Dispatch<UserDispatchTypes>) => {
    const userResponse = await getCurrentUser();
    if (userResponse?.data) {
      console.log("userResponse?.data", userResponse?.data);
      dispatch({
        type: FETCH_CURRENT_USER,
        payload: { ...userResponse.data },
      });
    }
  };

export const signin =
  (login: string, password: string) =>
  async (dispatch: Dispatch<UserDispatchTypes>) => {
    try {
      const response = await api.post("/login", {
        login,
        password,
      });
      const token = response.headers.authorization;
      localStorage.setItem("token", token);
      dispatch({
        type: SIGN_IN,
        payload: {
          token,
        },
      });
      const userResponse = await getCurrentUser();
      if (userResponse?.data) {
        dispatch({
          type: FETCH_CURRENT_USER,
          payload: { ...userResponse.data },
        });
        history.push("/");
      }
    } catch ({ response: { data } }) {
      dispatch({
        type: AUTH_ERROR,
        payload: {
          error: data["error"],
          fieldError: data["field-error"],
        },
      });
    }
  };
export const signup =
  (username: string, login: string, password: string) =>
  async (dispatch: Dispatch<UserDispatchTypes>) => {
    try {
      const response = await api.post("/create-account", {
        username,
        login,
        password,
      });
      const token = response.headers.authorization;
      localStorage.setItem("token", token);
      dispatch({
        type: SIGN_UP,
        payload: {
          token,
        },
      });
      const userResponse = await getCurrentUser();
      if (userResponse?.data) {
        dispatch({
          type: FETCH_CURRENT_USER,
          payload: { ...userResponse.data },
        });
        history.push("/");
      }
    } catch ({ response: { data } }) {
      dispatch({
        type: AUTH_ERROR,
        payload: {
          error: data["error"],
          fieldError: data["field-error"],
        },
      });
    }
  };

export const fetchCurrentUser =
  () => async (dispatch: Dispatch<UserDispatchTypes>) => {
    try {
      const userResponse = await getCurrentUser();
      if (userResponse?.data) {
        dispatch({
          type: FETCH_CURRENT_USER,
          payload: { ...userResponse.data },
        });
      }
    } catch ({ response: { data } }) {
      dispatch({
        type: USER_ACTION_ERROR,
        payload: {
          error: data.error,
        },
      });
    }
  };

export const fetchAllUsers =
  () => async (dispatch: Dispatch<UserDispatchTypes>) => {
    try {
      const response = await api.get<Profile[]>("/profiles");
      if (response?.data) {
        dispatch({
          type: FETCH_ALL_USERS,
          payload: response.data,
        });
      }
    } catch ({ response: { data } }) {
      dispatch({
        type: USER_ACTION_ERROR,
        payload: {
          error: data.error,
        },
      });
    }
  };

export const editUser =
  (user: ProfileToEdit) => async (dispatch: Dispatch<UserDispatchTypes>) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.patch<Profile>(
        "/account",
        {
          ...user,
        },
        {
          headers: {
            authorization: token,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({ type: EDIT_USER, payload: response?.data });
    } catch ({ response: { data } }) {
      dispatch({
        type: USER_ACTION_ERROR,
        payload: {
          error: data.error,
        },
      });
    }
  };

const getCurrentUser = async () => {
    const token = localStorage.getItem("token");
    const response = await api.get<Profile>("/account", {
      headers: {
        authorization: token,
      },
    });
    return response;
};
