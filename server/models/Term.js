const mongoose = require('mongoose')

let TermSchema = mongoose.Schema({
    acadyear: {
        type: {
            from: {
                type: Number,
                required: true
            },
            to: {
                type: Number,
                required: true
            }
        },
        required: true
    },
    termno: {
        type: Number,
        required: true
    }
})

module.exports = TermSchema
// module.exports = mongoose.model('Term', TermSchema)