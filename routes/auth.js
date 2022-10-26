const router = require('express').Router()
const User = require('../models/User')
const Joi = require('@hapi/joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const schemaRegister = Joi.object({
        name: Joi.string().min(6).max(255).required(),
        address: Joi.string().max(255).required(),
        lastname: Joi.string().min(6).max(255).required(),
        age: Joi.number().required(),
        password: Joi.string().min(6).max(255).required(),
        username: Joi.string().min(6).max(255).required()
})

const schemaLogin = Joi.object({
    password: Joi.string().min(6).max(255).required(),
    username: Joi.string().min(6).max(255).required()
})



router.post('/register', async(req, res) => {
    const { error } = schemaRegister.validate(req.body)

    if (error){
        return res.status(400).json({
            error: error.details[0].message
        })
    }

    const isUsernameExist = await User.findOne({
        username: req.body.username
    })

    if(isUsernameExist) {
        return res.status(400).json({
            error: "Username exists"
        })
    }

    const salt = await bcrypt.genSalt(10)
    const newPass = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        name: req.body.name,
        address: req.body.address,
        lastname: req.body.lastname,
        age: req.body.age,
        password: newPass,
        username: req.body.username
    })
    try {
        const savedUser = await user.save()
        res.json({
            error: null,
            data: savedUser
        })
    } catch (error) {
        res.status(400).json({error})
    }
})

router.post('/login', async(req, res)=> {
    const {error} = schemaLogin.validate(req.body)
    if (error){
        return res.status(400).json({
            error: error.details[0].message
        })
    }
    const user = await User.findOne({
        username: req.body.username
    })
        
    if(!user) {
        return res.status(400).json({
            error: 'Username not found'
        })
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword) {
        return res.status(400).json({
            error: 'Invalid Password'
        })
    }

    const token = jwt.sign({
        name: user.name,
        id: user._id,
    }, process.env.TOKEN_SECRET)

    res.header('auth-token', token).json({
        error: null,
        token: { token }
    })
})

module.exports = router