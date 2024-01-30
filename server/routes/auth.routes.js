const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router({ mergeParams: true })
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const tokenService = require('../services/token.service')

router.post('/signUp',
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Некорректный пароль').isLength({min: 8}),
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if(!errors.isEmpty()){
                return res.status(400).json({
                    error: {
                        message: 'INVALID_DATA',
                        code: 400
                    }
                })
            }

            const { email, password, login, tel } = req.body

            const isExist = Boolean(await User.findOne({ email })) || Boolean(await User.findOne({ login })) || Boolean(await User.findOne({ tel }))

            if(isExist){
                res.status(400).json({
                    error: {
                        message: `${email || login || tel} EMAIL_EXIST`,
                        code: 400
                    }
                })
            }

            const hashedPassword = await bcrypt.hash(password, 12)

            const newUser = await User.create({
                ...req.body,
                role: 'user',
                password: hashedPassword
            })

            const tokens = tokenService.generate({ _id: newUser._id })
            await tokenService.save(newUser._id, tokens.refreshToken)
            res.status(201).send({ ...tokens, userId: newUser._id })

        } catch (e) {
            console.log(e.message)
            res.status(500).json({
                message: 'Server error. Try later'
            })
        }
    }
)

router.post('/signIn',
    check('email', 'Некорректный email'),
    async(req, res) => {
        try {
            const errors = validationResult(req)
            const { login, password } = req.body

            if(!errors.isEmpty() || !login){
                return res.status(400).json({
                    error: {
                        message: 'INVALID_DATA',
                        code: 400
                    }
                })
            }

            let existingUser = await User.findOne({ login })
            if (!existingUser) existingUser = await User.findOne({ email: login })
            if (!existingUser) existingUser = await User.findOne({ tel: login })

            if(!existingUser){
                return res.status(400).json({
                    error: {
                        message: 'USER_NOT_FOUND',
                        code: 400
                    }
                })
            }

            const isPasswordEqual = await bcrypt.compare(password, existingUser.password)

            if (!isPasswordEqual) {
                return res.status(400).send({
                    error: {
                        message: 'INVALID_PASSWORD',
                        code: 400
                    }
                })
            }

            const tokens = tokenService.generate({ _id: existingUser._id })
            await tokenService.save(existingUser._id, tokens.refreshToken)

            res.status(200).send({ ...tokens, userId: existingUser._id })

        } catch(e){
            res.status(500).json({
                status: 401,
                message: 'Server error. Try later'
            })
        }
    }
)

router.post('/exist', async(req, res) => {
    try {
        const { login, email, tel } = req.body
        if (email) {
            const data = await User.findOne({ email })
            if (data) {
                return res.status(400).json({
                    status: 400,
                    message: 'THIS_EMAIL_ALREADY_IS_USE'
                })
            }
        }

        if (tel) {
            const data = await User.findOne({ tel })
            if (data) {
                return res.status(400).json({
                    status: 400,
                    message: 'THIS_NUMBER_PHONE_ALREADY_IS_USE'
                })
            }
        }

        if (login) {
            const data = await User.findOne({ login })
            if (data) {
                return res.status(400).json({
                    status: 400,
                    message: 'THIS_LOGIN_ALREADY_IS_USE'
                })
            }
        }

        res.send({ message: 'SUCH_USER_IS_NOT_EXIST', status: 200 })
    } catch (e) {
        res.status(500).json({
            message: 'Server error. Try later'
        })
    }
})

router.post('/token', async (req, res) => {
    try{
        const { refresh_token: refreshToken } = req.body

        if (!refreshToken) {
            return res.status(401).json({message: 'There is no token in the incoming data'})
        }

        const data = tokenService.isValidRefresh(refreshToken)
        if (!data) {
            return res.status(401).json({message: 'Invalid token'})
        }

        const dbToken = await tokenService.findToken(refreshToken)
        if(!dbToken || data._id !== dbToken.user.toString()){
            return res.status(401).json({message: 'Unauthorized'})
        }

        const tokens = tokenService.generate({ _id: data._id })
        await tokenService.save(data._id, tokens.refreshToken)

        res.status(200).send({ ...tokens, userId: data._id})

    } catch(e){
        res.status(500).json({
            message: 'Server error. Try later'
        })
    }
})

module.exports = router
