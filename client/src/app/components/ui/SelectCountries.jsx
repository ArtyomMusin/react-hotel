import React from 'react'
import Select from '../common/Select'
import usePlacesFilter from '../../context/useHotels'

const SelectCountries = () => {
    const { counties, selectedCountry, setSelectedCountry } = usePlacesFilter()

    const onChangeCountry = (id) => {
        setSelectedCountry(id)
    }

    return (
        <Select
            data={counties}
            value={selectedCountry}
            allItemsName="All countries"
            onChange={onChangeCountry}
        />
    )
}

export default SelectCountries
