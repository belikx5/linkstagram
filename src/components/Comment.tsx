import '../styles/comment.scss'
import React from 'react'
import UserIcon from './UserIcon'
import { UserIconSize } from '../ts/enums'
import { PostComment } from '../store/actionTypes'
import { formateDate } from '../services/moment'

type CommentProps = {
    data: PostComment
}

const Comment = ({ data }: CommentProps) => {

    return (
        <div className="comment">
            <div>
                <UserIcon icon={data.user?.avatar} size={UserIconSize.Small}/>
                <div className="comment-data">
                    <p className="comment-data-text">{data.text}</p>
                    <div className="comment-data-meta">
                        <p>{data.creation ? formateDate(data.creation.seconds) : 1}</p>
                        <p>4 likes</p>
                    </div>
                </div>
            </div>
            
            <img src="../../assets/like-grey.svg"/>
        </div>
    )
}

export default Comment
