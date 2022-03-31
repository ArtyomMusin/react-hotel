import React from 'react'
import RoomsPage from './roomsPage'

const AllRooms = () => {
    return (
        <div className="container">
            <RoomsPage fromPage={'allrooms'} quantity={11}/>
        </div>
    )
}

export default AllRooms
