import React from 'react'
import RoomsPage from './roomsPage'

const MyRooms = () => {
    return (
        <div className="container">
            <RoomsPage fromPage={'myrooms'} quantity={3}/>
        </div>
    )
}

export default MyRooms
