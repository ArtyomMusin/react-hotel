import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from './authReducer'
import userReducer from './userReducer'
import roomReducer from './roomReducer'
import hotelReducer from './hotelReducer'
import countryReducer from './countryReducer'
import cityReducer from './cityReducer'
import orderReducer from './orderReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    rooms: roomReducer,
    hotels: hotelReducer,
    countries: countryReducer,
    cities: cityReducer,
    orders: orderReducer
})

export function createStore() {
    return configureStore({
        reducer: rootReducer
    })
}
