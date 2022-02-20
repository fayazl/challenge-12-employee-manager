const db = require('./db/connection');

db.query(
    'SELECT * FROM department',
    function(err, results, fields){
        console.log (results);
        console.log (fields)
    }


)


// class Database {

//     //Constructor function
//     constructor (db) {
//         this.db = db;
//     }

//     allDepartments(){
//         const sql = 'SELECT * FROM department';
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


