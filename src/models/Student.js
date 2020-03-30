const mongoose = require('mongoose')

let StudentSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    }, 
    middlename: {
        type: String,
        required: false
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
        required: true
    },
    idnum: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    
    courses: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})

module.exports = mongoose.model('Student', StudentSchema)