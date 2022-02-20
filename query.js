const db = require('./db/connection');
const mysql = require('mysql2');
const cTable = require('console.table')


const sql = 'SELECT * FROM department';

    db.promise().query(sql).then(([rows, fields]) => {
        console.table(rows)

    });



// db.query(
//     'SELECT * FROM department',
//     function(err, results, fields){
//         console.log (results);
       
//     }


// )


// class Database {

//     //Constructor function
//     constructor (db) {
//         this.db = db;
//     }

    // allDepartments(){
    //     const sql = 'SELECT * FROM department';
//         db.query(sql, (err, rows) => {
            
//             if (err) {
//                 res.status(500).json({error: err.message});
//                 return;
//             }
//             res.json({
//                 message: 'success',
//                 data: rows
//             });
//         });
//     }

// }

// module.exports = Database; 