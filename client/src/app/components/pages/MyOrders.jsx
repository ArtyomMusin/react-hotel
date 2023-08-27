import React, { useEffect } from 'react'
import './MyOrders.scss'
import ContentWrapper from '../ui/hoc/ContentWrapper'
import { useDispatch, useSelector } from 'react-redux'
import { getUserOrders, removeOrderById } from '../../store/orderReducer'
import { dateFormat, timestampToDate } from '../../utils/dateСonversion'
import { getAllCountries } from '../../store/countryReducer'
import { getAllCities } from '../../store/cityReducer'
import { getHotels } from '../../store/hotelReducer'
import { Link } from 'react-router-dom'
import { getAllRooms, loadAllRooms } from '../../store/roomReducer'
import useModal from '../../context/useModal'
import Confirm from '../common/Confirm'

const MyOrders = () => {
    const dispatch = useDispatch()
    const { setContent, toggleModal } = useModal()

    useEffect(() => {
        dispatch(loadAllRooms())
    }, [])

    const userOrders = useSelector(getUserOrders())
    const countries = useSelector(getAllCountries())
    const cities = useSelector(getAllCities())
    const hotels = useSelector(getHotels())
    const rooms = useSelector(getAllRooms())

    const data = userOrders?.map(order => ({
        ...order,
        country: countries?.find(country => country._id === order.country)?.name,
        city: cities?.find(city => city._id === order.city)?.name,
        build: hotels?.find(hotel => hotel._id === order.hotel)?.build,
        street: hotels?.find(hotel => hotel._id === order.hotel)?.street,
        roomNumber: rooms?.find(room => room._id === order.room)?.room
    }))

    const answerFromConfirm = async(confirm, id) => {
        if (!confirm) {
            return toggleModal()
        }
        await dispatch(removeOrderById(id))
        toggleModal()
    }

    const onCancel = (id) => {
        toggleModal()
        setContent(<Confirm onClick={(confirm) => answerFromConfirm(confirm, id)}/>)
    }

    return (
        <ContentWrapper>
            <section className="MyOrders d-flex flex-column align-items-center">
                <h1>My orders</h1>
                {data?.length ? (
                    <table className="MyOrders__Table">
                        <thead className="MyOrders__Head">
                            <tr className="MyOrders__Row">
                                <th className="MyOrders__Cell">Date</th>
                                <th className="MyOrders__Cell">Country</th>
                                <th className="MyOrders__Cell">City</th>
                                <th className="MyOrders__Cell">Room</th>
                                <th className="MyOrders__Cell">Address</th>
                                <th className="MyOrders__Cell"></th>
                                <th className="MyOrders__Cell"></th>
                            </tr>
                        </thead>
                        <tbody className="MyOrders__Body">
                            {data?.map(order =>
                                <tr key={order._id} className="MyOrders__Row">
                                    <td className="MyOrders__Cell">{dateFormat(timestampToDate(order.date))}</td>
                                    <td className="MyOrders__Cell">{order.country}</td>
                                    <td className="MyOrders__Cell">{order.city}</td>
                                    <td className="MyOrders__Cell">{order.roomNumber}</td>
                                    <td className="MyOrders__Cell">{order.build}, {order.street}</td>
                                    <td className="MyOrders__Cell"><Link to={`/hotels/${order.hotel}/rooms/${order.room}`}>Open room page</Link></td>
                                    <td className="MyOrders__Cell"><button className="btn btn-danger" onClick={() => onCancel(order._id)}>Cancel</button></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                ) : (
                    <h3>You dont have orders</h3>
                )}
            </section>
        </ContentWrapper>
    )
}

export default MyOrders
