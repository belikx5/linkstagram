import { Dispatch } from "redux";
import api from "../../services/api";
import {
  FETCH_USER,
  CLEAR_DATA,
  LinkstaDispatchTypes,
  GeneralUser,
  CurrentUser,
  Post,
} from "../actionTypes";

export const logout = () => (dispatch: Dispatch<LinkstaDispatchTypes>) => {
  dispatch({ type: CLEAR_DATA });
};

export const signin =
  (login: string, password: string) =>
  async (dispatch: Dispatch<LinkstaDispatchTypes>) => {
    try {
      await api.post("/login", {
        login,
        password,
      });
    //   dispatch({ type: })
    } catch (error) {}
  };
