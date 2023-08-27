import React from 'react'
import { NavLink } from 'react-router-dom'
import Slider from './Slider'
import SelectCountries from '../SelectCountries'
import SelectCities from '../SelectCities'

const MainContent = () => {
    return (
        <>
            <Slider/>
            <div className="d-flex flex-column align-items-center position-absolute top-0 end-0 bg-light rounded p-3 bg-opaname-75" style={{ transform: 'translate(-40%, 50%)' }}>
                <h3 className="mb-3">Go to hotels</h3>
                <SelectCountries />
                <SelectCities />
                <NavLink className="MainContent__GoHotels btn btn-dark shadow bg-dark py-2 px-4 fs-6" to="/hotels">
                    Show
                </NavLink>
            </div>
        </>
    )
}

export default MainContent
