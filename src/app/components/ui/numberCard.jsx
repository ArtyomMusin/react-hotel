import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const NumberCard = ({ number, image, status, fromPage }) => {
    return (
        <div className='room-card d-flex flex-column align-items-center p-4'>
            <p className='d-flex flex-row mb-2 w-100 justify-content-between'>{number}</p>
            {status &&
                <button type="button" className="del-room btn-close btn-close-red w-10" aria-label="Close"></button>
            }
            <img className='room-img mb-3' src={image} alt='картинка' />
            <Link to={`/${fromPage}/${number}`}>
                <button type="button" className="btn btn-outline-dark">Открыть</button>
            </Link>
        </div>
    )
}

NumberCard.propTypes = {
    number: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    status: PropTypes.bool,
    fromPage: PropTypes.string
}

export default NumberCard
