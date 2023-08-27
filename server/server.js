const express = require('express')
const mongoose = require('mongoose')
const chalk = require('chalk')
const config = require('config')
const routes = require('./routes/index')
const initDatabase = require('./startUp/initDatabase')
const path = require('path')
const cors = require('cors')

const PORT = config.get('port') ?? 5005

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/', express.static(path.join(__dirname, 'public')))

app.use(cors({
    origin: config.get('clientUrl')
}))

app.use('/api', routes)

async function start() {
    try {
        mongoose.connection.once('open', () => {
            initDatabase()
        })

        await mongoose.connect(config.get('mongoUri'))
        console.log(chalk.green(`MongoDB connected.`))

        app.listen(PORT, () =>
            console.log(chalk.green(`Server has been started on port ${PORT}...`))
        )
    } catch (e) {
        console.log(chalk.red('server.js - f:start'))
        console.log(chalk.red(e.message))
        process.exit(1)
    }
}

start()
