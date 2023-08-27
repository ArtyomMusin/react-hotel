import axios from 'axios'
import config from '../../config.json'
import localStorageService from './localStorage.service'
import { logOut, tokenIsExpired } from '../store/authReducer'
import authService from './auth.service'
import { store } from '../../index'

const http = axios.create({
    baseURL: config.apiEndpoint,
    validateStatus: (status) => {
        return status >= 200 && status < 500
    }
})

http.interceptors.request.use(async(config) => {
    const refreshToken = localStorageService.getRefreshToken()
    const isExpired = tokenIsExpired()
    if (refreshToken && isExpired) {
        try {
            const { content } = await authService.refresh()
            localStorageService.setTokens(content)
        } catch (e) {
            await store.dispatch(logOut())
        }
    }

    const accessToken = localStorageService.getAccessToken()
    if (accessToken) {
        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${accessToken}`
        }
    }
    return config
})

http.interceptors.response.use((res) => {
    res.data = { content: res.data }
    return res
})

const httpService = {
    get: http.get,
    post: http.post,
    put: http.put,
    delete: http.delete,
    patch: http.patch
}

export default httpService
