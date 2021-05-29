import '../styles/stories.scss'
import React from 'react'
import UserIcon from './UserIcon'
import { UserIconSize } from '../ts/enums'
import { GeneralUser } from '../store/actionTypes'

type StoriesProps = {
    users: GeneralUser[];
}

const Stories = ({ users }: StoriesProps) => {
    return (
        <div className="stories">
            <div className="stories-container">
                {users?.map((u, i) => {
                    return <div key={i} className="story">
                        <UserIcon icon={u.avatar}  size={UserIconSize.Medium}/>
                    </div>
                })}
                <div className="empty-story"><p></p></div>
            </div>
            
        </div>
    )
}

export default Stories
