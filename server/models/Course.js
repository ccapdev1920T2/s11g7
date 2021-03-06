const mongoose = require('mongoose')
const Term = require('./Term.js')
const ClassTime = require('./ClassTime.js')

var CourseSchema = mongoose.Schema({
    classnum: {
        type: Number,
        required: true,
        unique: true
    },
    code: {
        type: String,
        required: true,
        index: true
    },
    name: {
        type: String,
        required: true,
        index: true
    },
    section: {
        type: String,
        required: true,
        index: true
    },
    units: {
        type: Number,
        required: true
    },

    term: {
        type: Term,
        required: true
    },
    classtimes: {
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
        required: true,
        index: true
    }
})

module.exports = mongoose.model('Course', CourseSchema)