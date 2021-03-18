const mysql = require('mysql')

const db=mysql.createConnection({
    host: '',
    user: '',
    password: '',
    database: ''
})

module.exports=db

//Change name of this file for db.js 