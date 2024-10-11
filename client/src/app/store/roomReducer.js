import { createSlice } from '@reduxjs/toolkit'
import roomService from '../services/room.service'
import * as _ from 'lodash'

const initialState = {
    isLoading: true,
    allRooms: null,
    currentRooms: null,
    roomsByHotel: null,
    error: null
}

const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        dataRequested: (state) => {
            state.isLoading = true
            state.error = null
        },
        dataReceived: (state, action) => {
            state.isLoading = false
            state.allRooms = action.payload
        },
        dataRoomsByHotelReceived: (state, action) => {
            state.isLoading = false
            state.roomsByHotel = action.payload.sort((a, b) => a.room - b.room)
        },
        dataCurrentRoomsReceived: (state, action) => {
            state.isLoading = false
            state.currentRooms = action.payload.sort((a, b) => a.room - b.room)
        },
        dataRequestedFailed: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
        dataUpdateRoom: (state, action) => {
            const index = state.roomsByHotel?.findIndex((room) => room.id === action.payload.id)
            const rooms = _.cloneDeep(state.roomsByHotel)
            rooms[index] = action.payload
            state.roomsByHotel = rooms
        }
    }
})

const { reducer: roomReducer, actions } = roomSlice
const { dataRequested, dataReceived, dataRequestedFailed, dataRoomsByHotelReceived, dataCurrentRoomsReceived, dataUpdateRoom } = actions

export const loadAllRooms = () => async(dispatch) => {
    dispatch(dataRequested())
    try {
        const { content } = await roomService.getAll()
        dispatch(dataReceived(content))
    } catch (e) {
        dispatch(dataRequestedFailed(e.message))
    }
}

export const loadRoomsByHotel = (id) => async(dispatch) => {
    dispatch(dataRequested())
    try {
        const { content } = await roomService.getByHotel(id)
        dispatch(dataRoomsByHotelReceived(content))
    } catch (e) {
        dispatch(dataRequestedFailed(e.message))
    }
}

export const loadRoomsByIds = (roomsIdsArray) => async(dispatch) => {
    dispatch(dataRequested())
    try {
        const result = await Promise.all(roomsIdsArray.map(async roomId => await roomService.getById(roomId)))
        const content = result.map(obj => obj.content)
        dispatch(dataCurrentRoomsReceived(content))
    } catch (e) {
        dispatch(dataRequestedFailed(e.message))
    }
}

export const updateRoomData = (newData) => async(dispatch) => {
    try {
        const newDataWithCorrectImgPaths = { ...newData, images: newData.images.map(fullPath => fullPath.replace(/^.*[\\/]/, '')) }
        const { content } = await roomService.updateRoom(newDataWithCorrectImgPaths)
        dispatch(dataUpdateRoom(content))
        return { code: 200, message: 'Successful' }
    } catch (e) {
        dispatch(dataRequestedFailed(e.message))
        if (e.message === 'Unauthorized') {
            return { code: 401, message: 'Unauthorized' }
        }
        return { code: 500, message: 'Server error. Try later' }
    }
}

export const getAllRooms = () => (state) => state.rooms.allRooms
export const getRoomById = (id) => (state) => state.rooms.allRooms?.find(room => room._id === id)
export const getCurrentRooms = () => (state) => state.rooms.currentRooms
export const getRoomsByHotel = () => (state) => state.rooms.roomsByHotel
export const getByIdOfRoomsByHotel = (id) => (state) => state.rooms.roomsByHotel?.find(room => room._id === id)

export default roomReducer
