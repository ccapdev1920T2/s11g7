import mongoose from 'mongoose'

let ClassTimeSchema = mongoose.Schema({
    timeslot: {
        type: String,
        required: true
    },
    room: {
        type: String,
        required: true
    }
})

module.exports('ClassTime', ClassTimeSchema)