import httpService from './http.service'
const countryEndpoint = 'country/'

const countryService = {
    getAll: async() => {
        const { data } = await httpService.get(countryEndpoint)
        return data
    },
    getById: async(id) => {
        const { data } = await httpService.get(countryEndpoint + id)
        return data
    }
}

export default countryService
