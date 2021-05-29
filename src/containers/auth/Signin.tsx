import "../../styles/authPage.scss";
import React from 'react'
import AuthForm from '../../components/AuthForm'
import { signIn } from '../../firebase/helpers'

const Signin = () => {

    const authParams = {
        action: 'Log in',
        onSubmit: signIn,
        isSignup: false,
        linkTo: '/signup',
        linkHeader: 'Don\'t have an account?',
        linkName: 'Create an account'
    }
    return (
        <div className="auth">
            <div className="auth-img-container">
                <img src={`${process.env.PUBLIC_URL}/assets/login-img-1.png`}/>
                <img src={`${process.env.PUBLIC_URL}/assets/login-img-2.png`}/>
            </div>
            <AuthForm {...authParams}/>
        </div>
    )
}

export default Signin
