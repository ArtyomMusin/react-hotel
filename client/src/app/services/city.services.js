import httpService from './http.service'
const cityEndpoint = 'city/'

const cityService = {
    getAll: async() => {
        const { data } = await httpService.get(cityEndpoint)
        return data
    },
    getById: async(id) => {
        const { data } = await httpService.get(cityEndpoint + id)
        return data
    }
}

export default cityService
