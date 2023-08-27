const express = require('express')
const router = express.Router({ mergeParams: true })
const chalk = require('chalk')
const Hotel = require('../models/Hotel')


router.get('/', async (req, res) => {
    try{
        const serverAddress = req.headers.host
        const hotels = await Hotel.find()

        if(!hotels){
            return res.status(404).json({
                error: {
                    message: 'HOTELS_LIST_IS_EMPTY',
                    code: 404
                }
            })
        }

        const data = hotels?.map(hotel => ({ ...hotel.toObject(), images: hotel.images?.map(img => `http://${serverAddress}/img/hotels/${img}`) }))

        res.status(200).send(data)
    } catch(e){
        console.log(chalk.red(e.message))
    }
})

router.get('/:filterParam', async (req, res) => {
    try{
        const serverAddress = req.headers.host
        const { filterParam } = req.params
        const splitParam = filterParam.split('=')
        const filters = { [splitParam[0]]: splitParam[1] }
        const hotels = splitParam[0] === 'id' ? await Hotel.findById(splitParam[1]) : await Hotel.find(filters)
        const dataIsArray = splitParam[0] !== 'id'

        if(!hotels){
            return res.status(404).json({
                error: {
                    message: dataIsArray ? 'HOTELS_LIST_IS_EMPTY' : 'HOTEL_NOT_EXIST',
                    code: 404
                }
            })
        }
        console.log()
        const data = dataIsArray
            ? hotels?.map(room => ({ ...room.toObject(), images: room.images?.map(img => `http://${serverAddress}/img/hotels/${img}`) }))
            : { ...hotels.toObject(), images: hotels.images?.map(img => `http://${serverAddress}/img/hotels/${img}`) }

        res.status(200).send(data)
    } catch(e){
        console.log(chalk.red(e.message))
    }
})

module.exports = router
