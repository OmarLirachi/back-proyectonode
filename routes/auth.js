const router = require('express').Router()
const user = require('../models/user')

router.post('/register', async(req, res) =>{
    const User = new user({
        name: req.body.name,
        address: req.body.address,
        lastname: req.body.lastname,
        age: req.body.age,
        password: req.body.password
    })

    try{
        const savedUser = await User.save()
        res.json({
            error: null,
            data: savedUser
        })

    } catch (error){
        res.status(400).json({error})
    }
})

module.exports = router