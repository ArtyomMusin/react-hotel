import React from 'react'
import './AuthModal.scss'
import useAuth from '../../context/useAuth'
import LoginForm from './LoginForm'
import RegistrationForm from './RegistrationForm'

const AuthModal = () => {
    const { isLogin } = useAuth()

    return isLogin ? <LoginForm /> : <RegistrationForm />
}

export default AuthModal
