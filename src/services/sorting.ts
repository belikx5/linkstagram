import { Post, Comment } from "../store/actionTypes/postActionTypes";

export const sortPostsDesc = (data: Post[]) =>
  data?.sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at));

export const sortCommentsDesc = (data: Comment[]) =>
  data?.sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at));
