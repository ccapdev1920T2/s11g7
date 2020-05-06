const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Admin = require('../models/Admin.js')
const Course = require('../models/Course.js')
const Student = require('../models/Student.js')

// Data for population
let adminData = {
    "username": "admin",
    "password": bcrypt.hashSync("admin", 10)
}

let currentTerm = 
    {
        acadyear:
        {
            from: 2019,
            to: 2020
        },
        termno: 2
    }

let courseData = [
    {
        "classnum": 1544,
        "code": 'CCAPDEV', name: 'Web Application Development', 
        "section": 'S11', 
        "units": 3, 
        "term": currentTerm, 
        classtimes: 
        [
            {day: 'M', time:{from:'11:00', to:'12:30'}, room: 'G304B'}, {day: 'W', time:{from:'11:00', to:'12:30'}, room: 'G304B'}
        ], 
        enrolled: ["11828498"], 
        slots: 45, 
        professor: 'ANTIOQUIA, ARREN MATTHEW CAPUCHINO'
    },

    {classnum: 1543, code: 'CCAPDEV', name: 'Web Application Development', section: 'S14', units: 3, term: currentTerm, classtimes: [{day: 'T', time:{from:'11:00', to:'12:30'}, room: 'G304B'}, {day: 'H', time:{from:'11:00', to:'12:30'}, room: 'G304B'}], enrolled: [], slots: 45, professor: 'CHUA, UNISSE CHUA'},

    {classnum: 606, code: 'CCAPDEV', name: 'Web Application Development', section: 'S12', units: 3, term: currentTerm, classtimes: [{day: 'M', time:{from:'14:30', to:'16:00'}, room: 'G304B'}, {day: 'W', time:{from:'14:30', to:'16:00'}, room: 'G304B'}], enrolled: [], slots: 45, professor: 'ANTIOQUIA, ARREN MATTHEW CAPUCHINO'},

    {classnum: 1542, code: 'CCAPDEV', name: 'Web Application Development', section: 'S15', units: 3, term: currentTerm, classtimes: [{day: 'T', time:{from:'14:30', to:'16:00'}, room: 'G304B'}, {day: 'H', time:{from:'14:30', to:'16:00'}, room: 'G304B'}], enrolled: [], slots: 45, professor: 'CHUA, UNISSE CHUA'},

    {classnum: 3721, code: 'CCAPDEV', name: 'Web Application Development', section: 'X22', units: 3, term: currentTerm, classtimes: [{day: 'T', time:{from:'11:00', to:'12:30'}, room: 'MRELBA'}, {day: 'H', time:{from:'11:00', to:'12:30'}, room: 'MRELBA'}], enrolled: [], slots: 43, professor: 'ANTIOQUIA, ARREN MATTHEW CAPUCHINO'},

    {
        classnum: 620,
        code: 'STALGCM', name: 'Advanced Algorithms and Complexities', 
        section: 'S14', 
        units: 3, 
        term: currentTerm, 
        classtimes: 
        [
            {day: 'M', time:{from:'11:00', to:'12:30'}, room: 'G208'}, {day: 'W', time:{from:'11:00', to:'12:30'}, room: 'G208'}
        ], 
        enrolled: [], 
        slots: 38, 
        professor: 'REYES, ARVIN CHRISTOPHER C.'
    },
    {
        classnum: 686,
        code: 'STALGCM', name: 'Advanced Algorithms and Complexities', 
        section: 'S15', 
        units: 3, 
        term: currentTerm, 
        classtimes: 
        [
            {day: 'M', time:{from:'09:15', to:'10:45'}, room: 'G211'}, {day: 'W', time:{from:'09:15', to:'10:45'}, room: 'G211'}
        ], 
        enrolled: ["11828498"], 
        slots: 38, 
        professor: 'REYES, ARVIN CHRISTOPHER C.'
    },
    {
        classnum: 687,
        code: 'STALGCM', name: 'Advanced Algorithms and Complexities', 
        section: 'S16', 
        units: 3, 
        term: currentTerm, 
        classtimes: 
        [
            {day: 'M', time:{from:'11:00', to:'12:30'}, room: 'G206'}, {day: 'W', time:{from:'11:00', to:'12:30'}, room: 'G206'}
        ], 
        enrolled: [], 
        slots: 38, 
        professor: 'FERNANDEZ, RYAN AUSTIN'
    },
]

let studentData = [
    {
        firstname: "Lance Ricco",
        middlename: "Lim",
        lastname: "Teng",
        address: "29 Capernaum Street",
        birthdate: "10/06/1999",
        email: "lance_teng@dlsu.edu.ph",
        idnum: 11828498,
        password: "platinum123",
        courses: [
            686,
            1544
        ]
    },
    {"firstname":"Emilie","middlename":null,"lastname":"Truluck","address":"4 Sugar Place","birthdate":"09/08/1996","email":"etruluck0@usatoday.com","idnum":11857072,"password":"Na9slDq"},
    {"firstname":"Dirk","middlename":null,"lastname":"Gyer","address":"593 Hudson Plaza","birthdate":"04/04/1993","email":"dgyer1@skyrock.com","idnum":11583673,"password":"ls2qXomojuR"},
    {"firstname":"Arabel","middlename":null,"lastname":"Gillease","address":"388 Macpherson Drive","birthdate":"02/09/1995","email":"agillease2@china.com.cn","idnum":12004847,"password":"NKw6Dv"},
    {"firstname":"Kelli","middlename":"Waller","lastname":"Hazzard","address":"93429 Forest Dale Pass","birthdate":"02/23/1998","email":"khazzard3@freewebs.com","idnum":11906219,"password":"HjRUgj"},
    {"firstname":"Conan","middlename":null,"lastname":"Hofton","address":"3916 Gale Drive","birthdate":"01/04/2001","email":"chofton4@google.com","idnum":11358459,"password":"3dkn9zLvTY"},
    {"firstname":"Krista","middlename":"Pridham","lastname":"Jacqueme","address":"1348 Hintze Junction","birthdate":"10/29/1996","email":"kjacqueme5@dagondesign.com","idnum":11530375,"password":"LKcy3oUrk"},
    {"firstname":"Essy","middlename":null,"lastname":"Dilrew","address":"91 Hayes Street","birthdate":"04/05/1997","email":"edilrew1d@cloudflare.com","idnum":11251409,"password":"dVlNkFhv"}
]

async function populate(adminData, courseData, studentData) {
    // Connect to Database
    const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/animosis'
    const options = {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
    }

    try {
        let db = mongoose.connect(url, options)
        await Admin.deleteMany({})
        await Course.deleteMany({})
        await Student.deleteMany({})

        studentData.forEach((student) => {
            student.password = bcrypt.hashSync(student.password, 10)
        })
    
        await Admin.create(adminData)
        await Course.insertMany(courseData)
        await Student.insertMany(studentData)
    
        console.log('Database populated \\o/')
    } catch (err) {
        throw err
    } finally {
        mongoose.connection.close(() => {
            console.log('Disconnected from MongoDB, bye o/')
            process.exit(0)
        })
    }
}

populate(adminData, courseData, studentData)