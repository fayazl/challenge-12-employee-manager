const inquirer = require('inquirer');
const connection = require('./db/connection');
const query = require('./query');
const cTable = require('console.table');
const Choices = require('inquirer/lib/objects/choices');
const allDepartments = require('./query');

async function departmentTable(){
    await query.allDepartments();
}

async function rolesTable(){
    await query.allRoles();
}


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
                departmentTable();

            break;
                
                case 'View all roles':
                    rolesTable();
                }


        });
      

// departmentTable();