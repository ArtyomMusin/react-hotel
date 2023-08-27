import React from 'react'
import Nav from './Nav'
import NavAuthorization from './NavAuthorization'

const Header = () => {
    return (
        <header className='p-3 bg-dark text-white d-flex flex-row justify-content-between bg bd-highlight'>
            <Nav />
            <NavAuthorization />
        </header>
    )
}

export default Header
