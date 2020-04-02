const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5656;

const studentRouter = require('./routes/studentRouter');
const courseRouter = require('./routes/courseRouter')

const db = require('./models/db.js')
db.connect()

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect Routers
app.use('/api/students', studentRouter)
app.use('/api/courses', courseRouter)

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})

