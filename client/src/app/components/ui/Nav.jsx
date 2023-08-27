import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getUser } from '../../store/userReducer'

const Nav = () => {
    const user = useSelector(getUser())

    return (
        <ul className='nav d-flex align-items-center'>
            <li className='nav-item fw-bold text-uppercase fs-5 me-2'>
                Booking Lux
            </li>
            <li className='nav-item'>
                <Link className="nav-link link-secondary px-2 text-white menu-nav" aria-current="page" to="/">
                    Main
                </Link>
            </li>
            <li className='nav-item'>
                <Link className="nav-link link-secondary px-2 text-white menu-nav" aria-current="page" to="/hotels">
                    Hotels
                </Link>
            </li>
            {user && (
                user?.role === 'admin' ? (
                    <li className='nav-item'>
                        <Link className="nav-link px-2 text-white menu-nav" aria-current="page" to="/admin">
                            Admin panel
                        </Link>
                    </li>
                ) : (
                    <li className='nav-item'>
                        <Link className="nav-link px-2 text-white menu-nav" aria-current="page" to="/orders">
                            My orders
                        </Link>
                    </li>
                )
            )}
        </ul>
    )
}

export default Nav
