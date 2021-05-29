import {
  FETCH_USER,
  FETCH_USER_FOLLOWING,
  FETCH_USER_POSTS,
  CLEAR_DATA,
  DELETE_USER_POST,
  EDIT_USER,
  CurrentUser,
  Post,
  LinkstaDispatchTypes,
  OPEN_CLOSE_POST_DETAILS,
  PostDetailsOpen,
} from "../actionTypes";

interface IDefaultState {
  currentUser: CurrentUser | null;
  posts: Post[];
  isPostDetailsOpened: PostDetailsOpen
  // following: string[]
}

const initialState: IDefaultState = {
  currentUser: null,
  posts: [],
  isPostDetailsOpened: {
    isOpen: false,
    postId: "",
  },
  // following: []
};

export default (
  state = initialState,
  action: LinkstaDispatchTypes
): IDefaultState => {
  switch (action.type) {
    case FETCH_USER:
      return { ...state, currentUser: action.payload };
    case FETCH_USER_POSTS:
      return { ...state, posts: action.payload };
    case DELETE_USER_POST:
      return {
        ...state,
        posts: state.posts.filter((p) => p.id !== action.payload.postId),
      };
    case EDIT_USER:
      return { ...state, currentUser: { ...action.payload } };
    // case FETCH_USER_FOLLOWING:
    //     return { ...state, following: action.payload }
    case OPEN_CLOSE_POST_DETAILS:
      return { ...state, isPostDetailsOpened: { ...action.payload } };
    case CLEAR_DATA:
      return initialState;
    default:
      return state;
  }
};
