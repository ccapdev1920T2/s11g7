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
     * @param courses Must contain the appropriate courses to drop.
     */
    modifyCoursesOfStudent: async (req, res) => {
        let conflictFound = false
        let error = {
            status: 500,
            message: 'Internal server error occurred',
            courses: []
        }

        try {
            if ("action" in req.body && "courses" in req.body) {
                let action = req.body.action
                let courses = req.body.courses
                let student = req.params.idnum

                let studentDoc = await Student.findOne({ idnum: student }, { idnum: 1, courses: 1 })
                let courseDocs = await Course.find({ classnum: { $in: courses } }, { classnum: 1, code: 1, enrolled: 1, slots: 1 })
                let coursesEnrolledDocs = await Course.find({ classnum: {$in: studentDoc.courses}}, { code: 1 })
                
                switch (action.toUpperCase()) {
                    case "ENLIST": {
                        courseDocs.forEach((course) => {
                            if (studentDoc.courses.includes(course.classnum) || 
                                coursesEnrolledDocs.some(courseEnrolled => courseEnrolled.code === course.code)) {
        
                                conflictFound = true
                                error.status = 409
                                error.message = "Can't enroll in the following courses."
                                error.courses.push({
                                    number: course.classnum,
                                    reason: "Already enlisted"
                                })
                            } else if (course.enrolled.length >= course.slots) {
                                conflictFound = true
                                error.status = 409
                                error.message = "Can't enroll in the following courses."
                                error.courses.push({
                                    number: course.classnum,
                                    reason: "Already full"
                                })
                            } else enlist(studentDoc, course)
                        })
                    } break

                    case "DROP": {
                        courseDocs.forEach((course) => {
                            if (!studentDoc.courses.includes(course.classnum)) {
                                conflictFound = true
                                error.status = 409
                                error.message = "Student can't drop the following courses."
                                error.courses.push({
                                    number: course.classnum,
                                    reason: "Not enlisted"
                                })
                            } else drop(studentDoc, course)
                        })
                    } break

                    default: {
                        conflictFound = true
                        error.status = 400
                        error.message = "'action' must contain 'ENLIST' or 'DROP' only!"
                        return
                    }
                }
            } else {
                conflictFound = true
                error.status = 400
                error.message = "Body must contain 'action' and 'courses'!"
            }
        } catch (err) {
            console.log(err)
            conflictFound = true
            error = err
        } finally {
            if (conflictFound) {
                res.status(error.status).json(error)
            } else {
                res.status(200).json({
                    message: 'Action performed successfully'
                })
            }
        }
    },

    /**
     * Compares the login info with input
     */
    loginStudent: async (req, res) => {
        try {
            let input = req.body;
            let student = await Student.findOne({ idnum: input.idnum })

            // checks if idnum is valid
            if(student){
                // checks if password is valid
                bcrypt.compare(input.password, student.password, function(err,equal){
                    // if password input and password inasdasd db match
                    if(equal){
                        // saves user idnum to current session
                        req.session.user_id = input.idnum;
                        console.log(req.session.user_id)
                        console.log(req.sessionID)
                        req.session.save(function(){
                            if(req.session.user_id){
                                res.send('New Session Created')
                            }
                            else{
                                res.send('Session was not created')
                            }
                        })
                        
                    }
                    else{
                        res.status(404).json({ message: 'Invalid ID Number/Password' });
                    }
                })
            }
            else{
                res.status(404).json({ message: 'Invalid ID Number/Password' });
            }
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }        
    },

    /**
     * checks if user is currently logged in or not
     */
    getStudentLogin: async (req,res) => {
        console.log(req.session.user_id)
        console.log(req.sessionID)
        res.status(200).json(req.session);
    },

    /**
     * logs out current user by clearing current session
     */
    logoutStudent: async (req,res) => {
        console.log(req.session)
        req.session.destroy()
        console.log(req.session)
        res.send('Session removed')
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