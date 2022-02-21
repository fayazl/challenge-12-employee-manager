const db = require('./db/connection');
const mysql = require('mysql2');
const cTable = require('console.table')

//View all departments
function allDepartments(){
    const sql = `SELECT * FROM department`;
    db.promise().query(sql).then(([rows, fields]) => {
        console.table(rows)

    });
}

//View all roles
function allRoles(){
    const sql = `SELECT role.id, role.title AS 'role', department.name AS 'department', salary, department.id
    AS department_id
    FROM role
    LEFT JOIN department
    ON role.department_id = department.id`

    db.promise().query(sql).then(([rows, fields]) => {
        console.table(rows)
    })
}

//View all employees
function allEmployees(){
    const sql = `SELECT employee.id, employee.first_name AS 'first name', employee.last_name AS 'last name', 
    role.title AS 'title', role.salary, department.name AS 'department', 
    (SELECT m.first_name FROM employee m WHERE m.id = employee.manager_id) 
    AS 'manager'
    FROM employee
    LEFT JOIN role 
    ON role.id = employee.role_id
    LEFT JOIN department
    ON department.id = role.department_id`

    db.promise().query(sql).then(([rows, fields]) => {
        console.table(rows)
    })
}

//Add a department
function addDepartment (){
    const sql = `INSERT INTO department (name) VALUES (name)`

    db.promise().query(sql);
        console.log('Added new department')

}

function addRole (){
    const sql = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`;
    const params = [first_name, last_name, role, manager]

    db.promise().query(sql, params);
    console.log('Added new role')

}


allDepartments();
allRoles();
allEmployees();
addDepartment();
addRole();



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