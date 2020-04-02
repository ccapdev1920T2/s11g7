const Course = require('../models/Course')
const Student = require('../models/Student')

courseController = {

    /**
     * Retrieves all possible courses.
     */
    getAllCourses: async (req, res) => {
        try {
            let courses = await Course.find({})
            res.json(courses)
        } catch (err) {
            console.log(err)
            res.status(500)
        }
    },
    
    /**
     * Gets all courses that match the given class code. (e.g. "CCAPDEV")
     */
    getCoursesByCode: async (req, res) => {
        try {
            let courses = await Course.find({ code: req.params.courseCode })
            res.json(courses)
        } catch (err) {
            console.log(err)
            res.status(500)
        }
    }, 

    /**
     * Returns the course corresponding to the given classnum.
     */
    getCoursesByNumber: async (req, res) => {
        try {
            let courses = await Course.findOne({ classnum: req.params.courseNum })
            res.json(courses)
        } catch (err) {
            console.log(err)
            res.status(500)
        }
    },

    /**
     * Returns the class list of students enrolled in this course.
     */
    getClassList: async (req, res) => {
        try {
            let { enrolled } = await Course.findOne({ classnum: req.params.courseNum }, { _id: 0, enrolled: 1 })
            let classList = await Student.find({ idnum: { $in: enrolled } })
            res.json(classList)
        } catch (err) {
            console.log(err)
            res.status(500)
        }
    },

    /**
     * TODO: An admin user can edit the details of an existing course. 
     * If a student has already enrolled in that course, 
     * all students will be dropped from that course.
     */
    editCourse: async (req, res) => {
        res.status(501)
    },

    /**
     * TODO: Adds a student to the classlist of the course.
     */
    addStudentToCourse: async (req, res) => {
        res.status(501)
    },

    /**
     * TODO: Removes a student from the classlist of a course.
     */
    removeStudentFromCourse: async (req, res) => {
        res.status(501)
    }

}

module.exports = courseController