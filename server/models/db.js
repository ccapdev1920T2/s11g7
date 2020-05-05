//import mongoose from 'mongoose'
const mongoose = require('mongoose')

const Admin = require('./Admin.js')
const Course = require('./Course.js')
const Student = require('./Student.js')

const url = 'mongodb+srv://admin:RLk30SKMbnrFnCrB@animosis-zgfw3.mongodb.net/animosis?retryWrites=true&w=majority'
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}

const database = {
    connect: () => {
        mongoose.connect(url, options, (error) => {
            if (error)
                throw error

            console.log('Connected to database ' + url)
        })
    }
}

module.exports = database