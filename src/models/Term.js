import mongoose from 'mongoose'

let TermSchema = mongoose.Schema({
    acadyearfrom: {
        type: Number,
        required: true
    },
    acadyearto: {
        type: Number,
        required: true
    },
    termno: {
        type: Number,
        required: true
    }
})

module.exports('Term', TermSchema)