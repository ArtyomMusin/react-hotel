import httpService from './http.service'
const useEndpoint = 'user/'

const userService = {
    getUserById: async(id) => {
        const { data } = await httpService.get(useEndpoint + id)
        return data
    }
}

export default userService
