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
            studentForm.password = bcrypt.hashSync(studentForm.password, 10)
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
     * Removes the given course number from the student's enrolled.
     * The following parameters must be in the body:
     * @param action Must either be "ENLIST" or "DROP".
     * @param course Must contain the appropriate 
     */
    modifyCoursesOfStudent: async (req, res) => {
        try {
            if ("action" in req.body && "course" in req.body) {
                let action = req.body.action
                let course = req.body.course
                let student = req.params.idnum

                let studentDoc = await Student.findOne({ idnum: student }, { idnum: 1, courses: 1 })
                let courseDoc = await Course.findOne({ classnum: course }, { classnum: 1, enrolled: 1, slots: 1 })

                switch (action.toUpperCase()) {
                    case "ENLIST": {
                        if (studentDoc.courses.includes(course)) {
                            res.status(409).json({
                                message: "Student is already enlisted in that course!"
                            })
                            return
                        } else if (courseDoc.enrolled.length >= courseDoc.slots) {
                            res.status(409).json({
                                message: "This course is already full!"
                            })
                            return
                        } else await enlist(studentDoc, courseDoc)
                    } break

                    case "DROP": {
                        if (!studentDoc.courses.includes(course)) {
                            res.status(409).json({
                                message: "Student is not enlisted in that course!"
                            })
                            return
                        } else await drop(studentDoc, courseDoc)
                    } break

                    default: {
                        res.status(400).json({
                            message: "'action' must contain 'ENLIST' or 'DROP' only!"
                        })
                        return
                    }
                }
                res.status(200).json({
                    message: action + ' successfully performed!'
                })

            } else {
                res.status(400).json({
                    message: "Body must contain 'action' and 'course'!"
                })
            }
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },

    /**
     * TODO: Compares the login info with input and checks if authentication is correct.
     */
    getStudentLoginInfo: async (req, res) => {
        res.status(501).json({ message: 'Feature to be implemented!' })
    }

}

/**
 * Enlists the given student in the given course.
 * @param student Student to be enlisted.
 * @param course Course number to enlist in.
 */
async function enlist(student, course) {
    try {
        student.courses.push(course.classnum)
        course.enrolled.push(student.idnum)
        await student.save()
        await course.save() 
    } catch (err) {
        throw err
    }
}

/**
 * Drops the given student from the given course.
 * @param student Student to be dropped.
 * @param course Course number to drop.
 */
async function drop(student, course) {
    try {
        student.courses = student.courses.filter((c) => c != course.classnum)
        course.enrolled = course.enrolled.filter((s) => s != student.idnum)
        await student.save()
        await course.save() 
    } catch (err) {
        throw err
    }
}

/**
 * TODO: Bug testing
 * Checks for any schedule conflicts between repeating schedules. One-time schedules are not checked.
 * @param {[Number]} courseList 
 */
async function scheduleConflicts(courseList) {
    try {
        let courseData = await Course.find({
            classnum: {
                $in: courseList
            }
        })

        console.log(courseData)
        let conflicts = []
        
        // Compare each schedule against each other
        for (let i = 0; i < courseData.length; i++) {
            for (let j = i + 1; j < courseData.length; j++) {
                
                let courseA = courseData[i].classtimes, courseB = courseData[j].classtimes

                // Compare each of the classtimes between them
                for (m = 0; m < courseA.length; m++) {
                    for (n = 0; n < courseB.length; n++) {
                        let schedA = courseA[m], schedB = courseB[n]

                        // If both schedules are repeating
                        if (/^[MTWHFSL]$/.test(schedA.day) &&
                            /^[MTWHFSL]$/.test(schedB.day)) {

                            if (schedA.day == schedB.day) {

                                // If any schedules overlap
                                if (schedA.time.to > schedB.time.from || 
                                    schedB.time.to > schedA.time.from) {
                                    
                                    conflicts.push({
                                        courseA: courseData[i],
                                        courseB: courseData[j]
                                    })
                                    
                                }
                            }
                        }
                    }
                }

            }
        }
        
        return conflicts
    } catch (err) {
        throw err
    }
}

module.exports = studentController