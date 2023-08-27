import React, { useEffect, useState } from 'react'
import './Admin.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCountries } from '../../store/countryReducer'
import { getAllCities } from '../../store/cityReducer'
import { getHotels } from '../../store/hotelReducer'
import Sidebar from '../common/Sidebar'
import ContentWrapper from '../ui/hoc/ContentWrapper'
import HotelCalendar from '../ui/HotelCalendar'
import RoomsScreen from '../common/RoomsScreen'
import {
    getCurrentRooms,
    getRoomsByHotel,
    loadRoomsByHotel,
    loadRoomsByIds
} from '../../store/roomReducer'
import { dateFormat, getDayMask, timestampToDate } from '../../utils/dateСonversion'
import { getMonthOrders, loadMonthHotelInfo, removeOrderById } from '../../store/orderReducer'
import { getSeveralUsers, loadUsersByIds } from '../../store/userReducer'
import Preloader from '../common/Preloader'

const Admin = () => {
    const dispatch = useDispatch()

    const countries = useSelector(getAllCountries())
    const cities = useSelector(getAllCities())
    const hotels = useSelector(getHotels())
    const monthOrders = useSelector(getMonthOrders())       // all orders by month
    const roomsByOrders = useSelector(getCurrentRooms())    // all rooms which ordered by month
    const roomsByHotel = useSelector(getRoomsByHotel())     // all rooms by hotel
    const usersByOrders = useSelector(getSeveralUsers())    // all user which ordered rooms by month

    const [countriesForSidebar, setCountriesForSidebar] = useState([])      // modified countries list for sidebar
    const [chosenCountry, setChosenCountry] = useState('all')
    const [citiesByCountry, setCitiesByCountry] = useState([])
    const [chosenCity, setChosenCity] = useState('')
    const [hotel, setHotel] = useState('')                                  // hotel by country
    const [chosenDate, setChosenDate] = useState(timestampToDate(Date.now()))        // date format day.monthIndex.fullYear
    const [ordersByHotelPerMonth, setOrdersByHotelPerMonth] = useState([])    // orders by hotel for chosen month
    const [ordersByHotelPerDate, setOrdersByHotelPerDate] = useState([])    // orders by hotel for chosen date
    const [isLoadingDateData, setIsLoadingDateData] = useState(true)
    const [isLoadingMonthData, setIsLoadingMonthData] = useState(true)
    const [isLoadingRemoveOrder, setIsLoadingRemoveOrder] = useState('')

    // set countries list and chosen country
    useEffect(() => {
        if (!countries) return
        setCountriesForSidebar([{ name: 'All', _id: 'all' }, ...countries])
        if (!chosenCountry) {
            setChosenCountry(countries[0]?._id)
        }
    }, [countries])

    // set first item like chosen in render into countries list
    useEffect(() => {
        if (!countriesForSidebar) return
        if (!chosenCountry) {
            setChosenCountry(countries[0]?._id)
        }
    }, [countriesForSidebar])

    // set cities list
    useEffect(() => {
        setCitiesByCountry(chosenCountry === 'all' ? cities : cities?.filter(city => city.country === chosenCountry))
    }, [chosenCountry, cities])

    // set first item like chosen in render into cities list
    useEffect(() => {
        if (citiesByCountry?.length) {
            setChosenCity(citiesByCountry[0]?._id)
        }
    }, [citiesByCountry, cities])

    // set chosen hotel by city
    useEffect(() => {
        if (chosenCity && hotels?.length) {
            setHotel(hotels?.find(hotel => hotel?.city === chosenCity)?._id)
        }
    }, [chosenCity, hotels])

    // load rooms after choose hotel
    useEffect(() => {
        if (hotel) {
            dispatch(loadRoomsByHotel(hotel))
        }
    }, [hotel])

    // load orders of hotel per month
    useEffect(() => {
        refreshMonthInfo()
    }, [hotel, chosenDate])

    useEffect(() => {
        loadDataForTable()
    }, [monthOrders])

    useEffect(() => {
        setDataForRoomsScreen()
    }, [chosenDate, monthOrders])

    useEffect(() => {
        generateDataForTable()
    }, [chosenDate, monthOrders, roomsByHotel, usersByOrders])

    const setDataForRoomsScreen = () => {
        setIsLoadingDateData(true)
        if (!monthOrders) {
            setOrdersByHotelPerDate([])
            setIsLoadingDateData(false)
        }
        setOrdersByHotelPerDate(monthOrders?.filter(order => timestampToDate(order.date) === chosenDate))
        setIsLoadingDateData(false)
    }

    // load rooms and users after change month or hotel
    const loadDataForTable = async() => {
        setIsLoadingMonthData(true)
        if (!monthOrders) {
            setOrdersByHotelPerMonth([])
            return setIsLoadingMonthData(false)
        }
        await dispatch(loadRoomsByIds(monthOrders?.reduce((roomsIds, order) => [...roomsIds, order.room], [])))
        await dispatch(loadUsersByIds(monthOrders?.reduce((usersIds, order) => [...usersIds, order.user], [])))
        setIsLoadingMonthData(false)
    }

    const generateDataForTable = () => {
        if (!chosenDate || !monthOrders || !roomsByHotel || !usersByOrders) return
        const orders = monthOrders
            ?.map(order => ({
                ...order,
                roomNumber: roomsByOrders?.find(room => room?._id === order?.room)?.room,
                tel: usersByOrders?.find(user => user?._id === order?.user)?.tel,
                userName: usersByOrders?.find(user => user?._id === order?.user)?.name
            }))
            ?.sort((a, b) => a?.date - b?.date)
        setOrdersByHotelPerMonth(orders)
    }

    const refreshMonthInfo = (date) => {
        if (chosenDate && hotel) {
            const splitted = date ? date?.split('.') : chosenDate?.split('.')
            dispatch(loadMonthHotelInfo(splitted[1], splitted[2], hotel))
        }
    }

    const handlerChangeMonth = (month, year) => {
        const chosenDate = getDayMask(1, month, year)
        setChosenDate(chosenDate)
        refreshMonthInfo(chosenDate)
    }

    const handlerClickOnDate = (day, month, year) => {
        const chosenDate = getDayMask(day, month, year)
        setChosenDate(chosenDate)
    }

    const handlerChooseCountry = (id) => {
        setChosenCountry(id)
    }

    const handlerChooseCity = (id) => {
        setChosenCity(id)
    }

    const handleRemove = async(orderId) => {
        setIsLoadingRemoveOrder(orderId)
        await dispatch(removeOrderById(orderId))
        setIsLoadingRemoveOrder('')
    }

    return (
        <ContentWrapper className="align-items-center">
            <div className="Admin">
                <h1 className="Admin__Title">Admin panel</h1>
                <section className="Admin__Content">
                    <Sidebar data={countriesForSidebar} current={chosenCountry} onClick={handlerChooseCountry}/>
                    <Sidebar data={citiesByCountry} current={chosenCity} onClick={handlerChooseCity}/>
                    <div className="Admin__Rooms px-5 d-flex flex-column gap-2">
                        <HotelCalendar chosenDate={chosenDate} onClickDate={handlerClickOnDate} changeMonth={handlerChangeMonth}/>
                        <RoomsScreen
                            rooms={roomsByHotel}
                            orders={ordersByHotelPerDate}
                            date={chosenDate}
                            hotel={hotel}
                            currentCity={chosenCity}
                            isLoading={isLoadingDateData || isLoadingMonthData}
                            refreshData={refreshMonthInfo}
                            adminPanel={true}
                        />
                    </div>
                    <div className="orders">
                        {ordersByHotelPerMonth?.length ? (
                            <table className="orders__table">
                                <thead className="orders__head">
                                    <tr className="orders__row">
                                        <th className="orders__cell">Date</th>
                                        <th className="orders__cell">Room</th>
                                        <th className="orders__cell">Name</th>
                                        <th className="orders__cell">Phone</th>
                                        <th className="orders__cell">Cancel</th>
                                    </tr>
                                </thead>
                                <tbody className="orders__body">
                                    {ordersByHotelPerMonth?.map(order =>
                                        <tr key={order._id} className="orders__row">
                                            <td className="orders__cell">{dateFormat(timestampToDate(order.date))}</td>
                                            <td className="orders__cell">{order.roomNumber}</td>
                                            <td className="orders__cell">{order.userName}</td>
                                            <td className="orders__cell">{order.tel}</td>
                                            <td className="orders__cell">
                                                <button className="btn btn-danger" onClick={() => handleRemove(order._id)}>
                                                    {isLoadingRemoveOrder === order._id ? <Preloader /> : 'cancel'}
                                                </button>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        ) : (
                            <h3 className="text-center">No orders</h3>
                        )}
                        {isLoadingMonthData && (
                            <div className="orders__preloader">
                                <Preloader color={'text-dark'}/>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </ContentWrapper>
    )
}

export default Admin
