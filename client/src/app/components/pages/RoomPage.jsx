import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import './RoomPage.scss'
import ContentWrapper from '../ui/hoc/ContentWrapper'
import { useDispatch, useSelector } from 'react-redux'
import { getByIdOfRoomsByHotel, loadRoomsByHotel, updateRoomData } from '../../store/roomReducer'
import { getHotelById } from '../../store/hotelReducer'
import { getCountryById } from '../../store/countryReducer'
import { getCityById } from '../../store/cityReducer'
import RoomCalendar from '../ui/RoomCalendar'
import { dateFormat, toTimestamp } from '../../utils/dateСonversion'
import { loadInfoByMonth, loadOrdersByUser, orderRoom } from '../../store/orderReducer'
import { getAuthId } from '../../store/authReducer'
import useAuth from '../../context/useAuth'
import { getRole } from '../../store/userReducer'
import OrderForm from '../ui/OrderForm'
import useModal from '../../context/useModal'
import ContentLoaderLarge from '../common/ContentLoaderLarge'
import Spinner from '../common/Spinner'
import * as _ from 'lodash'

const EDITABLE = {
    TYPE: 'type',
    BEDS: 'beds'
}

const RoomPage = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const { hotelId, roomId } = useParams()
    const { toggleAuthModal } = useAuth()
    const { setContent, openModal, closeModal, setModalClosedListener } = useModal()

    const roomDataFromDB = useSelector(getByIdOfRoomsByHotel(roomId))
    const [roomData, setRoomData] = useState(null)
    const hotel = useSelector(getHotelById(hotelId))
    const country = useSelector(getCountryById(hotel?.country))
    const city = useSelector(getCityById(hotel?.city))
    const userId = useSelector(getAuthId())
    const isAdmin = useSelector(getRole()) === 'admin'

    const [chosen, setChosen] = useState([])
    const [filteredChosen, setFilteredChosen] = useState(chosen)
    const [isOrdering, setIsOrdering] = useState(false)
    const [orderNotification, setOrderNotification] = useState(null)
    const [year, setYear] = useState()
    const [month, setMonth] = useState()
    const [editable, setEditable] = useState(null)

    useEffect(() => {
        const array = [...chosen]
        array.sort((a, b) => toTimestamp(a) - toTimestamp(b))
        setFilteredChosen(array)
    }, [chosen])

    const onChangeDate = (month, year) => {
        setMonth(month)
        setYear(year)
    }

    const refreshCalendarData = () => {
        dispatch(loadInfoByMonth(month, year, roomId))
        dispatch(loadOrdersByUser(userId))
    }

    const notification = (code) => {
        if (code < 400) {
            setOrderNotification('successful')
        } else {
            setOrderNotification('failed')
        }
        setTimeout(() => setOrderNotification(null), 1000)
    }

    const handleSubmit = async(customerData) => {
        setIsOrdering(true)
        const userData = customerData ? { ...customerData, user: userId } : { user: userId }
        const data = chosen.map(date => ({
            date: toTimestamp(date),
            hotel: hotelId,
            room: roomId,
            country,
            city,
            ...userData
        }))

        const result = await dispatch(orderRoom(data))
        if (result.code === 401) {
            customerData ? closeModal() : toggleAuthModal()
        }
        setIsOrdering(false)
        if (result.code < 400) {
            refreshCalendarData()
            setTimeout(() => setChosen([]), 1000)
        }
        notification(result.code)
        if (customerData) {
            closeModal()
        }
    }

    const handleOrderAdmin = async() => {
        setIsOrdering(true)
        setContent(<OrderForm onSubmit={handleSubmit}/>)
        openModal()
        setModalClosedListener(() => setIsOrdering(false))
    }

    const handleUpdateRoomData = (type, value) => {
        setRoomData(prevState => ({ ...prevState, [type]: value }))
    }

    const handleSaveChanges = async() => {
        await dispatch(updateRoomData(roomData))
        setEditable(null)
    }

    useEffect(() => {
        dispatch(loadRoomsByHotel(hotelId))
    }, [])

    useEffect(() => {
        setRoomData(_.cloneDeep(roomDataFromDB))
    }, [roomDataFromDB])

    return (
        roomData ? (
            <section className="RoomPage">
                <ContentWrapper>
                    <div className="mb-3">
                        <button className="RoomPage__Back" onClick={() => history.goBack()}><i className="bi bi-arrow-left mx-1"></i>Go back</button>
                    </div>
                    <div className="d-flex flex-row gap-3">
                        <div className="RoomPage__ImgBox d-flex flex-column">
                            <img className="RoomPage__Img mb-3" src={roomData?.images[0]}/>
                            <section className="RoomPage__OrderSection">
                                <div className="RoomPage__OrderInfo">
                                    <h5 className={`RoomPage__SelectedTitle ${!orderNotification ? '_active' : ''}`}>{chosen.length || 'Nothing'} is selected</h5>
                                    <h5 className={`RoomPage__SelectedSuccessful ${orderNotification === 'successful' ? '_active' : ''}`}>Successful</h5>
                                    <h5 className={`RoomPage__SelectedFailed ${orderNotification === 'failed' ? '_active' : ''}`}>Failed</h5>
                                    <ol className={`RoomPage__OrderList ${!orderNotification ? '_active' : ''}`}>
                                        {filteredChosen.map(date =>
                                            <li key={date} className="RoomPage__OrderItem"><b>{dateFormat(date)}</b></li>
                                        )}
                                    </ol>
                                </div>
                                <div className="d-flex flex-column">
                                    <RoomCalendar chosen={chosen} setChosen={setChosen} roomId={roomId} onChange={onChangeDate} userId={userId} />
                                    <button className="btn btn-outline-dark" onClick={isAdmin ? handleOrderAdmin : () => handleSubmit()} disabled={isOrdering || !chosen.length}>
                                        {isOrdering ? (
                                            <Spinner />
                                        ) : ('Order')}
                                    </button>
                                </div>
                            </section>
                        </div>
                        <div className="d-flex flex-column">
                            <h1 className="HotelPage__Title mb-0">{country?.name}</h1>
                            <p className="fs-5 mb-1 mt-0">{city?.name}</p>
                            <p>Address: {hotel?.build}, {hotel?.street}, {city?.name}, {country?.name}, {hotel?.postalCode}</p>
                            <ul className="RoomPage__BedsQuality">
                                <li><span className="RoomPage__Entity">Room:</span> {roomData?.room}</li>
                                <li className="RoomPage__WrapperEntity">
                                    <span className="RoomPage__Entity">Type:</span>
                                    {editable === EDITABLE.TYPE ? (
                                        <select defaultValue={roomData?.type} onChange={(e) => handleUpdateRoomData(EDITABLE.TYPE, e?.currentTarget?.value)}>
                                            <option value="standard">standard</option>
                                            <option value="lux">lux</option>
                                        </select>
                                    ) : (roomData?.type)}
                                    {isAdmin && (editable !== EDITABLE.TYPE ? (
                                        <i className="bi bi-pencil RoomPage__Pencil" onClick={() => setEditable(EDITABLE.TYPE)}></i>
                                    ) : (
                                        <i className="bi bi-check2 RoomPage__Pencil" onClick={handleSaveChanges}></i>
                                    ))}
                                </li>
                                <li><span className="RoomPage__Entity">Floor:</span> {roomData?.floor}</li>
                                <li className="RoomPage__WrapperEntity">
                                    <span className="RoomPage__Entity">Beds:</span>
                                    {editable === EDITABLE.BEDS ? <input onInput={(e) => handleUpdateRoomData(EDITABLE.BEDS, e.currentTarget.value)} type="text" value={roomData?.beds}/> : roomData?.beds}
                                    {isAdmin && (editable !== EDITABLE.BEDS ? (
                                        <i className="bi bi-pencil RoomPage__Pencil" onClick={() => setEditable(EDITABLE.BEDS)}></i>
                                    ) : (
                                        <i className="bi bi-check2 RoomPage__Pencil" onClick={handleSaveChanges}></i>
                                    ))}
                                </li>
                            </ul>
                        </div>
                    </div>
                </ContentWrapper>
            </section>
        ) : (
            <ContentLoaderLarge/>
        )
    )
}

export default RoomPage
