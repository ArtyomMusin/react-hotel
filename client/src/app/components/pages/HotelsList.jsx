import React from 'react'
import SelectCountries from '../ui/SelectCountries'
import SelectCities from '../ui/SelectCities'
import useHotels from '../../context/useHotels'
import HotelCard from '../ui/HotelCard'

const HotelsList = () => {
    const { hotels } = useHotels()

    return (
        hotels ? (
            <>
                <section className="d-flex flex-row justify-content-between">
                    <h1>Our hotels</h1>
                    <div className="d-flex flex-row gap-2">
                        <SelectCountries />
                        <SelectCities />
                    </div>
                </section>
                <div className='ItemsList'>
                    <div className='d-grid gap-3 justify-content-between' style={{ gridTemplateColumns: '2fr 2fr 2fr' }}>
                        {Object.keys(hotels).map(key =>
                            <HotelCard key={hotels[key]._id} number={hotels[key].room} data={hotels[key]}/>
                        )}
                    </div>
                </div>
            </>
        ) : (
            <h1>Loading...</h1>
        )
    )
}

export default HotelsList
