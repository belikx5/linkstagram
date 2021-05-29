import React from 'react'
import { signUp } from '../../firebase/helpers'

import AuthForm from '../../components/AuthForm'

const Signup = () => {
    const authParams = {
        action: 'Sign up',
        onSubmit: signUp,
        isSignup: true,
        linkTo: '/signin',
        linkHeader: 'Already have an account? ',
        linkName: 'Log in'
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

export default Signup
