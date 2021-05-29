import '../styles/navbar.scss'
import React, { useEffect } from 'react'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import history  from '../services/history'
import { logout } from '../store/actions/userActions'
import { UserIconSize } from '../ts/enums'
import { RootStore } from '../store'
import { CurrentUser, LinkstaDispatchTypes } from '../store/actionTypes'
import UserIcon from '../components/UserIcon'
import { Link, useLocation } from 'react-router-dom'

type NavbarProps = {
    currentUser: CurrentUser | null,
    logout: Function
}

const Navbar = ({ currentUser, logout }:NavbarProps) => {

    const location = useLocation()
    const { pathname } = location;

    const renderNavOptions = () => {
        if(pathname === "/profile" ){
            <button onClick={() => history.push("/")} className="home-button">Home</button>
        }else if(pathname === "/edit" || pathname === "/create"){
            return <button onClick={()=> logout()} className="some-button white red">Logout</button>
            // return <button onClick={() => history.push("/profile")} className="some-button white">Profile information</button>
        } else if(pathname === "/"){
            return (<>
                <button onClick={() => history.push("/")} className="home-button">Home</button>
                <Link to="/profile" className="header-title-user-profile-pic">
                    <UserIcon icon={currentUser?.avatar} size={UserIconSize.Small} />
                </Link>
            </>)
        }
    }

    return (
        <div className="header">
            <div className="nav-options">
                <p onClick={()=>history.push('/')}className="header-title">Linkstagram</p>
                <div >{renderNavOptions()}</div>
            </div>
        </div>
    )
}

const mapStateToProps = (state:RootStore) => ({
    currentUser: state.userState.currentUser
})

const mapDispatchToProps = (dispatch:Dispatch<LinkstaDispatchTypes>) => bindActionCreators({ logout }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
