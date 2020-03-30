import mongoose from 'mongoose'

let AdminSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false
    }
})

module.exports('Admin', AdminSchema)