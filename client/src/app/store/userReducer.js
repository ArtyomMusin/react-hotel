import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/user.service'
import localStorageService from '../services/localStorage.service'

const initialState = {
    isLoading: false,
    userData: null,
    severalUsers: null,
    error: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        dataRequested: (state) => {
            state.isLoading = true
            state.error = null
        },
        dataReceived: (state, action) => {
            state.userData = action.payload
            state.isLoading = false
        },
        dataSeveralUsersReceived: (state, action) => {
            state.severalUsers = action.payload
            state.isLoading = false
        },
        dataRequestFailed: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        },
        dropData: (state) => {
            state.userData = null
        }
    }
})

const { reducer: userReducer, actions } = userSlice
const { dataRequested, dataReceived, dataRequestFailed, dropData, dataSeveralUsersReceived } = actions

export const loadUserData = () => async(dispatch) => {
    dispatch(dataRequested())
    try {
        const { content } = await userService.getUserById(localStorageService.getUserId())
        if (content?.error) {
            throw new Error(content?.error?.message)
        }
        dispatch(dataReceived(content))
    } catch (e) {
        dispatch(dataRequestFailed(e.message))
    }
}

export const loadUsersByIds = (usersIdsArray) => async(dispatch) => {
    dispatch(dataRequested())
    try {
        const result = await Promise.all(usersIdsArray.map(async userId => await userService.getUserById(userId)))
        const content = result.map(obj => obj.content)
        dispatch(dataSeveralUsersReceived(content))
    } catch (e) {
        dispatch(dataRequestFailed(e.message))
    }
}

export const clearUserData = () => async(dispatch) => {
    await dispatch(dropData())
}

export const getUser = () => (state) => state.user.userData
export const getSeveralUsers = () => (state) => state.user.severalUsers
export const getRole = () => (state) => state.user.userData?.role

export default userReducer
