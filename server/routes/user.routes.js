const express = require('express')
const router = express.Router({ mergeParams: true })
const User = require('../models/User')
const chalk = require('chalk')
const auth = require('../middleware/auth.middleware')

router
    .route('/:userId')
    .get(auth, async (req, res) => {
        const { userId } = req.params
        try{
            const data = await User.findById(userId)
            res.status(200).send(data)
        } catch (e) {
            console.log(chalk.red(e.message))
        }
    })
    .patch(auth, async (req, res) => {
        const { userId } = req.params
        try{
            const data = await User.findByIdAndUpdate(userId, req.body, { new: true })
            res.status(200).send(data)
        } catch (e) {
            console.log(chalk.red(e.message))
        }
    })

module.exports = router
