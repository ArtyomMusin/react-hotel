import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadHotelsData } from '../../../store/hotelReducer'
import { loadCities } from '../../../store/cityReducer'
import { loadCountries } from '../../../store/countryReducer'
import { getAuthId } from '../../../store/authReducer'
import { loadOrdersByUser } from '../../../store/orderReducer'

const AppLoader = ({ children }) => {
    const dispatch = useDispatch()
    const userId = useSelector(getAuthId())

    useEffect(() => {
        dispatch(loadCountries())
        dispatch(loadCities())
        dispatch(loadHotelsData())
        if (userId) {
            dispatch(loadOrdersByUser(userId))
        }
    }, [])

    return children
}

export default AppLoader
