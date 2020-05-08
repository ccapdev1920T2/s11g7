const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')
const cors = require('cors')

const app = express

app.use(cors())
app.use('/', serveStatic(path.join(__dirname, '/dist')))

const port = process.env.PORT || 3000
app.listen(port)

console.log('Listening on port' + port)