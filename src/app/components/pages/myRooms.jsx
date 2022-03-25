import React from 'react'
import NumberCard from '../ui/numberCard'

const MyRooms = () => {
    const quantity = 2
    const obj = {}

    for (let i = 0; i <= quantity; i++) {
        obj[i] = {
            room: i,
            img: './public/img/room.jpg'
        }
    }

    return (
        <div className='room-list'>
            <h1>Мои номера</h1>
            <div className='d-flex flex-row flex-wrap justify-content-between'>
                {obj &&
                    Object.keys(obj).map(item => {
                        return <NumberCard key={item} number={obj[item].room} img={obj[item].img} status={true}/>
                    })
                }
            </div>
        </div>
    )
}

export default MyRooms
