import { createSlice } from '@reduxjs/toolkit'
import orderService from '../services/order.service'
import { getStartAndEndOfMonth } from '../utils/dateСonversion'

const initialState = {
    infoData: null,
    userOrders: null,
    isLoading: null,
    error: null
}

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        dataRequested: (state) => {
            state.isLoading = true
            state.error = null
        },
        dataReceived: (state, action) => {
            state.infoData = action.payload
            state.isLoading = false
        },
        dataUserReceived: (state, action) => {
            state.userOrders = action.payload
            state.isLoading = false
        },
        dropUserInfo: (state) => {
            state.userOrders = null
        },
        dropInfoData: (state) => {
            state.infoData = null
        },
        dataRequestedFailed: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
        filterOrdersById: (state, action) => {
            state.userOrders.orders = state.userOrders.orders.filter(order => order._id !== action.payload)
            state.infoData = state.infoData?.filter(order => order._id !== action.payload)
        }
    }
})

const { reducer: orderReducer, actions } = orderSlice
const { dataRequested, dataReceived, dataRequestedFailed, dataUserReceived, dropUserInfo, dropInfoData, filterOrdersById } = actions

export const loadInfoByMonth = (month, year, roomId) => async(dispatch) => {
    if (!month || !year || !roomId) return
    dispatch(dataRequested())
    try {
        const data = { ...getStartAndEndOfMonth(month, year), room: roomId }
        const { content } = await orderService.getInfoByMonth(data)
        content.forEach(order => new Date(order.date).getMonth() === 9)
        dispatch(dataReceived(content))
    } catch (e) {
        dispatch(dataRequestedFailed(e.message))
    }
}

export const loadMonthHotelInfo = (month, year, hotelId) => async(dispatch) => {
    dispatch(dataRequested())
    try {
        dispatch(dropInfoData())
        const data = { ...getStartAndEndOfMonth(month, year), hotel: hotelId }
        const { content } = await orderService.getMonthInfoByHotel(data)
        if (content?.error) {
            throw new Error(content?.error?.message)
        }
        content.forEach(order => new Date(order.date).getMonth() === 9)
        dispatch(dataReceived(content))
    } catch (e) {
        dispatch(dropInfoData())
        dispatch(dataRequestedFailed(e.message))
    }
}

export const loadOrdersByUser = (userId) => async(dispatch) => {
    dispatch(dataRequested())
    try {
        const { content } = await orderService.getOrderByUser(userId)
        content.forEach(order => new Date(order.date).getMonth() === 9)
        dispatch(dataUserReceived({ user: userId, orders: content }))
    } catch (e) {
        dispatch(dataRequestedFailed(e.message))
    }
}

export const dropUserOrders = () => (dispatch) => {
    dispatch(dropUserInfo())
}

export const orderRoom = (data) => async() => {
    try {
        const array = Array.isArray(data) ? await Promise.all(data.map(order => orderService.sendOrder(order))) : await orderService.sendOrder(data)
        if (array[0]?.content?.error) throw new Error(array[0]?.content?.error?.message)
        return { code: 200, message: 'Successful' }
    } catch (e) {
        if (e.message === 'Unauthorized') {
            return { code: 401, message: 'Unauthorized' }
        }
        return { code: 500, message: 'Server error. Try later' }
    }
}

export const removeOrderById = (id) => async(dispatch) => {
    try {
        const { content } = await orderService.delete(id)
        if (content?.code === 200) {
            dispatch(filterOrdersById(id))
        }
    } catch (e) {
        console.log('error', e.message)
    }
}

export const getMonthOrders = () => (state) => state.orders?.infoData
export const getUserOrders = () => (state) => state.orders?.userOrders?.orders

export default orderReducer
