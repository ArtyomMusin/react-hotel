import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './RoomsScreen.scss'
import Preloader from './Preloader'
import { dateFormat, getStartOfDay, toTimestamp } from '../../utils/dateСonversion'
import useModal from '../../context/useModal'
import Confirm from './Confirm'
import { useDispatch, useSelector } from 'react-redux'
import { orderRoom, removeOrderById } from '../../store/orderReducer'
import OrderForm from '../ui/OrderForm'
import localStorageService from '../../services/localStorage.service'
import { getAllCountries } from '../../store/countryReducer'
import { getAllCities } from '../../store/cityReducer'
import { useHistory } from 'react-router-dom'

const RoomsScreen = ({ rooms, orders, isLoading, date, hotel, currentCity, refreshData, adminPanel }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const { setContent, openModal, closeModal } = useModal()
    const userId = localStorageService.getUserId()
    const countries = useSelector(getAllCountries())
    const cities = useSelector(getAllCities())
    const currentCountry = cities?.find(city => city._id === currentCity)?.country
    const todayDate = new Date()
    const isDisable = toTimestamp(date) < getStartOfDay(`${todayDate.getDate()}.${todayDate.getMonth()}.${todayDate.getFullYear()}`)

    const [isSending, setIsSending] = useState(false)

    const handleRemoveOrder = (id) => {
        dispatch(removeOrderById(id))
        closeModal()
    }

    const handleCreateOrder = async(customerData, room) => {
        setIsSending(true)
        const data = {
            ...customerData,
            date: toTimestamp(date),
            user: userId,
            country: countries?.find(country => country._id === currentCountry)._id,
            hotel: hotel,
            room: room._id,
            city: currentCity
        }

        await dispatch(orderRoom(data))
        setIsSending(false)
        closeModal()
        refreshData()
    }

    const handleCLick = (room) => {
        if (!adminPanel) {
            return history.push(`/hotels/${hotel}/rooms/${room._id}`)
        }
        if (isDisable) return
        const { _id: id, room: roomNumber } = room
        const isBooked = orders?.find(order => order.room === id)
        openModal()
        if (isBooked) {
            setContent(<Confirm onClick={() => handleRemoveOrder(id)} description={`Do you want remove order for room ${roomNumber}?`}/>)
        } else {
            setContent(<OrderForm onSubmit={(data) => handleCreateOrder(data, room)} isSending={isSending}/>)
        }
    }

    const checkInOrders = (roomId) => {
        return orders?.find(order => order.room === roomId) ? 'RoomsScreen__Ordered' : ''
    }

    return (
        <div className="RoomsScreen">
            <h5 className="RoomsScreen__Title">Rooms {dateFormat(date)}</h5>
            <div className="RoomsScreen__List">
                {rooms?.map(room =>
                    <div key={room._id} className={`RoomsScreen__Room ${isDisable && adminPanel ? '_disable' : ''} ${checkInOrders(room._id)}`} onClick={() => handleCLick(room)}>{room.room}</div>
                )}
            </div>
            {isLoading && (
                <div className="RoomsScreen__Preloader">
                    <Preloader color={'text-dark'}/>
                </div>
            )}
        </div>
    )
}
RoomsScreen.defaultProps = {
    adminPanel: false
}
RoomsScreen.propTypes = {
    rooms: PropTypes.oneOfType([PropTypes.array.isRequired, PropTypes.oneOf([null])]),
    orders: PropTypes.array,
    isLoading: PropTypes.bool,
    date: PropTypes.string,
    hotel: PropTypes.string,
    currentCity: PropTypes.string,
    refreshData: PropTypes.func,
    adminPanel: PropTypes.bool
}

export default RoomsScreen
