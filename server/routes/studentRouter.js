const express = require('express');
const studentController = require('../controllers/studentController');
const studentRouter = express.Router();

studentRouter.route('/')
    .get(studentController.getAllStudents)
    .post(studentController.registerStudent)

studentRouter.route('/:idnum')
    .get(studentController.getStudent)

studentRouter.route('/:idnum/courses/')
    .get(studentController.getCoursesOfStudent)

module.exports = studentRouter