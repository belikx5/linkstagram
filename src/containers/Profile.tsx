import '../styles/profile.scss'
import React, { useEffect } from 'react'
import { Dispatch, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import firebase from 'firebase'
import { RootStore } from '../store'
import { CurrentUser, LinkstaDispatchTypes, Post } from '../store/actionTypes'
import { 
    editUser, 
    fetchUser, 
    fetchUserPosts, 
    // fetchUserFollowing 
} from '../store/actions/userActions'
import UserCard from './UserCard'
import OwnerPostList from '../components/OwnerPostList'
import Loading from '../components/Loading'
import { Redirect } from 'react-router-dom'
import UserCardProfile from './UserCardProfile'

type ProfileProps = {
    currentUser: CurrentUser | null,
    //following: string[],
    posts: Post[],
    editUser: Function,
    fetchUser: Function,
    fetchUserPosts: Function,
    // fetchUserFollowing: Function
}

const Profile = (props: ProfileProps) => {
    const { 
        currentUser,
       // following,
        posts,
        editUser,
        fetchUser,
        fetchUserPosts,
        //fetchUserFollowing
    }= props;
    useEffect(()=> {
        if(!currentUser){
            fetchUser()
            fetchUserPosts()
            // fetchUserFollowing()
        }
    }, [])

    const user = currentUser 
    ? currentUser 
    : { 
        avatar: '',
        email: '',
        name: '',
        surname: '',
        nickname: '',
        job: '',
        description:''
    };

    const userCardProps ={
        user: {
            ...user,
            uid: firebase.auth().currentUser?.uid || '',
        },
        //following,
        editUser,
        isProfilePage: true,
        fetchUser
    }
    if(!firebase.auth().currentUser?.uid){
        return <Redirect to="/signin"/>
    }
    if(!currentUser && !posts.length){
        return <Loading />
    }

    return (<>
        <div className="profile mobile">
            <UserCard {...userCardProps}/>
            <OwnerPostList posts={posts}/>
        </div>
        <div className="profile desktop">
            <UserCardProfile {...userCardProps}/>
            <OwnerPostList posts={posts}/>
        </div>
    </>)
}

const mapStateToProps = (state: RootStore) => ({
    currentUser: state.userState.currentUser,
    //following: state.userState.following,
    posts: state.userState.posts
})
const mapDispatchToProps = (dispatch:Dispatch<LinkstaDispatchTypes>) => bindActionCreators({
    fetchUser,
    editUser,
    fetchUserPosts,
    // fetchUserFollowing
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Profile) 
