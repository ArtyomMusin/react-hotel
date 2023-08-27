import axios from 'axios'
import config from '../../config.json'
import localStorageService from '../services/localStorage.service'

const authHttp = axios.create({
    baseURL: config.apiEndpoint + 'auth/'
})

authHttp.interceptors.response.use((res) => {
    res.data = { content: res.data }
    return res
})

const authService = {
    login: async(payload) => {
        const { data } = await authHttp.post('signIn/', payload)
        return data
    },
    register: async(payload) => {
        const { data } = await authHttp.post('signUp/', payload)
        return data
    },
    refresh: async() => {
        const { data } = await authHttp.post('token/', {
            grant_type: 'refresh_token',
            refresh_token: localStorageService.getRefreshToken()
        })
        return data
    },
    isExist: async(payload) => {
        const { data } = await authHttp.post('exist/', payload)
        return data
    }
}

export default authService
