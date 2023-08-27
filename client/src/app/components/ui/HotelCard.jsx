import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getAllCountries } from '../../store/countryReducer'
import { getAllCities } from '../../store/cityReducer'
import ItemCard from './hoc/itemCard'
import './HotelCard.scss'

const HotelCard = ({ data }) => {
    const countries = useSelector(getAllCountries())
    const cities = useSelector(getAllCities())

    return (
        <ItemCard>
            <h3>{countries?.find(country => country._id === data.country).name}</h3>
            <p>{cities?.find(city => city._id === data.city).name}</p>
            <div className="HotelCard__ImgBox w-100 mb-3">
                <img className='HotelCard__Img' src={data.images[0]} alt='картинка' />
            </div>
            <div className="d-flex gap-3">
                <Link type="button" className="btn btn-outline-dark" to={`/hotels/${data._id}`}>
                    About
                </Link>
                <Link type="button" className="btn btn-outline-dark" to={`/hotels/${data._id}/rooms`}>
                    Rooms
                </Link>
            </div>
        </ItemCard>
    )
}
HotelCard.propTypes = {
    data: PropTypes.object
}

export default HotelCard
