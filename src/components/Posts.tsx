import React from 'react'
import Post from '../components/Post'
import { UserPostHybrid } from '../store/actionTypes'
import Loading from './Loading'

type PostsProps = {
    feed: UserPostHybrid[]
}

const Posts = ({ feed }:PostsProps) => {
    if(!feed.length) {
        return <Loading />
    }
   
    return (
        <div className="posts-list">
            {feed.map((post, index) => {
                return <Post key={index} postData={post} />
            })}
        </div>
    )
}

export default Posts
