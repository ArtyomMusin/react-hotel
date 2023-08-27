import httpService from './http.service'

const hotelEndpoint = 'hotel/'

const hotelServiceTpl = {
    get: async(endpoint = '') => {
        const { data } = await httpService.get(hotelEndpoint + endpoint)
        return data
    }
}

const hotelService = {
    getAll: async() => await hotelServiceTpl.get(),
    getById: async(id) => await hotelServiceTpl.get(`id=${id}`),
    getByCity: async(id) => await hotelServiceTpl.get(`city=${id}`),
    getByCountry: async(id) => await hotelServiceTpl.get(`country=${id}`)
}

export default hotelService
