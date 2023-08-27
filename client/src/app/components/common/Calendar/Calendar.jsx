import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import CalendarList from './CalendarList'
import { days, months } from './data'

const Calendar = ({ categories, onLoad, onChangeMonth }) => {
    const date = new Date()
    const [year, setYear] = useState(date.getFullYear())
    const [month, setMonth] = useState(date.getMonth())

    useEffect(() => {
        if (onLoad) {
            onLoad({ month, year, days, months })
        }
    }, [])

    useEffect(() => {
        if (onChangeMonth) {
            onChangeMonth(month, year)
        }
    }, [month])

    const onPrevMonth = () => {
        setMonth(prevState => prevState > 0 ? prevState - 1 : 11)
        if (month === 0) {
            setYear(prevState => prevState - 1)
        }
    }

    const onNextMonth = () => {
        setMonth(prevState => prevState < 11 ? prevState + 1 : 0)
        if (month === 11) {
            setYear(prevState => prevState + 1)
        }
    }

    return (
        <CalendarList
            days={days}
            months={months}
            month={month}
            year={year}
            categories={categories}
            onPrevMonth={onPrevMonth}
            onNextMonth={onNextMonth}
        />
    )
}

Calendar.propTypes = {
    categories: PropTypes.object,
    onLoad: PropTypes.func,
    onChangeMonth: PropTypes.func
}

export default Calendar
