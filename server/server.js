const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session);

const app = express()

const studentRouter = require('./routes/studentRouter')
const courseRouter = require('./routes/courseRouter')
const adminRouter = require('./routes/adminRouter')

const db = require('./models/db.js')
db.connect()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ 
  credentials: true, 
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", 
}))
app.use(session({
  'secret': 'ccapdev-session',
  'resave': false,
  'saveUninitialized': false,
  cookie: { 
    secure: false,
    httpOnly: false
  },
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));

// Connect Routers
app.use('/api/students', studentRouter)
app.use('/api/courses', courseRouter)
app.use('/api/admin', adminRouter)


const port = process.env.PORT || 5656

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})

