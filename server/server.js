const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session);

const app = express()
const port = process.env.PORT || 5656

const studentRouter = require('./routes/studentRouter')
const courseRouter = require('./routes/courseRouter')

const db = require('./models/db.js')
db.connect()

// Cross-Origin Resource Sharing (CORS) Headers
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*")
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

// Middleware
app.use(session({
  'secret': 'ccapdev-session',
  'resave': false,
  'saveUninitialized': false,
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// app.use(function (req, res) {

//   var details = {};

//   if(req.session.idnum) {
//       details.idnum = req.session.idnum;
//   }
//   // render error
// });

// Connect Routers
app.use('/api/students', studentRouter)
app.use('/api/courses', courseRouter)

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})

