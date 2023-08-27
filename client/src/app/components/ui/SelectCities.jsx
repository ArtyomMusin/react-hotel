import React from 'react'
import Select from '../common/Select'
import usePlacesFilter from '../../context/useHotels'

const SelectCities = () => {
    const { selectedCity, setSelectedCity, filteredCities } = usePlacesFilter()

    const onChangeCity = (id) => {
        setSelectedCity(id)
    }

    return (
        <Select
            data={filteredCities}
            value={selectedCity}
            allItemsName="All cities"
            onChange={onChangeCity}
        />
    )
}

export default SelectCities
