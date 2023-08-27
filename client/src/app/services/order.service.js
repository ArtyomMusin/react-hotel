import httpService from './http.service'
const roomEndpoint = 'order/'

const orderService = {
    getAll: async() => {
        const { data } = await httpService.get(roomEndpoint)
        return data
    },
    getOrderById: async(id) => {
        const { data } = await httpService.get(roomEndpoint + id)
        return data
    },
    getOrderByUser: async(id) => {
        const { data } = await httpService.get(roomEndpoint + 'user/' + id)
        return data
    },
    getInfoByMonth: async(payload) => {
        const { data } = await httpService.post(roomEndpoint + 'info/', payload)
        return data
    },
    getMonthInfoByHotel: async(payload) => {
        const { data } = await httpService.post(roomEndpoint + 'infoForHotel/', payload)
        return data
    },
    sendOrder: async(payload) => {
        const { data } = await httpService.post(roomEndpoint, payload)
        return data
    },
    delete: async(id) => {
        const { data } = await httpService.delete(roomEndpoint + id)
        return data
    }
}

export default orderService
