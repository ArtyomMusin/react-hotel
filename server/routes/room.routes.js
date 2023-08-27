const express = require('express')
const router = express.Router({ mergeParams: true })
const Room = require('../models/Room')

router.get('/', async (req, res) => {
    try{
        const serverAddress = req.headers.host
        const rooms = await Room.find()

        if(!rooms){
            return res.status(404).json({
                error: {
                    message: 'ROOMS_LIST_IS_EMPTY',
                    code: 404
                }
            })
        }

        const data = rooms?.map(room => ({ ...room.toObject(), images: room.images?.map(img => `http://${serverAddress}/img/${img}`) }))

        res.send(data)

    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Server error. Try later',
            code: 500
        })
    }
})

router.get('/:filterParam', async (req, res) => {
    try{
        const serverAddress = req.headers.host
        const { filterParam } = req.params
        const splitParam = filterParam.split('=')
        let filter = { [splitParam[0]]: splitParam[1] }

        const rooms = splitParam[0] === 'id' ? await Room.findById(splitParam[1]) : await Room.find(filter)

        if(!rooms){
            return res.status(404).json({
                error: {
                    message: Array.isArray(rooms) ? 'ROOMS_LIST_IS_EMPTY' : 'ROOM_DOESN\'T_FIND',
                    code: 404
                }
            })
        }

        const data = Array.isArray(rooms)
            ? rooms?.map(room => ({ ...room.toObject(), images: room.images?.map(img => `http://${serverAddress}/img/rooms/${img}`) }))
            : { ...rooms.toObject(), images: rooms.images?.map(img => `http://${serverAddress}/img/rooms/${img}`) }

        res.send(data)

    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Server error. Try later',
            code: 500
        })
    }
})



module.exports = router
