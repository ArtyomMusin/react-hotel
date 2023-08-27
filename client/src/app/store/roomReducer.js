import { createSlice } from '@reduxjs/toolkit'
import roomService from '../services/room.service'

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
        }
    }
})

const { reducer: roomReducer, actions } = roomSlice
const { dataRequested, dataReceived, dataRequestedFailed, dataRoomsByHotelReceived, dataCurrentRoomsReceived } = actions

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

export const getAllRooms = () => (state) => state.rooms.allRooms
export const getRoomById = (id) => (state) => state.rooms.allRooms?.find(room => room._id === id)
export const getCurrentRooms = () => (state) => state.rooms.currentRooms
export const getRoomsByHotel = () => (state) => state.rooms.roomsByHotel
export const getByIdOfRoomsByHotel = (id) => (state) => state.rooms.roomsByHotel?.find(room => room._id === id)

export default roomReducer
