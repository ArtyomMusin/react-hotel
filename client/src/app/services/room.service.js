import httpService from './http.service'

const roomEndpoint = 'room/'

const roomServiceTpl = {
    get: async(endpoint) => {
        const { data } = await httpService.get(roomEndpoint + endpoint)
        return data
    }
}

const roomService = {
    getAll: async() => await roomServiceTpl.get(),
    getById: async(id) => await roomServiceTpl.get(`id=${id}`),
    getByHotel: async(id) => await roomServiceTpl.get(`hotel=${id}`),
    getByCity: async(id) => await roomServiceTpl.get(`city=${id}`),
    getByCountry: async(id) => await roomServiceTpl.get(`country=${id}`)
}

export default roomService
