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
            res.status(500).json(err)
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
            res.status(500).json(err)
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
            res.status(500).json(err)
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
            res.status(500).json(err)
        }
    },

    /**
     * Adds a course to the database.
     */
    addCourse: async (req, res) => {
        try {
            let course = await Course.create(req.body)
            res.status(201).json(course)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },

    /**
     * An admin user can edit the details of an existing course. 
     * If any students have already enrolled in that course, 
     * all students will be dropped from that course.
     */
    editCourse: async (req, res) => {
        try {
            let courseNum = req.params.courseNum
            let dropped = await dropAllStudentsFromCourse(courseNum)
            let course = await Course.findOneAndUpdate({ classnum: courseNum }, req.body)
            res.status(200).json({ message: 'Updated course ' + courseNum + ', ' + dropped.length + 'students dropped' })
        } catch (err) {
            console.log(err)
            if (err.name == 'MongoError')
                res.status(409).json(err)
            else
                res.status(500).json(err)
        }
    },

    /**
     * Deletes the course specified by courseNum 
     * Also drops all students enlisted in the course.
     */
    deleteCourse: async (req, res) => {
        try {
            let courseNum = req.params.courseNum
            let dropped = await dropAllStudentsFromCourse(courseNum)
            await Course.deleteOne({ classnum: courseNum })
            res.status(200).json({ message: 'Deleted course ' + courseNum + ', ' + dropped.length + ' students dropped' })
        } catch (err) {
            console.log(err)
            if (err.name == 'MongoError')
                res.status(409).json(err)
            else
                res.status(500).json(err)
        }
    }

}

async function dropAllStudentsFromCourse(courseNum) {
    try {
        let { enrolled } = await Course.findOne({ classnum: courseNum }, { enrolled: 1 })
        let classList = await Student.find({ idnum: { $in: enrolled } })
        classList.forEach((student) => {
            student.enrolled = student.enrolled.filter((course) => course != courseNum)
            student.save()
        })
        return classList
    } catch (err) {
        throw err
    }
}

module.exports = courseController