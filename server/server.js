const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session);

const app = express()
const port = process.env.PORT || 5656

const studentRouter = require('./routes/studentRouter')
const courseRouter = require('./routes/courseRouter')
const adminRouter = require('./routes/adminRouter')


const db = require('./models/db.js')
db.connect()

// Middleware
app.use(session({
  'secret': 'ccapdev-session',
  'resave': false,
  'saveUninitialized': false,
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ credentials: true, origin: true }))
app.use(session({
  'secret': 'ccapdev-session',
  'resave': false,
  'saveUninitialized': false,
  cookie: { secure: false },
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));

// Connect Routers
app.use('/api/students', studentRouter)
app.use('/api/courses', courseRouter)
app.use('/api/admin', adminRouter)

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})

