import React, { useEffect } from 'react'
import './RoomPage.scss'
import { Link, useParams } from 'react-router-dom'
import ContentWrapper from '../ui/hoc/ContentWrapper'
import { getRoomsByHotel, loadRoomsByHotel } from '../../store/roomReducer'
import { useDispatch, useSelector } from 'react-redux'
import RoomCard from '../ui/RoomCard'
import { getHotelById } from '../../store/hotelReducer'
import { getCountryById } from '../../store/countryReducer'
import { getCityById } from '../../store/cityReducer'
import RoomPage from './RoomPage'

const RoomsList = () => {
    const { hotelId, roomId } = useParams()

    if (roomId) {
        return <RoomPage/>
    }

    const dispatch = useDispatch()
    const data = useSelector(getRoomsByHotel())

    const hotelData = useSelector(getHotelById(hotelId))
    const country = useSelector(getCountryById(hotelData?.country))
    const city = useSelector(getCityById(hotelData?.city))

    useEffect(() => {
        dispatch(loadRoomsByHotel(hotelId))
    }, [])

    return (
        <ContentWrapper>
            <h1 className="mb-3">{country?.name} - {city?.name}</h1>
            <div className="mb-3">
                <Link className="RoomPage__Back text-decoration-none" to={'/hotels'}><i className="bi bi-arrow-left mx-1"></i>Back to hotels</Link>
            </div>
            <div className='ItemsList'>
                <div className='d-grid gap-3 justify-content-between' style={{ gridTemplateColumns: '2fr 2fr 2fr' }}>
                    {data?.length ? (data.map(cardData =>
                        <RoomCard key={cardData._id} data={cardData} />
                    )) : (
                        <h1>Loading...</h1>
                    )}
                </div>
            </div>
        </ContentWrapper>
    )
}

export default RoomsList
