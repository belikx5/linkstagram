export const CLEAR_DATA = 'CLEAR_DATA'

export const FETCH_USER = 'FETCH_USER'
export const FETCH_USER_POSTS = 'FETCH_USER_POSTS'
export const FETCH_USER_FOLLOWING = 'FETCH_USER_FOLLOWING'
export const DELETE_USER_POST = 'DELETE_USER_POST'
export const CREATE_USER_POST = 'CREATE_USER_POST'
export const EDIT_USER = 'EDIT_USER'

export const FETCH_USERS = 'FETCH_USERS'
export const FETCH_USERS_FOLLOWING_POSTS = 'FETCH_USERS_FOLLOWING_POSTS'
export const FETCH_ALL_POSTS = 'FETCH_ALL_POSTS'
export const FETCH_USER_LIKES_COMMENTS = 'FETCH_USER_LIKES_COMMENTS'

export const OPEN_CLOSE_POST_DETAILS = "OPEN_CLOSE_POST_DETAILS";

export type CurrentUser = {
    avatar: string,
    email: string,
    name: string,
    surname: string,
    nickname: string,
    job: string,
    description: string
} 

export type GeneralUser = CurrentUser & {
    uid: string
}
export type Post = {
    creation: {
        seconds: number
    },
    description: string,
    id: string,
    image: string,
    likesCount: number,
    commentsCount: number,
} 
export type Feed = {
    post: Post,
    user: GeneralUser
}
export type UserLikesAndComments = {
    postId: string,
    currentUserLike: boolean,
    likesCount: number,
    commentsCount: number,
}
export type PostComment = {
    creator: string,
    text: string,
    creation: {
        seconds: number
    },
    user?: GeneralUser
}
export type UserPostHybrid = Post & {
    user: GeneralUser,
    currentUserLike: boolean
}
export type FireBaseAuthError = {
    code: string,
    message: string,
    a?: any
}

export type PostDetailsOpen = {
    postId: string,
    isOpen: boolean
}

export interface ClearData {
    type: typeof CLEAR_DATA
}
export interface FetchUser {
    type: typeof FETCH_USER,
    payload: CurrentUser
}

export interface EditUser {
    type: typeof EDIT_USER,
    payload: CurrentUser
}

export interface DeleteUserPost {
    type: typeof DELETE_USER_POST,
    payload: {
        postId: string
    }
}

export interface CreateUserPost {
    type: typeof CREATE_USER_POST,
    payload: Post
}

export interface FetchUserPosts {
    type: typeof FETCH_USER_POSTS,
    payload: Post[]
}
export interface FetchUserFollowing {
    type: typeof FETCH_USER_FOLLOWING,
    payload: string[]
}
export interface FetchUsers {
    type: typeof FETCH_USERS,
    payload: GeneralUser
}

export interface FetchUsersPosts {
    //type: typeof FETCH_USERS_FOLLOWING_POSTS,
    type: typeof FETCH_ALL_POSTS,
    payload: {
        posts: UserPostHybrid[],
        uid: string,
    },
}

export interface FetchUserLikesAndComments {
    type: typeof FETCH_USER_LIKES_COMMENTS,
    payload: UserLikesAndComments
}

export interface OpenClosePostDetails {
    type: typeof OPEN_CLOSE_POST_DETAILS,
    payload: PostDetailsOpen
}

export type LinkstaDispatchTypes = ClearData 
    | FetchUser 
    | FetchUserPosts 
    | DeleteUserPost
    | CreateUserPost
    | EditUser
    | FetchUserFollowing 
    | FetchUsers 
    | FetchUsersPosts 
    | FetchUserLikesAndComments
    | OpenClosePostDetails