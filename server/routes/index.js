const express = require('express')
const router = express.Router({ mergeParams: true })

// /api
router.use('/user', require('./user.routes'))
router.use('/country', require('./country.routes'))
router.use('/city', require('./city.routes'))
router.use('/hotel', require('./hotel.routes'))
router.use('/auth', require('./auth.routes'))
router.use('/room', require('./room.routes'))
router.use('/order', require('./order.routes'))

module.exports = router
