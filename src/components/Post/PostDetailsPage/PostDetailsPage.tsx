import "./postDetailsPage.scss";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import Loading from "../../ui/Loading/Loading";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { fetchPostById } from "../../../store/actions/postActions";
import Post from "../PostItem/Post";
import Comment from "../PostComment/Comment";
import CreateCommentForm from "../PostComment/CreateCommentForm";
import { sortCommentsDesc } from "../../../services/sorting";

interface ParamsType {
  postId: string;
}

function PostDetailsPage() {
  const { postId } = useParams<ParamsType>();
  const currentPost = useTypedSelector((state) => state.postsState.currentPost);
  const currentUser = useTypedSelector((state) => state.userState.currentUser);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPostById(+postId));
  }, []);
  return (
    <div className="post-details-page">
      {!currentPost && <Loading />}
      {currentPost && (
        <>
          <Post postData={currentPost} />
          <CreateCommentForm postId={+postId} currentUser={currentUser} />
          <div className="post-details-page-comments">
            {sortCommentsDesc(currentPost.comments).map((p, i) => {
              return <Comment data={p} key={i} showAuthor />;
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default PostDetailsPage;
