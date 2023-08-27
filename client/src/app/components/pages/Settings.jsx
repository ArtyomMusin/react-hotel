import React from 'react'
import ContentWrapper from '../ui/hoc/ContentWrapper'
import { useSelector } from 'react-redux'
import { getAuthId } from '../../store/authReducer'

const Settings = () => {
    const authId = useSelector(getAuthId())

    return (
        <ContentWrapper>
            Settings {authId}
        </ContentWrapper>
    )
}

export default Settings
