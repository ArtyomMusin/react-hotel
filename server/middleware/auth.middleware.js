const tokenService = require('../services/token.service')

module.exports = (req, res, next) => {
    try {
        if (req.method === 'OPTIONS') {
            return next()
        }

        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({ error: { message: 'Unauthorized', code: 401 } })
        }

        const data = tokenService.isValidAccess(token)

        if (!data) {
            return res.status(401).json({ error: { message: 'Unauthorized', code: 401 } })
        }

        req.user = data

        next()
    } catch(e) {
        res.status(401).json({ error: { message: 'Unauthorized', code: 401 } })
    }
}