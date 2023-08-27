import React, { useEffect, useState } from 'react'
import './RoomCalendar.scss'
import Calendar from '../common/Calendar'
import {
    getCountMonthDays,
    getCurrentDayInTimestamp,
    getDayMask,
    timestampToDate,
    toTimestamp
} from '../../utils/dateСonversion'
import PropTypes from 'prop-types'
import { getMonthOrders, getUserOrders, loadInfoByMonth } from '../../store/orderReducer'
import { useDispatch, useSelector } from 'react-redux'
import { months } from '../common/Calendar/data'

const RoomCalendar = ({ chosen, setChosen, roomId, onChange, userId }) => {
    const dispatch = useDispatch()

    const infoMonthOrders = useSelector(getMonthOrders())
    const orderDates = infoMonthOrders?.map(order => timestampToDate(order?.date))
    const userOrders = useSelector(getUserOrders())

    const currenDay = getCurrentDayInTimestamp()
    const [year, setYear] = useState()
    const [month, setMonth] = useState()

    useEffect(() => {
        if (!month) return
        dispatch(loadInfoByMonth(month, year, roomId))
    }, [month])

    const onChangeMonth = (month, year) => {
        setMonth(month)
        setYear(year)
        onChange(month, year)
    }

    const chooseDate = (day, month, year) => {
        const chosenDate = getDayMask(day, month, year)

        if (toTimestamp(chosenDate) < currenDay || orderDates?.includes(`${day}.${month}.${year}`)) {
            return
        }

        if (chosen.includes(getDayMask(day, month, year))) {
            setChosen(prevState => prevState.filter(date => date !== chosenDate))
        } else {
            setChosen(prevState => [...prevState, chosenDate])
        }
    }

    // const handleClickOnDate = (day, month, year) => {
    //     chooseDate(day, month, year)
    // }

    // logic for select day
    const getPrevDay = (DD, MM, YY) => {
        const prevMonth = MM > 0 ? MM - 1 : 11
        const prevDateDay = DD > 1 ? DD - 1 : getCountMonthDays(Number(MM) - 1, YY)
        const prevDateMonth = prevDateDay === getCountMonthDays(Number(MM) - 1, YY) && DD === 1 ? prevMonth : MM
        const prevDateYear = prevDateMonth === 11 ? YY - 1 : YY
        return getDayMask(prevDateDay, prevDateMonth, prevDateYear)
    }

    const getNextDay = (DD, MM, YY) => {
        const nextMonth = MM < 11 ? MM + 1 : 0
        const nextDateDay = DD < getCountMonthDays(MM, YY) ? DD + 1 : 1
        const nextDateMonth = nextDateDay === 1 ? nextMonth : MM
        const nextDateYear = nextDateMonth === 1 ? YY + 1 : YY
        return getDayMask(nextDateDay, nextDateMonth, nextDateYear)
    }

    const generateClassNameForChosen = ({ day, month, year }) => {
        let classes = ''

        const addClass = (className) => {
            classes += ` ${className}`
        }
        const chosenDay = getDayMask(day, month, year)
        const prevDay = getPrevDay(day, month, year, months)
        const nextDay = getNextDay(day, month, year, months)
        if (chosen.includes(chosenDay)) addClass('RoomCalendar__Chosen')
        if (chosen.includes(chosenDay) && !chosen.includes(prevDay)) addClass('RoomCalendar__Chosen_first')
        if (chosen.includes(chosenDay) && !chosen.includes(nextDay)) addClass('RoomCalendar__Chosen_last')
        return classes
    }

    const generateClassNameForOrdered = ({ day, month, year }) => {
        if (!infoMonthOrders?.length) return ''
        return infoMonthOrders.find(order => timestampToDate(order?.date) === `${day}.${month}.${year}` && order?.room === roomId) ? 'RoomCalendar__Booked' : ''
    }

    const generateClassNameForUserOrders = ({ day, month, year }) => {
        if (!userOrders?.length) return ''
        return userOrders.find(order => timestampToDate(order?.date) === `${day}.${month}.${year}` && order?.room === roomId) ? 'RoomCalendar__UserOrder' : ''
    }

    const generateClassSelectable = ({ day, month, year }) => {
        let className = ''
        const dateIsNotPast = toTimestamp(getDayMask(day, month, year)) >= currenDay
        const dateIsNotOrder = !orderDates?.includes(`${day}.${month}.${year}`)
        if (dateIsNotPast && dateIsNotOrder) {
            className += 'RoomCalendar__Selectable'
        }

        return className
    }

    const categories = {
        chosen: {
            getClassName: generateClassNameForChosen,
            onClick: chooseDate
        },
        ordered: {
            getClassName: (props) => generateClassNameForOrdered(props)
        },
        userOrders: {
            getClassName: (props) => generateClassNameForUserOrders(props)
        },
        selectable: {
            getClassName: (props) => generateClassSelectable(props)
        }
    }

    return (
        <Calendar
            categories={categories}
            onChangeMonth={onChangeMonth}
        />
    )
}

RoomCalendar.propTypes = {
    chosen: PropTypes.array,
    setChosen: PropTypes.func,
    roomId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    userId: PropTypes.string
}

export default RoomCalendar
