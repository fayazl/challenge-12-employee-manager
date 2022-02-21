const inquirer = require('inquirer');
const connection = require('./db/connection');
const query = require('./query');
const cTable = require('console.table');
const Choices = require('inquirer/lib/objects/choices');
const allDepartments = require('./query');

async function departmentTable(){
    await query.allDepartments()
}

async function rolesTable(){
    await query.allRoles();
}

async function employeesTable(){
    await query.allEmployees();
}

const newDepartment = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'departmentInput',
                message: 'Enter a new department'
             }
        ])

        .then(deptInput => {
            query.addDepartment(deptInput.departmentInput)
            inquirerPrompts()

        })
}


const newRole = () => {

    query.getDepartments ()
    .then(([rows, fields]) => {
        let departments = rows;
        const choices = departments.map(({id, name}) => ({ name: name, value: id}));

        inquirer
        .prompt([
            {
                type: 'input',
                name: 'role',
                message: 'Enter a new role'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Enter the new roles salary'
            },
            {
                type: 'list',
                name: 'department_id',
                message: 'Which department does this role belong to?',
                choices: choices
            },
        ])
        .then(roleInput => {

            query.addRole(roleInput.role, roleInput.salary, roleInput.department_id);
            inquirerPrompts()
        })

    });
}

const newEmployee = () => {
    query.getRoles ()
    .then(([rows, fields]) => {
        let roles = rows;
            const rolesChoices = roles.map(({id, title}) => ({name: title, value: id }));
     
        query.getManager()
            .then(([rows, fields]) => {
                let manager = rows;
                    const managerChoices = manager.map(({id, manager}) => ({name: manager, value: id}));
                    inquirer
                        .prompt([
                            {
                                type: 'input',
                                name: 'firstname',
                                message: 'Enter the first name'
                            },
                            {
                                type: 'input',
                                name: 'lastname',
                                message: 'Enter the last name'
                            },
                            {
                                type: 'list',
                                name: 'role_id',
                                message: 'Select role',
                                choices: rolesChoices
                            },
                            {
                                type: 'list',
                                name: 'manager_id',
                                message: 'Select Manager',
                                choices: managerChoices
                            },
                        ])
                    .then(employeeInput => {

                        query.addEmployee(employeeInput.firstname, employeeInput.lastname, employeeInput.role_id, employeeInput.manager_id);
                        inquirerPrompts()
                    })

            })
});



}


const updateEmployee = () => {
    query.getEmployee ()
    .then(([rows, fields]) => {
            let employee = rows;
                const employeeChoices = employee.map(({id, employees}) => ({name: employees, value: id }));
        
    query.getRoles()
    .then(([rows, fields]) => {
        let role = rows;
        const updateRoleChoices = role.map(({id, title}) => ({name: title, value: id}));


        inquirer
        .prompt([
            {
                type: 'list',
                name: 'employeelist',
                message: 'Select employee to update',
                choices: employeeChoices
            },
            {
                type: 'list',
                name: 'employeerole',
                message: 'Select new role',
                choices: updateRoleChoices
            },
        ])

    .then(employeeRoleInput => {
            query.updateEmployeeRole(employeeRoleInput.employeelist, employeeRoleInput.employeerole);
        })

    })
})



}

const inquirerPrompts = function() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'selection',
                message: 'What would you like to do?',
                choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role' ]
            }
        ])

        .then(answers => {

            switch (answers.selection) {
                    case 'View all departments':
                        departmentTable().then(
                        inquirerPrompts()
                        );

                break;
                    
                    case 'View all roles':
                        rolesTable().then(
                        inquirerPrompts()
                        );


                break;
                    
                    case 'View all employees':
                        employeesTable();
                        inquirerPrompts()

                break;
                    
                    case 'Add a department':
                            newDepartment();

                break;
                    
                    case 'Add a role':
                        newRole();   
                        
                break;
                    
                    case 'Add an employee':
                        newEmployee();  

                break;
    
                    case 'Update an employee role':
                        updateEmployee();
                        inquirerPrompts();
                
                    }


 
            });
    
}

inquirerPrompts()