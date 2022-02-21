const db = require('./db/connection');
const mysql = require('mysql2');
const cTable = require('console.table')


//Constructor function

class Database {

    constructor (db) {
        this.db = db;
    }

    //View all departments
        allDepartments(){
            const sql = `SELECT * FROM department`;
            db.promise().query(sql).then(([rows, fields]) => {
                console.table(rows)

            });
        }

    //View all roles
        allRoles(){
            const sql = `SELECT role.id, role.title AS 'role', department.name AS 'department', salary
            FROM role
            LEFT JOIN department
            ON role.department_id = department.id`
        
            db.promise().query(sql).then(([rows, fields]) => {
                console.table(rows)
            })
        }

    //View all employees
        allEmployees(){
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
        addDepartment (departmentInput){
            const sql = `INSERT INTO department (name) VALUES (?)`
            db.promise().query(sql, departmentInput);
                console.log(`Added new department ${departmentInput}`)

        }    

    //Add a role
        addRole (role, salary, departmentRole){
            const sql = `INSERT INTO role (title, salary, department) VALUES (?,?,?)`;
            const params = [role, salary, department]
            db.promise().query(sql, params);
            console.log('Added new role')

        }

    //Add an employee
        addEmployee (firstName, lastName, role, managerId){
            const sql = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)'
            const params = [firstName, lastName, role, managerId]
            db.promise().query(sql, params);
            console.log('Added new employee')
        }

    //Update an employee role

        updateEmployeeRole(employeeID, newRole){
            const sql = `UPDATE employee SET role_id = ? WHERE id = ?`
            params = [employeeID, newRole]
            db.promise().query(sql, params);
            console.log('Updated new employee')
            }    

}



module.exports = new Database (db)