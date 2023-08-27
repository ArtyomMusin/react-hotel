import React from 'react'
import './NavAuthorization.scss'
import useAuth from '../../context/useAuth'
import { useSelector } from 'react-redux'
import { getUser } from '../../store/userReducer'
import NavProfile from './NavProfile'

const NavAuthorization = () => {
    const { toggleAuthModal } = useAuth()
    const user = useSelector(getUser())

    const handleClick = (e) => {
        e.preventDefault()
        toggleAuthModal()
    }

    return (
        <ul className='NavAuthorization'>
            <li className='NavAuthorization__Item'>
                {user ? (
                    <NavProfile name={user.name} />
                ) : (
                    <a className="NavAuthorization__Link" onClick={handleClick}>Sign in / Sign up</a>
                )}
                {/* <Link className="nav-link nav-link px-2 text-white menu-nav" aria-current="page" to="/autorization"></Link> */}
            </li>
        </ul>
    )
}

export default NavAuthorization
