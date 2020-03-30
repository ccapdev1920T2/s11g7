const database = require('./db.js')
const Admin = require('./Admin.js')

database.connect()

database.insertOne(Admin,
    {
        username: 'admin',
        password: 'admin'
    }
)