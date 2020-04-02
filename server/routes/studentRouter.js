const express = require('express');
const studentController = require('../controllers/studentController');
const studentRouter = express.Router();

/**
 * Use a GET request on http://localhost:5656/students/ to get a list of all students.
 */
studentRouter.route('/')
    .get(studentController.getAllStudents)
    .post(studentController.registerStudent)

/**
 * Use a GET request on http://localhost:5656/students/:idnum to get
 * the specific student with the matching idnum.
 */
studentRouter.route('/:idnum/')
    .get(studentController.getStudent)

/**
 * Use a GET request on http://localhost:5656/students/:idnum to get all the courses
 * the specific student with the matching idnum is enrolled in.
 */
studentRouter.route('/:idnum/courses/')
    .get(studentController.getCoursesOfStudent)

module.exports = studentRouter