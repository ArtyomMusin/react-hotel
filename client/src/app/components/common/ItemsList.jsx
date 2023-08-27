import React from 'react'
import PropTypes from 'prop-types'
import HotelCard from '../ui/HotelCard'

const ItemsList = ({ data }) => {
    return (
        <div className='ItemsList'>
            <div className='d-grid gap-3 justify-content-between' style={{ gridTemplateColumns: '2fr 2fr 2fr' }}>
                {Object.keys(data).map(key =>
                    <HotelCard key={data[key]._id} number={data[key].room} data={data[key]}/>
                )}
            </div>
        </div>
    )
}

ItemsList.propTypes = {
    data: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.object)])
}

export default ItemsList
