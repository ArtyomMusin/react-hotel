const Country = require('../models/Country')
const City = require('../models/City')
const Hotel = require('../models/Hotel')
const Room = require('../models/Room')

const countryMock = require('../mock/country.json')
const cityMock = require('../mock/city.json')
const hotelMock = require('../mock/hotel.json')
const roomMock = require('../mock/room.json')

module.exports = async () => {
    let countries = await Country.find()
    if(countries.length !== countryMock.length) {
        await createInitialEntities(Country, countryMock)
        countries = await Country.find()
    }

    let cities = await City.find()
    if(cities.length !== cityMock.length){
        const data = cityMock.map(city => ({
            ...city,
            country: countries.find(country => country.name === city.country)._id.toString()
        }))
        await createInitialEntities(City, data)
        cities = await City.find()
    }

    const hotels = await Hotel.find()
    const descriptionHotel = 'Hotel in the city center. Nearby there is all the necessary infrastructure: cafes, transport, fitness room, business solutions for quick and comfortable problem solving'
    if(hotels.length !== hotelMock.length){
        const data = hotelMock.map(hotel => ({
            ...hotel,
            city: cities.find(city => city.name === hotel.city)._id.toString(),
            country: countries.find(country => country.name === hotel.country)._id.toString(),
            description: descriptionHotel
        }))
        await createInitialEntities(Hotel, data)
    }

    for(const hotel of hotels){
        const rooms = await Room.find({ hotel: hotel._id })
        if(rooms?.length !== roomMock.length){
            const data = roomMock.map(room => ({ ...room, hotel: hotel._id }))
            await createInitialEntities(Room, data, false)
        }
    }
}

async function createInitialEntities(Model, data, dropCollection = true){
    if(dropCollection) {
        await Model.collection.drop()
    }
    return Promise.all(
        data.map(async item => {
            try {
                delete item._id
                const newItem = new Model(item)
                await newItem.save()
            } catch (e) {
                return e
            }
        })
    )
}
