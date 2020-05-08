const mongoose = require('mongoose')

let StudentSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    middlename: {
        type: String,
        required: false
    },
    lastname: {
        type: String,
        required: true
    },
    
    address: {
        type: String,
        required: true
    },
    birthdate: {
        type: Date,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    idnum: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    
    courses: {
        type: [Number],
        required: false
    }
})

module.exports = mongoose.model('Student', StudentSchema)