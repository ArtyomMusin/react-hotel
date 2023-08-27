import React from 'react'
import PropTypes from 'prop-types'
import './CalendarList.scss'
import { getCountMonthDays } from '../../../utils/dateСonversion'

const CalendarList = ({ days, months, month, year, categories, onPrevMonth, onNextMonth }) => {
    const currentDate = new Date()
    const currentDay = currentDate.getDate()
    const firstWeekDay = new Date(year, month, 1).getDay()
    const daysCount = getCountMonthDays(month, year)
    const weeksCount = Math.ceil((firstWeekDay + daysCount) / 7)

    const getDayClassNames = (day, i) => {
        let classes = 'Calendar__Item'

        const addClass = (className) => {
            classes += ` ${className}`
        }

        if (day || day === 0) addClass('Calendar__Day')
        if (day === currentDay && month === currentDate.getMonth() && year === currentDate.getFullYear()) addClass('_current')
        if ((i % 5 === 0 && i) || (i % 6 === 0 && i)) addClass('Calendar__Weekend')

        for (const category in categories) {
            if (day) {
                const className = categories[category].getClassName({ day, month, year })
                if (className) {
                    addClass(className)
                }
            }
        }

        return classes
    }

    const onClickDate = (...props) => {
        for (const category in categories) {
            if (categories[category]?.onClick) {
                categories[category]?.onClick(...props)
            }
        }
    }

    // generate monthArray
    const generateMonthDaysArray = () => {
        const array = []
        let count = 1
        for (let i = 0; i < weeksCount; i++) {
            const week = []

            if (i === weeksCount - 1 && count > daysCount) {
                continue
            }

            for (let j = 1; j <= 7; j++) {
                if (j < firstWeekDay && i === 0) {
                    week.push('')
                    continue
                }
                if (count > daysCount) {
                    week.push('')
                    continue
                }
                week.push(count)
                count++
            }
            array.push(week)
        }
        return array
    }

    const daysArray = generateMonthDaysArray()

    return (
        <article className="Calendar">
            <figure>
                <figcaption className="Calendar__Month"><i className="bi bi-chevron-left" onClick={onPrevMonth}></i>{months[month].name} {year}<i className="bi bi-chevron-right" onClick={onNextMonth}></i></figcaption>
                <div className="Calendar__Table">
                    {days.map((day, i) =>
                        <div key={day} className={`Calendar__Item ${i >= 5 ? 'Calendar__Weekend' : ''}`}>{day}</div>
                    )}
                    {daysArray.map(week =>
                        week.map((day, i) =>
                            <div
                                key={i + day}
                                className={getDayClassNames(day, i)}
                                // onClick={e => day && clickOnDate(day, month, year, months, e)}
                                onClick={e => day && onClickDate(day, month, year, months, e)}
                            >
                                {day}
                            </div>
                        )
                    )}
                </div>
            </figure>
        </article>
    )
}

CalendarList.propTypes = {
    days: PropTypes.array,
    months: PropTypes.array,
    month: PropTypes.number,
    year: PropTypes.number,
    categories: PropTypes.object,
    onPrevMonth: PropTypes.func,
    onNextMonth: PropTypes.func
}

export default CalendarList
