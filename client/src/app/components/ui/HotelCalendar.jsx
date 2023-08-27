import React from 'react'
import { getDayMask } from '../../utils/dateСonversion'
import './HotelCalendar.scss'
import Calendar from '../common/Calendar'
import PropTypes from 'prop-types'

const HotelCalendar = ({ chosenDate, onClickDate, changeMonth }) => {
    const generateClassNameForChosen = ({ day, month, year }) => {
        let classes = 'HotelCalendar__Selectable'
        const chosenDay = getDayMask(day, month, year)
        if (chosenDate === chosenDay) classes += ' HotelCalendar__Chosen'
        return classes
    }

    const categories = {
        chosen: {
            getClassName: generateClassNameForChosen,
            onClick: onClickDate
        }
    }

    return (
        <div>
            <Calendar categories={categories} onChangeMonth={changeMonth}/>
        </div>
    )
}
HotelCalendar.propTypes = {
    chosenDate: PropTypes.string,
    onClickDate: PropTypes.func,
    changeMonth: PropTypes.func
}

export default HotelCalendar
