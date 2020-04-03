const Student = require('../models/Student')
const Course = require('../models/Course')
const bcrypt = require('bcrypt')

studentController = {

    /**
     * Retrieves all students.
     */
    getAllStudents: async (req, res) => {
        try {
            let students = await Student.find({})
            res.json(students)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },

    /**
     * Retrieves a specific student gives his/her idnum.
     */ 
    getStudent: async (req, res) => {
        try {
            let student = await Student.findOne({ idnum: req.params.idnum })
            res.json(student);
        } catch (err) {
            console.log(err);
            res.status(500).json(err)
        }        
    },

    /**
     * Adds a student to the database.
     */
    registerStudent: async (req, res) => {
        try {
            studentForm = req.body
            studentForm.password = await bcrypt.hash(studentForm.password, 10)
            let student = await Student.create(studentForm)
            res.status(201).send(student)
        } catch (err) {
            console.log(err)
            if (err.name == 'MongoError')
                res.status(409).json(err)
            else
                res.status(500).json(err)
        }
    },

    /**
     * Retrieves the courses that a student has enrolled in.
     */
    getCoursesOfStudent: async (req, res) => {
        try {
            let { courses } = await Student.findOne({ idnum: req.params.idnum }, { _id: 0, courses: 1 })
            let courseData = await Course.find({
                classnum: {
                    $in: courses
                }
            })

            res.json(courseData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err)
        }
    },

    /**
     * TODO: Removes the given course number from the student's enrolled.
     */
    dropCourseOfStudent: async (req, res) => {
        res.status(501).json({ message: 'Feature to be implemented!' })
    },

    /**
     * TODO: Enlists the students in the given course.
     */
    enlistCourseOfStudent: async (req, res) => {
        res.status(501).json({ message: 'Feature to be implemented!' })
    },

    /**
     * TODO: Compares the login info with input and checks if authentication is correct.
     */
    getStudentLoginInfo: async (req, res) => {
        res.status(501).json({ message: 'Feature to be implemented!' })
    },

    dropAllStudentsFromCourse: (courseNum) => {

    }

}

module.exports = studentController