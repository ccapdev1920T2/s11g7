const express = require('express')
const courseController = require('../controllers/courseController')
const courseRouter = express.Router()

/**
 * Use a GET request on http://localhost:5656/courses/ to get a list of all the courses.
 */
courseRouter.route('/')
    .get(courseController.getAllCourses)

/**
 * Use a GET request on http://localhost:5656/code/:courseCode/ to retrieve 
 * all courses that match the given courseCode. (e.g. CCAPDEV)
 */
courseRouter.route('/code/:courseCode/')
    .get(courseController.getCoursesByCode)

/**
 * Use a GET request on http://localhost:/5656/code/:courseNum to retrieve
 * the specific course that matches the given courseNum
 */
courseRouter.route('/number/:courseNum/')
    .get(courseController.getCoursesByNumber)

/**
 * Use a GET request on http://localhost:/5656/code/:courseNum to retrieve
 * the all STUDENTS who are a part of the course.
 */
courseRouter.route('/number/:courseNum/students/')
    .get(courseController.getClassList)

module.exports = courseRouter