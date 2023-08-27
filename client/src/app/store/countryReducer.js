import { createSlice } from '@reduxjs/toolkit'
import countryService from '../services/country.service'

const initialState = {
    entities: null,
    isLoading: true,
    error: null
}

const countrySlice = createSlice({
    name: 'country',
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

const { reducer: countryReducer, actions } = countrySlice
const { dataRequested, dataReceived, dataRequestedFailed } = actions

export const loadCountries = () => async(dispatch) => {
    dispatch(dataRequested())
    try {
        const { content } = await countryService.getAll()
        dispatch(dataReceived(content))
    } catch (e) {
        dispatch(dataRequestedFailed(e.message))
    }
}

export const getAllCountries = () => (state) => state.countries.entities
export const getCountryById = (id) => (state) => state.countries.entities?.find(item => item._id === id)

export default countryReducer
