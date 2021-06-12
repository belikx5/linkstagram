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
  POST_ACTION_ERROR,
  POST_DETAILS_MODAL_OPENED,
  REMOVE_LIKE,
  SET_IS_POSTS_FETCHED,
  SET_LIKE,
} from "../actionTypes/postActionTypes";

interface IDefaultState {
  posts: Post[];
  isPostsFetched: boolean;
  postsByUser: Post[];
  currentPost: Post | null;
  createModalOpened: boolean;
  detailsModalOpened: {
    postId: number;
    value: boolean;
  };
  actionError: string;
}

const initialState: IDefaultState = {
  posts: [],
  isPostsFetched: false,
  postsByUser: [],
  currentPost: null,
  createModalOpened: false,
  detailsModalOpened: {
    postId: 0,
    value: false,
  },
  actionError: "",
};

const reducer = (
  state = initialState,
  action: PostDispatchTypes
): IDefaultState => {
  switch (action.type) {
    case FETCH_ALL_POSTS:
      return { ...state, posts: action.payload, isPostsFetched: true };
    case FETCH_POSTS_BY_USER:
      return { ...state, postsByUser: action.payload };
    case FETCH_POST_BY_ID:
      return { ...state, currentPost: action.payload };
    case SET_IS_POSTS_FETCHED:
      return {
        ...state,
        isPostsFetched: action.payload,
        posts: action.payload ? state.posts : [],
      };
    case CREATE_POST:
      return { ...state, posts: [...state.posts, action.payload] };
    case CREATE_POST_MODAL_OPENED:
      return { ...state, createModalOpened: action.payload };
    case POST_DETAILS_MODAL_OPENED:
      return { ...state, detailsModalOpened: action.payload };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((p) => p.id !== action.payload.postId),
      };
    case FETCH_COMMENTS: {
      const modifyData = (p: Post) => {
        if (p.id === action.payload.postId)
          return { ...p, comments: [...action.payload.comments] };
        return p;
      };
      return {
        ...state,
        posts: state.posts.map(modifyData),
        postsByUser: state.postsByUser.map(modifyData),
      };
    }
    case ADD_COMMENT: {
      const modifyData = (p: Post) => {
        if (p.id === action.payload.postId)
          return { ...p, comments: [...p.comments, action.payload.comment] };
        return p;
      };
      return {
        ...state,
        posts: state.posts.map(modifyData),
        postsByUser: state.postsByUser.map(modifyData),
        currentPost:
          state.currentPost?.id === action.payload.postId
            ? {
                ...state.currentPost,
                comments: [
                  ...state.currentPost.comments,
                  action.payload.comment,
                ],
              }
            : null,
      };
    }
    case SET_LIKE: {
      const modifyData = (p: Post) => {
        if (p.id === action.payload.postId)
          return { ...p, is_liked: true, likes_count: p.likes_count + 1 };
        return p;
      };
      return {
        ...state,
        posts: state.posts.map(modifyData),
        postsByUser: state.postsByUser.map(modifyData),
        currentPost:
          state.currentPost?.id === action.payload.postId
            ? {
                ...state.currentPost,
                likes_count: state.currentPost.likes_count + 1,
                is_liked: true,
              }
            : null,
      };
    }
    case REMOVE_LIKE: {
      const modifyData = (p: Post) => {
        if (p.id === action.payload.postId)
          return { ...p, is_liked: false, likes_count: p.likes_count - 1 };
        return p;
      };
      return {
        ...state,
        posts: state.posts.map(modifyData),
        postsByUser: state.postsByUser.map(modifyData),
        currentPost:
          state.currentPost?.id === action.payload.postId
            ? {
                ...state.currentPost,
                likes_count: state.currentPost.likes_count - 1,
                is_liked: false,
              }
            : null,
      };
    }
    case POST_ACTION_ERROR:
      return { ...state, actionError: action.payload.error };
    case CLEAR_POST_ACTION_ERROR:
      return { ...state, actionError: "" };
    default:
      return state;
  }
};
export default reducer;
