import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
    return (
        <ul className='nav'>
            <li className='nav-item'>
                <Link className="nav-link link-secondary px-2 text-white menu-nav" aria-current="page" to="/allrooms">
                    Доступные номера
                </Link>
            </li>
            <li className='nav-item'>
                <Link className="nav-link px-2 text-white menu-nav" aria-current="page" to="/myrooms">
                    Мои номера
                </Link>
            </li>
            <li className='nav-item'>
                <Link className="nav-link px-2 text-white menu-nav" aria-current="page" to="/admin">
                    Панель администратора
                </Link>
            </li>
        </ul>
    )
}

export default Nav
