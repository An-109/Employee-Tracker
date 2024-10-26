DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

\c employee_db;

CREATE TABLE employee_name (
    id BIGSERIAL PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100)
);
CREATE TABLE employee_role (
  id BIGSERIAL PRIMARY KEY,
  Erole VARCHAR(100) 
);
CREATE TABLE employee_department (
  id BIGSERIAL PRIMARY KEY,
  Edepartment VARCHAR(100) NOT NULL
);

CREATE TABLE employee_salary (
  id BIGSERIAL PRIMARY KEY,
  Esalary INT
);
CREATE TABLE employee_all (
    id SERIAL PRIMARY KEY,
    final TEXT NOT NULL,
    role_id INT,
    department_id INT,
    salary_id INT,
    name_id INT,

    FOREIGN KEY (role_id)
        REFERENCES employee_role(id)
        ON DELETE SET NULL,

    FOREIGN KEY (department_id)
        REFERENCES employee_department(id)
        ON DELETE SET NULL,

    FOREIGN KEY (salary_id)
        REFERENCES employee_salary(id)
        ON DELETE SET NULL,

    FOREIGN KEY (name_id) 
        REFERENCES employee_name(id)
        ON DELETE SET NULL
);