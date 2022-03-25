import React from 'react'
import { Link } from 'react-router-dom'

const NavAutorization = () => {
    return (
        <ul className='nav'>
            <li className='nav-item'>
                <Link className="nav-link nav-link px-2 text-white menu-nav" aria-current="page" to="/autorization">
                    Вход/Регистрация
                </Link>
            </li>
        </ul>
    )
}

export default NavAutorization
