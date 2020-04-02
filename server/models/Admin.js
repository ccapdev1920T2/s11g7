const mongoose = require('mongoose')

var AdminSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Admin', AdminSchema)