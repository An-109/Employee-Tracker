DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

\c employee_db;

CREATE TABLE employee_First (
  id SERIAL PRIMARY KEY,
  Efirst VARCHAR(100) NOT NULL
);
CREATE TABLE employee_Last (
  id SERIAL PRIMARY KEY,
  Elast VARCHAR(100) NOT NULL
);
CREATE TABLE employee_role (
  id SERIAL PRIMARY KEY,
  Erole VARCHAR(100) NOT NULL
);
CREATE TABLE employee_department (
  id SERIAL PRIMARY KEY,
  Edepartment VARCHAR(100) NOT NULL
);

CREATE TABLE employee_salary (
  id SERIAL PRIMARY KEY,
  Esalary INT
);
CREATE TABLE employee_all (
    id SERIAL PRIMARY KEY,
    final TEXT NOT NULL,
    role_id INT,
    department_id INT,
    salary_id INT,
    firstName_id INT,
    lastName_id INT,
 
    FOREIGN  KEY (role_id)
    REFERENCES employee_role(id)
    ON DELETE SET NULL,

     FOREIGN  KEY (department_id)
    REFERENCES employee_department(id)
    ON DELETE SET NULL,

    FOREIGN  KEY (salary_id)
    REFERENCES employee_salary(id)
    ON DELETE SET NULL,

    FOREIGN  KEY (firstName_id)
    REFERENCES employee_First(id)
    ON DELETE SET NULL,

    FOREIGN  KEY (lastName_id)
    REFERENCES employee_Last(id)
    ON DELETE SET NULL

   
);
