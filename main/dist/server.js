import express from 'express';
import { pool, connectToDb } from './connection.js';
import inquirer from 'inquirer';
import { error } from 'console';
await connectToDb();
const PORT = process.env.PORT || 3001;
const app = express();
// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
class employee {
    start() {
        inquirer
            .prompt([
            {
                type: 'list',
                message: 'What would you like to do?',
                name: 'manage',
                choices: ['View all employees', 'Add employees', 'View all roles', 'Update employees roles', 'add roles', 'View all department', 'add department', 'quit'],
            }
        ])
            .then(async (response) => {
            switch (response.manage) {
                case 'View all employees':
                    await this.viewAllEmployees();
                    break;
                case 'Add employees':
                    await this.addEmployees();
                    break;
                case 'View all roles':
                    await this.viewRoll();
                    break;
                case 'Update employees roles':
                    await this.updateRoll();
                    break;
                case 'add roles':
                    await this.addRoll();
                    break;
                case 'View all department':
                    await this.viewDepartment();
                    break;
                case 'add department':
                    await this.addDepartment();
                    break;
                case 'quit':
                    break;
            }
            console.log('User Response:', response.manage);
            this.start();
        })
            .catch((error) => {
            console.error('Error with Inquirer:', error);
        });
    }
    async viewAllEmployees() {
        const sql = `
  SELECT 
    employee_all.id AS employee_id,
    employee_name.first_name AS first_name,
    employee_name.last_name AS last_name,
    employee_role.Erole AS role,
    employee_department.Edepartment AS department,
    employee_salary.Esalary AS salary
FROM 
    employee_all
JOIN 
    employee_name ON employee_all.name_id = employee_name.id
JOIN 
    employee_role ON employee_all.role_id = employee_role.id
JOIN 
    employee_department ON employee_all.department_id = employee_department.id
JOIN 
    employee_salary ON employee_all.salary_id = employee_salary.id;

  `;
        try {
            const result = await pool.query(sql);
            console.table(result.rows); // Display results in a table format
        }
        catch (error) {
            console.error('Error fetching employees:', error);
        }
    }
    async addEmployees() {
        const employeeS = await inquirer.prompt([
            {
                type: 'input',
                message: 'Enter first name:',
                name: 'first_name1',
            },
            {
                type: 'input',
                message: 'Enter last name:',
                name: 'last_name2',
            },
        ]);
        const { first_name1, last_name2 } = employeeS;
        try {
            const nameCheckQuery = `SELECT id FROM employee_name WHERE first_name = $1 AND last_name = $2`;
            const nameCheckResult = await pool.query(nameCheckQuery, [first_name1, last_name2]);
            let nameId;
            if (nameCheckResult.rows.length > 0) {
                nameId = nameCheckResult.rows[0].id;
                console.log(`Employee name ${first_name1} ${last_name2} already exists with id ${nameId}`);
            }
            else {
                const nameQuery = `INSERT INTO employee_name (first_name, last_name) VALUES ($1, $2) RETURNING id`;
                const nameResult = await pool.query(nameQuery, [first_name1, last_name2]);
                nameId = nameResult.rows[0].id;
                console.log(`New employee ${first_name1} ${last_name2} created with id ${nameId}`);
            }
            const allQuery = `INSERT INTO employee_all (name_id, final) VALUES ($1, $2)`;
            const allValues = [nameId, nameId];
            await pool.query(allQuery, allValues);
            console.log(`Employee ${first_name1} ${last_name2} added to the employee_all table.`);
        }
        catch (error) {
            console.error('Error inserting employee:', error);
        }
    }
    async updateRoll() {
        try {
            const rollsQuery = 'SELECT id, erole FROM employee_role';
            const { rows: employRoll } = await pool.query(rollsQuery);
            const update = employRoll.map((getUp) => ({
                name: getUp.erole,
                value: getUp.id,
            }));
            const employeeQuery = 'SELECT id, first_name, last_name FROM employee_name';
            const { rows: employees } = await pool.query(employeeQuery);
            const employeeChoices = employees.map((employ) => ({
                name: `${employ.first_name} ${employ.last_name}`,
                value: employ.id,
            }));
            const { getID } = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'getID',
                    message: 'Select who you want to update role:',
                    choices: employeeChoices,
                },
            ]);
            const { updates } = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'updates',
                    message: 'Select new role:',
                    choices: update,
                },
            ]);
            // Update employee_all with the new role_id
            const updateQuery = 'UPDATE employee_all SET role_id = $1 WHERE name_id = $2';
            await pool.query(updateQuery, [updates, getID]);
            console.log(`Role updated successfully for employee ID ${getID} to new role ID ${updates}`);
        }
        catch (error) {
            console.error('Error updating role:', error);
        }
    }
    async viewRoll() {
        const view = 'SELECT erole FROM employee_role';
        try {
            const result = await pool.query(view);
            console.table(result.rows); // Display results in a table format
        }
        catch (error) {
            console.error('Error fetching employees:', error);
        }
    }
    async addRoll() {
        const { newRoll } = await inquirer.prompt([
            {
                type: 'input',
                name: 'newRoll',
                message: 'enter your new roll'
            },
        ]);
        console.log(newRoll);
        const trimmedRoll = newRoll.trim();
        if (!trimmedRoll) {
            console.error('Role cannot be empty. Please enter a valid role.');
            return;
        }
        try {
            const roleCheckQuery = `SELECT erole FROM employee_role WHERE erole = $1`;
            // console.log("Checking for role:", trimmedRoll); checking for roll after after it gets trim
            const roleCheckResult = await pool.query(roleCheckQuery, [trimmedRoll]);
            // console.log("Role Check Result:", roleCheckResult); check for the result of the pool query
            let role_id;
            if (roleCheckResult.rows.length > 0) {
                role_id = roleCheckResult.rows[0].id;
                console.log(`Employee role "${trimmedRoll}" already exists with id: ${role_id}`);
            }
            else {
                console.log("Inserting new role:", trimmedRoll);
                const roleQuery = `INSERT INTO employee_role (erole) VALUES ($1) RETURNING id, erole`;
                const roleeResult = await pool.query(roleQuery, [trimmedRoll]);
                // console.log("Role Insert Result:", roleeResult); check your roleeResult
                if (roleeResult.rows.length > 0) {
                    role_id = roleeResult.rows[0].id;
                    console.log(`New employee role "${trimmedRoll}" created with id: ${role_id}`);
                }
                else {
                    console.error('Insert did not return any rows.');
                    return;
                }
            }
            const finalValue = `em${role_id}`;
            const allQuery = `INSERT INTO employee_all (role_id, final) VALUES ($1, $2)`;
            const allValues = [role_id, finalValue];
            console.log('Inserting into employee_all with query:', allQuery, 'and values:', allValues);
            await pool.query(allQuery, allValues);
            console.log(`Employee role "${trimmedRoll}" added to the employee_all table with final value "${finalValue}".`);
        }
        catch (error) {
            console.error('Error inserting roll:', error);
        }
    }
    async viewDepartment() {
        const sql = 'SELECT * FROM employee_department;';
        try {
            const result = await pool.query(sql);
            console.table(result.rows);
        }
        catch (err) {
            console.error('error', error);
        }
    }
    async addDepartment() {
        const { newDpart } = await inquirer.prompt([
            {
                type: 'input',
                name: 'newDpart',
                message: 'enter your new department'
            },
        ]);
        console.log(newDpart);
        const trimmedDepart = newDpart.trim();
        if (!trimmedDepart) {
            console.error('department cannot be empty. Please enter a valid department.');
            return;
        }
        try {
            const roleCheckQuery = `SELECT Edepartment FROM employee_department WHERE Edepartment = $1`;
            console.log("Checking for department:", trimmedDepart); //checking for roll after after it gets trim
            const roleCheckResult = await pool.query(roleCheckQuery, [trimmedDepart]);
            console.log("department Check Result:", roleCheckResult); //check for the result of the pool query
            let department_id;
            if (roleCheckResult.rows.length > 0) {
                department_id = roleCheckResult.rows[0].id;
                console.log(`Employee department "${trimmedDepart}" already exists with id: ${department_id}`);
            }
            else {
                console.log("Inserting new role:", trimmedDepart);
                const roleQuery = `INSERT INTO employee_department (Edepartment) VALUES ($1) RETURNING id, Edepartment`;
                const roleeResult = await pool.query(roleQuery, [trimmedDepart]);
                // console.log("Role Insert Result:", roleeResult); check your roleeResult
                if (roleeResult.rows.length > 0) {
                    department_id = roleeResult.rows[0].id;
                    console.log(`New employee role "${trimmedDepart}" created with id: ${department_id}`);
                }
                else {
                    console.error('Insert did not return any rows.');
                    return;
                }
            }
            const finalValue = `em${department_id}`;
            const allQuery = `INSERT INTO employee_all (department_id, final) VALUES ($1, $2)`;
            const allValues = [department_id, finalValue];
            console.log('Inserting into employee_all with query:', allQuery, 'and values:', allValues);
            await pool.query(allQuery, allValues);
            console.log(`Employee department "${trimmedDepart}" added to the employee_all table with final value "${finalValue}".`);
        }
        catch (error) {
            console.error('Error inserting roll:', error);
        }
    }
}
const runEmploy = new employee();
runEmploy.start();
app.use((_req, res) => {
    res.status(404).end();
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
