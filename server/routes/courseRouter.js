const express = require('express')
const courseController = require('../controllers/courseController')
const courseRouter = express.Router()

courseRouter.route('/')
    .get(courseController.getAllCourses)

courseRouter.route('/code/:courseCode/')
    .get(courseController.getCoursesByCode)

courseRouter.route('/number/:courseNum/')
    .get(courseController.getCoursesByNumber)
    .put(courseController.editCourse)

courseRouter.route('/number/:courseNum/students/')
    .get(courseController.getClassList)

module.exports = courseRouter