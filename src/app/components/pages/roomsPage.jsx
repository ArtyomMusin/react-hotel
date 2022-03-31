import React from 'react'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'

import RoomsList from './roomsList'
import RoomPage from './roomPage'

const RoomsPage = ({ fromPage, quantity }) => {
    const object = {}

    for (let i = 1; i <= quantity; i++) {
        object[i] = {
            room: i,
            img: 'public/img/room.jpg',
            persons: 2,
            floor: 3,
            description: 'Какое-то описание'
        }
    }

    return (
        <div className='rooms-page'>
            <h1>{fromPage === 'myrooms' ? 'Мои номера' : 'Доступные номера'}</h1>
            <Switch>
                <Route path={`/${fromPage}/:roomId`} render={props => <RoomPage obj={object} {...props} />} />
                <Route path={`/${fromPage}/`} render={props => (<RoomsList obj={object} fromPage={fromPage} {...props} />)} />
            </Switch>
        </div>
    )
}

RoomsPage.propTypes = {
    fromPage: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired
}

export default RoomsPage
