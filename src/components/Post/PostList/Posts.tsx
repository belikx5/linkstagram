import React from "react";
import Post from "../PostItem/Post";
import { sortPostsDesc } from "../../../services/sorting";
import { Post as PostType } from "../../../store/actionTypes/postActionTypes";
import Loading from "../../ui/Loading/Loading";

type PostsProps = {
  feed: PostType[];
  isPostsFetched: boolean
};

const Posts = ({ feed, isPostsFetched }: PostsProps) => {
  if (!feed.length && !isPostsFetched) {
    return <Loading />;
  }

  return (
    <div className="posts-list">
      {sortPostsDesc(feed).map((post, index) => {
        return <Post key={index} postData={post} />;
      })}
    </div>
  );
};

export default Posts;
