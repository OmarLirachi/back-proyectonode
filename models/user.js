const { date } = require('@hapi/joi/lib/template')
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        min: 4,
        max: 255
    },

    address:{
        type: String,
        required: true,
        max: 255
    },

    lastname:{
        type: String,
        required: true,
        min: 4,
        max: 255
    },

    age:{
        type: Number,
        required: true,
    },

    date: {
        type: Date,
        default: Date.now
    },
    password: {
    type: String,
    required: true,
    minLenght: 4
    }
})

module.exports = mongoose.model('user', userSchema)