const Course = require('../models/Course')
const Student = require('../models/Student')

courseController = {

    /**
     * Retrieves all courses.
     */
    getAllCourses: async (req, res) => {
        try {
            let courses = await Course.find({})
            res.json(courses)
        } catch (err) {
            console.log(err)
            res.status(500).send(err)
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
            res.status(500).send(err)
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
            res.status(500).send(err)
        }
    },

    /**
     * Returns the class list of students enrolled in this course.
     */
    getClassList: async (req, res) => {
        try {
            let { enrolled } = await Course.findOne({ classnum: req.params.courseNum }, { enrolled: 1 })
            let classList = await Student.find({ idnum: { $in: enrolled } })
            res.json(classList)
        } catch (err) {
            console.log(err)
            res.status(500).send(err)
        }
    },

    /**
     * Adds a course to the database.
     */
    addCourse: async (req, res) => {
        try {
            let course = await Course.create(req.body)
            res.status(201).send(course)
        } catch (err) {
            console.log(err)
            res.status(500).send(err)
        }
    },

    /**
     * An admin user can edit the details of an existing course. 
     * TODO: If any students have already enrolled in that course, 
     * all students will be dropped from that course.
     */
    editCourse: async (req, res) => {
        try {
            let course = await Course.findOneAndUpdate({ classnum: req.params.courseNum }, req.body)
            res.status(201).send(course)
        } catch (err) {
            console.log(err);
            res.status(500).send(err)
        }
    },

    /**
     * Deletes the course specified by courseNum 
     * TODO: Also drops all students enlisted.
     * enlisted in the course.
     */
    deleteCourse: async (req, res) => {
        try {
            let courseNum = req.params.courseNum

            await Course.deleteOne({ classnum: courseNum })
            res.status(200).send('Deleted course ' + courseNum)
        } catch (err) {
            console.log(err)
            res.status(500).send(err)
        }
    }


}

module.exports = courseController