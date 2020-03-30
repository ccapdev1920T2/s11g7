import mongoose from 'mongoose'
import Term from './Term'
import ClassTime from './ClassTime'

let CourseSchema = mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    section: {
        type: String,
        required: true
    },
    units: {
        type: Number,
        required: true
    },

    term: {
        type: Term,
        required: true
    },
    classes: {
        type: [ClassTime],
        required: true
    },
    enrolled: {
        type: [String],
        required: true
    },
    slots: {
        type: Number,
        required: true
    },
    professor: {
        type: String,
        required: true
    }
})

module.exports('Course', CourseSchema)