import express from 'express';
import { QueryResult } from 'pg';
import { pool, connectToDb } from './connection.js';
import inquirer from 'inquirer';
import { constants } from 'buffer';

await connectToDb();

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

class employee{

const start = () => {
inquirer
    .prompt([
        {
            type: 'list',
      message: 'What would you like to do?',
      name: 'manage',
      choices: ['View all employees', 'Add employees', 'View all roles', 'Update employees roles', 'add roles', 'View all department', 'add department', 'quit'],
        }
    ])
        .then(async(response) =>{
          // const { employee_name, employee_role } = response;
          // try {
          //   // Direct database insertion
          //   const sql = `INSERT INTO employees (name, role) VALUES ($1, $2)`;
          //   const params = [employee_name, employee_role];
  
          //   await pool.query(sql, params);
          //   console.log(`Employee ${employee_name} added to the database`);
          // } catch (err) {
          //   console.error('Error inserting into the database:', err.message);
          // }

          switch(response) {
            case 'View all employees':
              await this.viewAllEmployees();
              break;
            case 'Add employee':
              await this.addEmployees();
              break;
            case 'View all roles':
              await this.viewRoll();
              break;
            case ' Update employees roles':
              await this.updateRoll();
              break;
            case ' add roles':
              await this.addRoll();
              break;

            case ' View all department':
              await this.viewDepartment();
              break;
            case ' add department':
              await this.addDepartment();
              break;
            case 'quit':
              break;
           
          }
            this.start();

        })
        .catch((error) => {
          console.error('Error with Inquirer:', error);
        });
    }

    viewAllEmployees(): void{
      const sql = `
  SELECT 
    employee_all.id AS employee_id,
    employee_First.Efirst AS first_name,
    employee_Last.Elast AS last_name,
    employee_role.Erole AS role,
    employee_department.Edepartment AS department,
    employee_salary.Esalary AS salary
FROM 
    employee_all 
JOIN 
    employee_First ON employee_all.firstName_id = employee_First.id
JOIN 
    employee_Last ON employee_all.lastName_id = employee_Last.id
JOIN 
    employee_role ON employee_all.role_id = employee_role.id
JOIN 
    employee_department ON employee_all.department_id = employee_department.id
JOIN 
    employee_salary ON employee_all.salary_id = employee_salary.id;
  `;

  try {
    const result: QueryResult = await pool.query(sql);
    console.table(result.rows); // Display results in a table format
} catch (error) {
    console.error('Error fetching employees:', error);
}
    }
    async addEmployees(): Promise<void> {
      const employeeS = await inquirer.prompt([
          {
              type: 'input',
              message: 'Enter first name:',
              name: 'first_name',
          },
          {
              type: 'input',
              message: 'Enter last name:',
              name: 'last_name',
          },
        ]);


        const {first_name,last_name}= employeeS;

        const query = `INSERT INTO employee_all (firstName_id, lastName_id) VALUES ($1, $2)`;
        const values = [first_name, last_name];

        try {
          await pool.query(query, values);
          console.log(`Employee ${first_name} ${last_name} added to the database`);
      } catch (error) {
          console.error('Error inserting employee:', error);
      }

      }
    async viewRoll(): Promise<void>{
      
    }
    async updateRoll(): Promise<void>{
      
    }
    async addRoll(): Promise<void>{
      
    }
    async viewDepartment(): Promise<void>{
      
    }
    async addDepartment(): Promise<void>{
      
    }









  }











app.post('/api/new-movie', ({ body }, res) => {
    const sql = `INSERT INTO movies (movie_name)
      VALUES ($1)`;
    const params = [body.movie_name];
  
    pool.query(sql, params, (err, _result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: body,
      });
    });
  });


  // Default response for any other request (Not Found)
app.use((_req, res) => {
    res.status(404).end();
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}