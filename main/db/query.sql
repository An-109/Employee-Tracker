INSERT INTO employee_role (Erole, Esalary)
VALUES 
    ('Sales Lead', 10000),
    ('Salesperson', 20000),
    ('Lead Engineer', 30000),
    ('Software Engineer', 40000),
    ('Account Manager', 50000),
    ('Accountant', 60000),
    ('Legal Team Lead', 50),
    ('Lawyer', 25000);


INSERT INTO employee_department (Edepartment)
VALUES 
    ('Sales'),
    ('Engineering'), 
    ('Legal'),
    ('Finance');

INSERT INTO employee_name (first_name, last_name) 
VALUES 
    ('Mike', 'Chao'),
    ('Ashley', 'Rory'),
    ('Tom', 'Trouble'),
    ('Roo', 'Tired'),
    ('Ram', 'Sleep'),
    ('Sam', 'Fly'),
    ('Kev', 'No'),
    ('Sarah', 'Gone');


INSERT INTO employee_all (final, role_id, department_id, name_id)
VALUES 
    ('em1', 1, 1, 1), 
    ('em2', 2, 1, 2), 
    ('em3', 3, 2, 3),  
    ('em4', 4, 2, 4),  
    ('em5', 5, 4, 5),  
    ('em6', 6, 4, 6),  
    ('em7', 7, 3, 7),
    ('em8', 8, 3, 8);  