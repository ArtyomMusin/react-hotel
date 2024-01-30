export const getDayMask = (d, m, y) => {
    if (!d || (!m && m !== 0) || !y) return
    return `${d}.${m}.${y}`
}

export const toTimestamp = (date) => {
    if (!date) return
    const splitted = date.split('.')
    return new Date(splitted[2], splitted[1], splitted[0]).getTime()
}

export const timestampToDate = (timestamp) => {
    const date = new Date(timestamp)
    const day = date.getDate()
    const month = date.getMonth()
    return `${day}.${month}.${date.getFullYear()}`
}

export const dateFormat = (date) => {
    if (!date) return
    const splitted = date.split('.')
    const dd = splitted[0].length === 1 ? `0${splitted[0]}` : splitted[0]
    const mm = splitted[1].length === 1 && splitted[1] !== '9' ? `0${Number(splitted[1]) + 1}` : Number(splitted[1]) + 1
    return `${dd}.${mm}.${splitted[2]}`
}

export const getTimestampOfStartMonth = (month, year) => {
    if (!month || !year) return
    return new Date(year, month, 1).getTime()
}

export const getTimestampOfEndMonth = (month, year) => {
    if (!month || !year) return
    return new Date(year, Number(month) + 1, 0).getTime()
}

export const getCountMonthDays = (month, year) => {
    if ((!month && month !== 0) || !year) return
    return new Date(year, month + 1, 0).getDate()
}

export const getCurrentDayInTimestamp = () => {
    const currentTime = new Date(Date.now())
    return new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate()).getTime()
}

export const getStartAndEndOfMonth = (month, year) => {
    if (!month || !year) return
    return {
        startMonth: getTimestampOfStartMonth(month, year),
        endMonth: getTimestampOfEndMonth(month, year)
    }
}

export const getStartOfDay = (date) => {
    if (!date) return
    const splitted = date.split('.')
    const newDate = new Date(splitted[2], splitted[1], splitted[0], 0, 0, 0, 0)
    return newDate.getTime()
}

export const getEndOfDay = (date) => {
    if (!date) return
    const splitted = date.split('.')
    const newDate = new Date(splitted[2], splitted[1], splitted[0], 23, 59, 59, 59)
    return newDate.getTime()
}
