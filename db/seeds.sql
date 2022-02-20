INSERT INTO department (name)
VALUES 
    ('Accounting'),
    ('Finance'),
    ('Legal'),
    ('Technology');


INSERT INTO role (title, salary, department_id)
VALUES
    ('Intern', 35000, 1),
    ('Accountant', 60000, 1),
    ('CFA', 100000, 2),
    ('CFO', 300000, 2),
    ('Lawyer', 100000, 3),
    ('Lead Counsel', 300000, 3),
    ('Engineer', 100000, 4),
    ('CTO', 300000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Patty', 'Furniture', 1, 2),
    ('Teri', 'Dactyl', 2, Null),
    ('Peg', 'Legge', 3, 4),
    ('Allie', 'Grater', 4, Null),
    ('Maureen', 'Biologist', 5, 6),
    ('Olive', 'Yew', 6, Null),
    ('Fayaz', 'Lalani', 7, 8),
    ('Steve', 'Jobs', 8, Null);
