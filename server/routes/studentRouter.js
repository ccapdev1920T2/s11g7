const express = require('express');
const studentController = require('../controllers/studentController');
const studentRouter = express.Router();

/**
 * Use a GET request on http://localhost:5656/api/students/ to get a list of all students.
 */
studentRouter.route('/')
    .get(studentController.getAllStudents)

/**
 * Use a GET request on http://localhost:5656/api/students/:idnum to get
 * the specific student with the matching idnum.
 */
studentRouter.route('/:idnum')
    .get(studentController.getStudent)

/**
 * Use a GET request on http://localhost:5656/api/students/:idnum to get all the courses
 * the specific student with the matching idnum is enrolled in.
 */
studentRouter.route('/:idnum/courses')
    .get(studentController.getCoursesOfStudent)
    .patch(studentController.modifyCoursesOfStudent)

studentRouter.route('/register')
    .post(studentController.registerStudent)

module.exports = studentRouter