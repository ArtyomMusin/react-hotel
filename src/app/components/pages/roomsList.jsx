import React from 'react'
import PropTypes from 'prop-types'

import NumberCard from '../ui/numberCard'

const RoomsList = ({ obj, fromPage }) => {
    const status = fromPage === 'myrooms'

    return (
        <div className='room-list'>
            <div className='d-flex flex-row flex-wrap justify-content-between'>
                {obj &&
                    Object.keys(obj).map(key => {
                        return <NumberCard key={key} number={obj[key].room} image={obj[key].img} fromPage={fromPage} status={status}/>
                    })
                }
            </div>
        </div>
    )
}

RoomsList.propTypes = {
    obj: PropTypes.object,
    fromPage: PropTypes.string
}

export default RoomsList
