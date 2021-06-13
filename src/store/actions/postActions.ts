import { Dispatch } from "redux";
import api from "../../services/api";
import history from "../../services/history";
import {
  ADD_COMMENT,
  CLEAR_POST_ACTION_ERROR,
  Comment,
  CREATE_POST,
  CREATE_POST_MODAL_OPENED,
  DELETE_POST,
  FETCH_ALL_POSTS,
  FETCH_COMMENTS,
  FETCH_POSTS_BY_USER,
  FETCH_POST_BY_ID,
  Post,
  PostDispatchTypes,
  PostToCreate,
  POST_ACTION_ERROR,
  POST_DETAILS_MODAL_OPENED,
  REMOVE_LIKE,
  SET_IS_POSTS_FETCHED,
  SET_LIKE,
} from "../actionTypes/postActionTypes";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  const config = token
    ? {
        headers: {
          authorization: token,
        },
      }
    : {};
  return config;
};

export const fetchAllPosts =
  () => async (dispatch: Dispatch<PostDispatchTypes>) => {
    try {
      const config = getAuthHeaders();
      const response = await api.get<Post[]>("/posts", config);
      dispatch({ type: FETCH_ALL_POSTS, payload: response.data });
    } catch ({ response: { data } }) {
      dispatch({
        type: POST_ACTION_ERROR,
        payload: {
          error: data.error,
        },
      });
    }
  };

export const fetchPostById =
  (postId: number) => async (dispatch: Dispatch<PostDispatchTypes>) => {
    try {
      const config = getAuthHeaders();
      const response = await api.get<Post>(`/posts/${postId}`, config);
      const commentResponse = await api.get<Comment[]>(
        `/posts/${postId}/comments`
      );
      dispatch({
        type: FETCH_POST_BY_ID,
        payload: {
          ...response.data,
          comments: commentResponse.data,
        },
      });
    } catch ({ response: { data } }) {
      dispatch({
        type: POST_ACTION_ERROR,
        payload: {
          error: data.error,
        },
      });
    }
  };

export const fetchPostByUser =
  (username: string) => async (dispatch: Dispatch<PostDispatchTypes>) => {
    try {
      const config = getAuthHeaders();
      const response = await api.get<Post[]>(
        `/profiles/${username}/posts`,
        config
      );
      dispatch({ type: FETCH_POSTS_BY_USER, payload: response.data });
    } catch ({ response: { data } }) {
      console.log(data);
    }
  };
export const setIsPostsFetched =
  (value: boolean) => async (dispatch: Dispatch<PostDispatchTypes>) => {
    dispatch({ type: SET_IS_POSTS_FETCHED, payload: value });
  };
export const setPostActionError =
  (message: string) => async (dispatch: Dispatch<PostDispatchTypes>) => {
    dispatch({ type: POST_ACTION_ERROR, payload: { error: message } });
  };
export const createPost =
  (post: PostToCreate) => async (dispatch: Dispatch<PostDispatchTypes>) => {
    try {
      const response = await api.post<Post>(
        "/posts",
        {
          ...post,
        },
        getAuthHeaders()
      );
      dispatch({
        type: CREATE_POST,
        payload: { ...response.data, comments: [] },
      });
      dispatch({ type: CREATE_POST_MODAL_OPENED, payload: false });
      history.location.pathname !== "/" && history.goBack();
    } catch ({ response: { data } }) {
      dispatch({
        type: POST_ACTION_ERROR,
        payload: {
          error: data.error,
        },
      });
    }
  };

export const openCreatePostModal =
  (value: boolean) => (dispatch: Dispatch<PostDispatchTypes>) => {
    dispatch({ type: CREATE_POST_MODAL_OPENED, payload: value });
  };
export const openPostDetailsModal =
  (postId: number, value: boolean) =>
  (dispatch: Dispatch<PostDispatchTypes>) => {
    dispatch({
      type: POST_DETAILS_MODAL_OPENED,
      payload: {
        postId,
        value,
      },
    });
  };
export const deletePost =
  (postId: number) => async (dispatch: Dispatch<PostDispatchTypes>) => {
    try {
      await api.delete(`/posts/${postId}`, getAuthHeaders());
      dispatch({ type: DELETE_POST, payload: { postId } });
    } catch ({ response: { data } }) {
      dispatch({
        type: POST_ACTION_ERROR,
        payload: {
          error: data.error,
        },
      });
    }
  };

export const setLike =
  (postId: number) => async (dispatch: Dispatch<PostDispatchTypes>) => {
    try {
      await api.post(`/posts/${postId}/like`, {}, getAuthHeaders());
      dispatch({
        type: SET_LIKE,
        payload: {
          postId,
        },
      });
    } catch ({ response: { data } }) {
      dispatch({
        type: POST_ACTION_ERROR,
        payload: {
          error: data.error,
        },
      });
    }
  };

export const removeLike =
  (postId: number) => async (dispatch: Dispatch<PostDispatchTypes>) => {
    try {
      await api.delete(`/posts/${postId}/like`, getAuthHeaders());
      dispatch({
        type: REMOVE_LIKE,
        payload: {
          postId,
        },
      });
    } catch ({ response: { data } }) {
      dispatch({
        type: POST_ACTION_ERROR,
        payload: {
          error: data.error,
        },
      });
    }
  };

export const fetchComments =
  (postId: number) => async (dispatch: Dispatch<PostDispatchTypes>) => {
    try {
      const response = await api.get<Comment[]>(`/posts/${postId}/comments`);
      dispatch({
        type: FETCH_COMMENTS,
        payload: {
          comments: response.data,
          postId: postId,
        },
      });
    } catch ({ response: { data } }) {
      dispatch({
        type: POST_ACTION_ERROR,
        payload: {
          error: data.error,
        },
      });
    }
  };

export const addComment =
  (postId: number, message: string) =>
  async (dispatch: Dispatch<PostDispatchTypes>) => {
    try {
      const response = await api.post<Comment>(
        `/posts/${postId}/comments`,
        {
          message,
        },
        getAuthHeaders()
      );
      dispatch({
        type: ADD_COMMENT,
        payload: {
          postId,
          comment: response.data,
        },
      });
    } catch ({ response }) {
      dispatch({
        type: POST_ACTION_ERROR,
        payload: {
          error: response.data?.error,
        },
      });
    }
  };

export const ClearPostActionError =
  () => (dispatch: Dispatch<PostDispatchTypes>) => {
    dispatch({ type: CLEAR_POST_ACTION_ERROR });
  };
