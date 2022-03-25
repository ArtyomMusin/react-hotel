import React from 'react'

import Nav from './nav'
import NavAutorization from './navAutorization'

const Header = () => {
    return (
        <div className='p-3 bg-dark text-white d-flex flex-row justify-content-between bg bd-highlight'>
            <Nav />
            <NavAutorization />
        </div>
    )
}

export default Header
