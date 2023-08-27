import React from 'react'
import HotelsList from './HotelsList'
import { useParams } from 'react-router-dom'
import HotelPage from './HotelPage'
import ContentWrapper from '../ui/hoc/ContentWrapper'

const Hotels = () => {
    const { hotelId } = useParams()

    const getContent = () => {
        if (!hotelId) {
            return <HotelsList />
        }

        return <HotelPage />
    }

    return (
        <ContentWrapper>
            {getContent()}
        </ContentWrapper>
    )
}

export default Hotels
