const Student = require('../models/Student');
const Course = require('../models/Course')

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
        }        
    },

    /**
     * TODO: Implement routing.
     * Adds a student to the database.
     */
    registerStudent: async (req, res) => {
        try {
            let student = new Student(req.body);
            await student.save();
            res.status(201).send(student);
        } catch (err) {
            console.log(err);
            res.status(500)
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
            res.status(500)
        }
    },

    /**
     * TODO: Removes the given course number from the student's enrolled.
     */
    dropCourseOfStudent: async (req, res) => {
        res.status(501)
    },

    /**
     * TODO: Compares the login info with input and checks if authentication is correct.
     */
    getStudentLoginInfo: async (req, res) => {
        res.status(501)
    }

}

module.exports = studentController