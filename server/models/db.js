//import mongoose from 'mongoose'
const mongoose = require('mongoose')
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/animosis'
// const url = 'mongodb+srv://admin:RLk30SKMbnrFnCrB@animosis-zgfw3.mongodb.net/animosis?retryWrites=true&w=majority'
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