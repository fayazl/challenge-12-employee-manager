const db = require('./db/connection');
const mysql = require('mysql2');
const cTable = require('console.table')


// //Constructor function

// class Database {

//     constructor (db) {
//         this.db = db;
//     }





// }


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

//Add a role
function addRole (role, salary, departmentID){
    const sql = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`;
    const params = [role, salary, departmentID]

    db.promise().query(sql, params);
    console.log('Added new role')

}

//Add an employee
function addEmployee (firstName, lastName, role, managerId){
    const sql = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)'
    const params = [firstName, lastName, role, managerId]

    db.promise().query(sql, params);
    console.log('Added new employee')
}



allDepartments();
allRoles();
allEmployees();
addDepartment();
addRole();
addEmployee();


