const mysql = require('mysql2');

//Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'F786110l',
        database: 'mybusiness'
    },

    console.log('Connected to the mybusiness database.')
);

module.exports = db;