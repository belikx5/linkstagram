import { 
    FETCH_USERS,
    CLEAR_DATA,
    FETCH_USER_LIKES_COMMENTS,
    DELETE_USER_POST,
    GeneralUser,
    UserPostHybrid,
    LinkstaDispatchTypes,
    FETCH_ALL_POSTS,

} from "../actionTypes"

interface IDefaultState {
    users: GeneralUser[],
    feed: UserPostHybrid[],
    // userFollowingLoaded: number
}

const initialState: IDefaultState = {
    users: [],
    feed: [],
    // userFollowingLoaded: 0
}

export default (state = initialState, action:LinkstaDispatchTypes ): IDefaultState => {
    switch(action.type){
        case FETCH_USERS:
            return { ...state, users: [...state.users, action.payload] }
        case FETCH_ALL_POSTS:
            return { 
                ...state,
                // userFollowingLoaded: state.userFollowingLoaded + 1,
                feed: [...state.feed, ...action.payload.posts]
            }
        case DELETE_USER_POST:
            return { ...state, feed: state.feed.filter(el => el.id !== action.payload.postId)}
        case FETCH_USER_LIKES_COMMENTS:
            return { 
                ...state,
                feed: state.feed.map(post => (post.id === action.payload.postId 
                ? { ...post, currentUserLike: action.payload.currentUserLike, likesCount: action.payload.likesCount, commentsCount: action.payload.commentsCount }
                : post))
            }
        default: 
            return state
    }
}