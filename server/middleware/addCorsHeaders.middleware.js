const config = require('config')

module.exports = (req, res, next) => {
    res.append('Access-Control-Allow-Origin', config.get('clientUrl'))
    res.append('Access-Control-Allow-Headers', config.get('clientUrl'))
    next()
}
