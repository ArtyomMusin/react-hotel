import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ItemCard from './hoc/itemCard'

const RoomCard = ({ data }) => {
    return (
        <ItemCard>
            <div className="HotelCard__ImgBox w-100 mb-3">
                <img className='HotelCard__Img' src={data?.images[0]} alt='картинка' />
            </div>
            <div className="d-flex gap-3">
                <Link type="button" className="btn btn-outline-dark" to={`/hotels/${data?.hotel}/rooms/${data._id}`}>
                    Open
                </Link>
            </div>
        </ItemCard>
    )
}

RoomCard.propTypes = {
    data: PropTypes.object
}

export default RoomCard
