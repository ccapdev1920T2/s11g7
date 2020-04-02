//import mongoose from 'mongoose'
const mongoose = require('mongoose')

const Admin = require('./Admin.js')
const Course = require('./Course.js')
const Student = require('./Student.js')

const url = 'mongodb://localhost:27017/animosis'
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
}

const database = {
    connect: () => {
        mongoose.connect(url, options, (error) => {
            if (error)
                throw error

            console.log('Connected to server')
        })
    },

    insertOne: (model, doc) => {
        model.create(doc, (error, result) => {
            if (error)
                throw error

            console.log('Added ' + result)
        })
    },

    insertMany: (model, docs) => {
        model.insertMany(docs, (error, result) => {
            if (error)
                throw error

            console.log('Added ' + result)
        })
    },

    findOne: (model, query, projection, callback) => {
        model.find(query, projection, (error, result) => {
            if (error)
                throw error

            return callback(result)
        })
    },

    findMany: (model, query, projection, callback) => {
        model.find(query, projection, (error, result) => {
            if (error)
                throw error

            return callback(result)
        })
    },

    updateOne: (model, filter, update) => {
        model.updateOne(filter, update, (error, result) => {
            if(error) throw error
            console.log('Document modified: ' + result.nModified)
        })
    },

    updateMany: (model, filter, update) => {
        model.updateMany(filter, update, (error, result) => {
            if(error) throw error
            console.log('Documents modified: ' + result.nModified)
        })
    },

    deleteOne: (model, conditions) => {
        model.deleteOne(conditions, (error, result) => {
            if(error) throw error;
            console.log('Document deleted: ' + result.deletedCount)
        })
    },

    deleteMany: (model, conditions) => {
        model.deleteMany(conditions, (error, result) => {
            if(error) throw error
            console.log('Document deleted: ' + result.deletedCount)
        })
    }
}

module.exports = database