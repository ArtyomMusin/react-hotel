const express = require('express')
const router = express.Router({ mergeParams: true })
const City = require('../models/City')
const chalk = require('chalk')

router.get('/', async (req, res) => {
    try{
        const data = await City.find()
        res.status(200).send(data)
    } catch (e) {
        console.log(chalk.red(e.message))
    }

})

module.exports = router
