import React, { useState, useContext, createContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { getAllCountries } from '../store/countryReducer'
import { getAllCities } from '../store/cityReducer'
import { getHotels } from '../store/hotelReducer'

const filterContext = createContext({})

const useHotels = () => {
    return useContext(filterContext)
}

export const HotelsProvider = ({ children }) => {
    const counties = useSelector(getAllCountries())
    const cities = useSelector(getAllCities())
    const dataHotels = useSelector(getHotels())
    const selectedDefault = 'all'

    const [selectedCountry, setSelectedCountry] = useState(selectedDefault)
    const [selectedCity, setSelectedCity] = useState(selectedDefault)
    const [filteredCities, setFilteredCities] = useState(null)

    const [filteredHotels, setFilteredHotels] = useState(null)

    useEffect(() => {
        setFilteredHotels(dataHotels)
    }, [dataHotels])

    useEffect(() => {
        setFilteredCities(cities)
    }, [cities])

    useEffect(() => {
        setFilteredCities(selectedCountry !== selectedDefault ? cities.filter(city => city.country === selectedCountry) : cities)
        if (selectedCity !== selectedDefault && cities.find(city => city._id === selectedCity).country !== selectedCountry) {
            setSelectedCity(selectedDefault)
        }
        if (!selectedCountry) {
            setSelectedCity(selectedDefault)
        }
        filterHotels()
    }, [selectedCountry])

    useEffect(() => {
        filterHotels()
    }, [selectedCity])

    const filterHotels = () => {
        if (!dataHotels) return
        let data = dataHotels
        if (selectedCountry !== selectedDefault) {
            data = data.filter(hotel => hotel.country === selectedCountry)
        }
        if (selectedCity !== selectedDefault) {
            data = data.filter(hotel => hotel.city === selectedCity)
        }
        setFilteredHotels(data)
    }

    const providerValue = { counties, selectedCountry, setSelectedCountry, selectedCity, setSelectedCity, filteredCities, hotels: filteredHotels }

    return (
        <filterContext.Provider value={providerValue}>
            { children }
        </filterContext.Provider>
    )
}

HotelsProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}

export default useHotels
