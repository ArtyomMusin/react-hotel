import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getHotelById } from '../../store/hotelReducer'
import { getCountryById } from '../../store/countryReducer'
import { getCityById } from '../../store/cityReducer'
import './HotelPage.scss'
import { getRoomsByHotel, loadRoomsByHotel } from '../../store/roomReducer'
import HotelCalendar from '../ui/HotelCalendar'
import RoomsScreen from '../common/RoomsScreen'
import { getMonthOrders, loadMonthHotelInfo } from '../../store/orderReducer'
import { toTimestamp } from '../../utils/dateСonversion'

const HotelPage = () => {
    const dispatch = useDispatch()

    const { hotelId } = useParams()
    const hotelData = useSelector(getHotelById(hotelId))
    const country = useSelector(getCountryById(hotelData?.country))
    const city = useSelector(getCityById(hotelData?.city))
    const rooms = useSelector(getRoomsByHotel())
    const monthOrders = useSelector(getMonthOrders())

    const [date, setDate] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [dayOrders, setDayOrders] = useState([])

    const chooseDate = (day, month, year) => {
        setDate(`${day}.${month}.${year}`)
    }

    const loadOrders = async() => {
        const splitted = date.split('.')
        return await dispatch(loadMonthHotelInfo(splitted[1], splitted[2], hotelId))
    }

    useEffect(async() => {
        setIsLoading(true)
        await loadOrders()
        await dispatch(loadRoomsByHotel(hotelId))
        setIsLoading(false)
    }, [])

    useEffect(async() => {
        setIsLoading(true)
        await loadOrders()
        setIsLoading(false)
    }, [date])

    useEffect(() => {
        setDayOrders(monthOrders?.filter(order => order.date === toTimestamp(date)))
    }, [monthOrders, date])

    return (
        <section className="HotelPage">
            <div className="mb-3">
                <Link className="RoomPage__Back text-decoration-none" to={'/hotels'}><i className="bi bi-arrow-left mx-1"></i>Back to hotels</Link>
            </div>
            <div className="d-flex flex-row gap-3">
                <div className="HotelPage__ImgBox d-flex flex-column">
                    <img className="HotelPage__Img mb-3" src={hotelData?.images[0]}/>
                    <div className="d-flex flex-row w-100 gap-2 mb-4">
                        <Link className="btn btn-outline-dark mb-2 w-100 " to={`${hotelId}/rooms`}>Go to rooms</Link>
                    </div>
                    <div className="d-flex flex-row justify-content-between">
                        <HotelCalendar chosenDate={date} onClickDate={chooseDate} changeMonth={loadOrders}/>
                        <RoomsScreen
                            rooms={rooms}
                            orders={dayOrders}
                            date={date}
                            hotel={hotelId}
                            currentCity={city?._id}
                            isLoading={isLoading}
                            refreshData={loadOrders}
                        />
                    </div>
                </div>
                <div className="d-flex flex-column">
                    <h1 className="HotelPage__Title mb-0">{country?.name}</h1>
                    <p className="fs-5 mb-1 mt-0">{city?.name}</p>
                    <p>Address: {hotelData?.build}, {hotelData?.street}, {city?.name}, {country?.name}, {hotelData?.postalCode}</p>
                    <ul className="HotelPage__BedsQuality">
                        <li><span className="">Single rooms: {rooms?.filter(room => room.beds === 1).length}</span></li>
                        <li><span className="">Double rooms: {rooms?.filter(room => room.beds === 2).length}</span></li>
                        <li><span className="">Triple номеров: {rooms?.filter(room => room.beds === 3).length}</span></li>
                        <li><span className="">4+ person rooms: {rooms?.filter(room => room.beds > 3).length}</span></li>
                    </ul>
                    <div>
                        <p className="mb-0">About hotel:</p>
                        <p>{hotelData?.description}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HotelPage
