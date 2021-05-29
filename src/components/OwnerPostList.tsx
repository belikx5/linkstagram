import '../styles/ownerPostList.scss'
import React from 'react'
import { Post } from '../store/actionTypes';

type OwnerPostListProps = {
    posts: Post[]
}

const OwnerPostList = ({ posts }: OwnerPostListProps ) => {

    if(!posts.length) {
        return <>
            <h2>You don't have any posts </h2>
            <h3>Try to add a new one 👌</h3>
        </>
    }
    posts.sort((a,b) =>  b.creation.seconds - a.creation.seconds)
    return (
        <div className="owner-posts">
            {posts.map((post, index) => {
                return <img key={index} className="owner-posts-image" src={post.image} />
            })}
        </div>
    )
}

export default OwnerPostList
