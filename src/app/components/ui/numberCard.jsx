import React from 'react'
import PropTypes from 'prop-types'

const NumberCard = ({ number, img, status }) => {
    return (
        <div className='room-card d-flex flex-column align-items-center p-4'>
            <p className='d-flex flex-row mb-2 w-100 justify-content-between'>{number}</p>
            {status &&
                <button type="button" className="del-room btn-close btn-close-red w-10" aria-label="Close"></button>
            }
            <img className='room-img mb-3' src={img} alt='картинка' />
            <button type="button" className="btn btn-outline-dark">Открыть</button>
        </div>
    )
}

NumberCard.propTypes = {
    number: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
    status: PropTypes.bool.isRequired
}

export default NumberCard
