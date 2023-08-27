const express = require('express')
const router = express.Router({ mergeParams: true })
const Order = require('../models/Order')
const Room = require('../models/Room')
const User = require('../models/User')
const Hotel = require('../models/Hotel')
const auth = require('../middleware/auth.middleware')
const admin = require('../middleware/admin.middleware')


router.get('/', auth, admin, async(req, res) => {
    try {
        const data = await Order.find()

        if (!data) {
            return res.status(404).json({
                error: {
                    code: 404,
                    message: 'ORDERS_LIST_IS_EMPTY'
                }
            })
        }

        res.send(data)
    } catch (e) {
        res.status(500).json({
            error: {
                code: 500,
                message: 'Server error. Try later'
            }
        })
    }
})

router.get('/:orderId', auth, async(req, res) => {
    try {
        const { orderId } = req.params

        if (orderId === 'undefined' || orderId === 'null') {
            return res.status(404).json({
                error: {
                    code: 404,
                    message: 'INCORRECT_ORDER_ID'
                }
            })
        }

        const data = await Order.findOne({ _id: orderId })

        if (!data) {
            return res.status(404).json({
                error: {
                    code: 404,
                    message: 'DOESN\'T_FIND_SUCH_ORDER'
                }
            })
        }

        const { _id: userId } = req.user
        const user = await User.findById(userId)

        if (userId !== data.user.toString() && user.role !== 'admin'){
            return res.status(401).json({ message: 'ACCESS_DENIED' })
        }

        res.send(data)
    } catch (e) {
        res.status(500).json({
            error: {
                code: 500,
                message: 'Server error. Try later'
            }
        })
    }
})

router.get('/user/:userId', auth, async(req, res) => {
    try {
        const { userId } = req.params

        if (userId === 'undefined' || userId === 'null') {
            return res.status(404).json({
                error: {
                    code: 404,
                    message: 'INCORRECT_USER_ID'
                }
            })
        }

        const data = await Order.find({ user: userId })

        if (!data) {
            return res.status(404).json({
                error: {
                    code: 404,
                    message: 'DOESN\'T_FIND_ORDERS'
                }
            })
        }

        const user = await User.findById(userId)

        if (userId !== data[0].user.toString() && user.role !== 'admin'){
            return res.status(401).json({ message: 'ACCESS_DENIED' })
        }

        res.send(data)
    } catch (e) {
        // console.log(e.message)
        res.status(500).json({
            error: {
                code: 500,
                message: 'Server error. Try later'
            }
        })
    }
})

router.post('/', auth, async(req, res) => {
    try {
        const { room, user, hotel, date, name, tel, ...fields } = req.body

        const roomIsExist = Room.findOne({ _id: room })
        const userIsExist = User.findOne({ _id: user })
        const hotelIsExist = Hotel.findOne({ _id: hotel })

        if (!roomIsExist || !userIsExist || !hotelIsExist || !date || Number.isNaN(date)) {
            return res.status(401).json({
                error: {
                    code: 401,
                    message: 'INVALID_DATA'
                }
            })
        }

        const { _id: userId } = req.user
        const userEntity = await User.findById(userId)

        if (userId !== user && userEntity?.role !== 'admin'){
            return res.status(403).json({
                error: {
                    message: 'ACCESS_DENIED',
                    code: 403
                }
            })
        }

        const roomIsBooked = await Order.findOne({ room, date })

        if(roomIsBooked) {
            return res.status(401).json({
                error: {
                    code: 401,
                    message: 'THIS_ROOM_IN_THIS_DATE_HAS_BEEN_BOOKED'
                }
            })
        }

        if(userEntity?.role === 'admin' && (!name || !tel)) {
            return res.status(401).json({
                error: {
                    code: 401,
                    message: 'INVALID_DATA.CHOOSE_NAME_AND_PHONE'
                }
            })
        }

        const userData = userEntity?.role === 'admin' ? { user, name, tel } : { user }

        const data = await Order.create({ room, date, hotel, ...userData, ...fields })
        res.send(data)
    } catch (e) {
        res.status(500).json({
            error: {
                code: 500,
                message: 'Server error. Try later'
            }
        })
    }
})

router.post('/info', async(req, res) => {
    try {
        const { startMonth, endMonth, room } = req.body

        const data = await Order.find({ date: { $gte: startMonth, $lte: endMonth }, room })

        if (!data.length) {
            return res.status(404).json({
                error: {
                    code: 404,
                    message: 'DOESN\'T_HAVE_MATCH'
                }
            })
        }

        const finalData = data.map(order => Object.keys(order.toObject()).reduce((obj, key) => key !== 'user' ? { ...obj, [key]: order[key] } : obj, {}))
        res.send(finalData)
    } catch (e) {
        res.status(500).json({
            error: {
                code: 500,
                message: 'Server error. Try later'
            }
        })
    }
})

router.post('/infoForHotel', async(req, res) => {
    try {
        const { startMonth, endMonth, hotel } = req.body

        const data = await Order.find({ date: { $gte: startMonth, $lte: endMonth }, hotel })

        if (!data.length) {
            return res.status(404).json({
                error: {
                    code: 404,
                    message: 'DOESN\'T_HAVE_MATCH'
                }
            })
        }

        const finalData = data.map(order => Object.keys(order.toObject()).reduce((obj, key) => key !== 'name' && key !== 'tel' ? { ...obj, [key]: order[key] } : obj, {}))
        res.send(finalData)
    } catch (e) {
        res.status(500).json({
            error: {
                code: 500,
                message: 'Server error. Try later'
            }
        })
    }
})

router.delete('/:orderId', auth, async(req, res) => {
    try {
        const { orderId } = req.params
        const order = await Order.findById(orderId)

        const { _id: userId } = req.user
        const userEntity = await User.findById(userId)

        if (userId !== order?.user?.toString() && userEntity?.role !== 'admin'){
            return res.status(403).json({ error: { message: 'ACCESS_DENIED', code: 403 } })
        }

        await Order.findByIdAndRemove(orderId)
        res.json({ message: 'ORDER_HAS_BEEN_REMOVED', code: 200 })
    } catch (e) {
        res.status(500).json({
            error: {
                code: 500,
                message: 'Server error. Try later'
            }
        })
    }
})

module.exports = router
