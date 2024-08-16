import { createSlice } from '@reduxjs/toolkit'
import authService from '../services/auth.service'
import localStorageService from '../services/localStorage.service'
import { clearUserData, loadUserData } from './userReducer'
import { dropUserOrders, loadOrdersByUser } from './orderReducer'

const initialState = {
    _id: localStorageService.getUserId() || null,
    isLoggedIn: Boolean(localStorageService.getAccessToken()) || null,
    isLoading: false,
    error: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        dataRequested: (state) => {
            state.isLoading = true
            state.error = null
        },
        dataReceived: (state, action) => {
            state.isLoggedIn = true
            state.isLoading = false
            state._id = action.payload.userId
        },
        dataRequestFailed: (state, action) => {
            state.isLoggedIn = null
            state.isLoading = false
            state.error = action.payload
        },
        dataDrop: (state) => {
            state._id = null
            state.isLoggedIn = null
        },
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload
        }
    }
})

const { reducer: authReducer, actions } = authSlice
const { dataRequested, dataReceived, dataRequestFailed, dataDrop, setIsLoggedIn } = actions

export const setIsLoggedInAction = (value) => (dispatch) => dispatch(setIsLoggedIn(value))

export const signIn = (data) => async(dispatch) => {
    dispatch(dataRequested())
    try {
        const { content } = await authService.login(data)
        if (content?.error?.code >= 400) {
            dispatch(dataRequestFailed(content?.error?.message))
            return content
        }
        localStorageService.setTokens(content)
        await dispatch(loadUserData())
        await dispatch(dataReceived(content))
        await dispatch(loadOrdersByUser(localStorageService.getUserId()))
        return content
    } catch (e) {
        const { payload } = await dispatch(dataRequestFailed(e.message))
        if (payload?.includes('400')) {
            return {
                status: 400
            }
        }
    }
}

export const register = (payload) => async(dispatch) => {
    dispatch(dataRequested())
    try {
        const { content } = await authService.register(payload)
        if (content.error) {
            throw new Error(content.error.message)
        }
        localStorageService.setTokens(content)
        dispatch(loadUserData(content.userId))
        dispatch(dataReceived(content))
    } catch (e) {
        dispatch(dataRequestFailed(e.message))
    }
}

export const logOut = () => async(dispatch) => {
    localStorageService.removeAuthData()
    await dispatch(clearUserData())
    await dispatch(dataDrop())
    await dispatch(dropUserOrders())
}

export const tokenIsExpired = () => {
    return localStorageService.getTokenExpiresDate() - Date.now() < 0
}

export const getIsLoggedIn = () => (state) => state.auth.isLoggedIn
export const getAuthId = () => (state) => state.auth._id

export default authReducer
