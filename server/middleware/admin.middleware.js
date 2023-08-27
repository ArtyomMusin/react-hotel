const User = require('../models/User')

module.exports = async(req, res, next) => {
    try {
        if (req.method === 'OPTIONS') {
            return next()
        }

        const userId = req.user
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' })
        }

        const user = await User.findById(userId)

        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'ACCESS_DENIED' })
        }

        next()
    } catch(e) {
        res.status(401).json({message: 'Unauthorized'})
    }
}