import { createSlice } from '@reduxjs/toolkit'
import cityService from '../services/city.services'

const initialState = {
    entities: null,
    isLoading: true,
    error: null
}

const citySlice = createSlice({
    name: 'city',
    initialState,
    reducers: {
        dataRequested: (state) => {
            state.isLoading = true
            state.error = null
        },
        dataReceived: (state, action) => {
            state.entities = action.payload
            state.isLoading = false
        },
        dataRequestedFailed: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        }
    }
})

const { reducer: cityReducer, actions } = citySlice
const { dataRequested, dataReceived, dataRequestedFailed } = actions

export const loadCities = () => async(dispatch) => {
    dispatch(dataRequested())
    try {
        const { content } = await cityService.getAll()
        dispatch(dataReceived(content))
    } catch (e) {
        dispatch(dataRequestedFailed(e.message))
    }
}

export const getAllCities = () => (state) => state.cities.entities
export const getCityById = (id) => (state) => state.cities.entities?.find(item => item._id === id)

export default cityReducer
