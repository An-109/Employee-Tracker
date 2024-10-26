INSERT INTO employee_role (Erole,id)
VALUES ('Sales Lead', 1),
       ('Salesperson', 2),
       ('Lead Engineer', 3),
       ('Software Engineer', 4),
       ('Account Manager', 5),
       ('Accountant', 6),
       ('Legal Team Lead', 7),
       ('Lawyer',8);

INSERT INTO employee_department (Edepartment,id)
VALUES ('Sales',1),
       ('Engineering',2), 
       ('Legal',3),
       ('Finance',4);
INSERT INTO employee_name (id, first_name, last_name) 
VALUES 
    (1, 'Mike', 'Chao'),
    (2, 'Ashley', 'Rory'),
    (3, 'Tom', 'Trouble'),
    (4, 'Roo', 'Tired'),
    (5, 'Ram', 'Sleep'),
    (6, 'Sam', 'Fly'),
    (7, 'Kev', 'No'),
    (8, 'Sarah', 'Gone');
INSERT INTO employee_salary (Esalary,id)
VALUES (10000,1),
       (20000,2),
       (30000,3),
       (40000,4),
       (50000,5),
       (60000,6),
       (5,7),
       (25,8);      

INSERT INTO employee_all (final, role_id, department_id, salary_id, name_id)
VALUES 
    ('em1', 1, 1, 2, 1), 
    ('em2', 2, 1, 3, 2), 
    ('em3', 3, 2, 1, 3), 
    ('em4', 4, 2, 4, 4), 
    ('em5', 5, 4, 5, 5), 
    ('em6', 6, 4, 6, 6), 
    ('em7', 7, 3, 7, 7), 
    ('em8', 8, 3, 8, 8);