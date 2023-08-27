import React, { useContext, createContext, useState } from 'react'
import PropTypes from 'prop-types'
import localStorageService from '../services/localStorage.service'
import { useDispatch } from 'react-redux'
import { loadUserData } from '../store/userReducer'
import useModal from './useModal'
import AuthModal from '../components/ui/AuthModal'

const authContext = createContext({})

const useAuth = () => {
    return useContext(authContext)
}

export const AuthProvider = ({ children }) => {
    const dispatch = useDispatch()
    const { modalIsShow, toggleModal, setContent } = useModal()

    const [isLogin, setIsLogin] = useState(true)

    const accessToken = localStorageService.getAccessToken()
    if (accessToken) {
        dispatch(loadUserData(localStorageService.getUserId()))
    }

    const toggleIsLogin = () => {
        setIsLogin(prevState => !prevState)
    }

    const toggleAuthModal = () => {
        if (!modalIsShow) {
            setContent(<AuthModal/>)
        }
        toggleModal()
    }

    const providerValue = { modalIsShow, toggleAuthModal, isLogin, toggleIsLogin }

    return (
        <authContext.Provider value={providerValue}>
            { children }
        </authContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}

export default useAuth
