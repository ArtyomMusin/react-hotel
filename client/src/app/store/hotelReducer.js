import { createSlice } from '@reduxjs/toolkit'
import hotelService from '../services/hotel.service'

const initialState = {
    isLoading: true,
    entities: null,
    error: null
}

const hotelSlice = createSlice({
    name: 'hotel',
    initialState,
    reducers: {
        dataRequested: (state) => {
            state.isLoading = true
            state.error = null
        },
        dataReceived: (state, action) => {
            state.isLoading = false
            state.entities = action.payload
        },
        dataRequestedFailed: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        }
    }
})

const { reducer: hotelReducer, actions } = hotelSlice
const { dataRequested, dataReceived, dataRequestedFailed } = actions

export const loadHotelsData = () => async(dispatch) => {
    dispatch(dataRequested())
    try {
        const { content } = await hotelService.getAll()
        dispatch(dataReceived(content))
    } catch (e) {
        dispatch(dataRequestedFailed())
    }
}

export const getHotels = () => (state) => state.hotels.entities
export const getHotelById = (id) => (state) => state.hotels.entities?.find(hotel => hotel._id === id)

export default hotelReducer
