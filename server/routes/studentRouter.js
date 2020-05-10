const express = require('express');
const studentController = require('../controllers/studentController');
const studentRouter = express.Router();

/**
 * Use a GET request on http://localhost:5656/api/students/ to get a list of all students.
 */
studentRouter.route('/')
    .get(studentController.getAllStudents)

/**
 * Use a POST request on http://localhost:5656/api/students/register to register student in db.
 */
studentRouter.route('/register')
    .post(studentController.registerStudent)

/**
 * Use a POST request on http://localhost:5656/api/students/login to validate login info of user.
 */
studentRouter.route('/login')
    .post(studentController.loginStudent)

/**
 * Use a GET request on http://localhost:5656/api/students/authenticate-session to check info of current user
 */
studentRouter.route('/authenticate-session')
    .get(studentController.getStudentLogin)

/**
 * Use a GET request on http://localhost:5656/api/students/logout to remove current session
 */
studentRouter.route('/logout')
    .get(studentController.logoutStudent)

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

module.exports = studentRouter