const inquirer = require("inquirer");
const fs = require("fs");
const db = require("./db");
const mysql = require("mysql2");

function prompt() {
  inquirer
    .prompt([
      {
        type: "rawlist",
        message: "What would you like to do?",
        name: "choice",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update employee role",
        ],
      },
    ])
    .then((data) => {
      switch (data.choice) {
        case "View all departments": {
          db.query("SELECT * FROM department", (err, results) => {
            err ? console.log(err) : console.table(results);
          });
          prompt();
          break;
        }
        case "View all roles": {
          db.query("SELECT * FROM roles", (err, results) => {
            err ? console.log(err) : console.table(results);
          });
          prompt();
          break;
        }
        case "View all employees": {
          db.query(
            `
        SELECT * FROM employee`,
            (err, results) => {
              err ? console.log(err) : console.table(results);
            }
          );
          prompt();
          break;
        }
        case "Add a department": {
          addDepartment();
          break;
        }
        case "Add a role": {
          addRole();
          break;
        }
        case "Add an employee": {
          addEmployee();
          break;
        }
        case "Update employee role": {
          updateEmployeeRole();
          break;
        }
      }
    })
    .catch((err) => console.log(err));
}
prompt();
function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the department you'd like to add?",
        name: "department",
      },
    ])
    .then((data) => {
      console.log(data.department);
      db.query(
        `INSERT INTO department (department_name) VALUES (?)`,
        data.department,
        function (err, result) {
          err ? console.log(err) : console.log("Department added successfully!");
        }
      );
      prompt();
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the role you'd like to add?",
        name: "role",
      },
      {
        type: "input",
        message: "What is the salary of that role?",
        name: "salary",
      },
      {
        type: "rawlist",
        message: "What department does that role belong to?",
        name: "department",
        choices: ["Customer Service", "Sales", "Finance", "IT"],
      },
    ])
    .then((data) => {
      console.log(data.department);
      db.query(
        `SELECT * FROM department WHERE department_name = ?`,
        data.department,
        function (err, result) {
          err ? console.log(err) : console.log(result);
          db.query(
            `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`,
            [data.role, data.salary, result[0].id],
            function (err, result) {
              err ? console.log(err) : console.log("Role added successfully!");
            }
          );
        }
      );
      prompt();
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "First name:",
        name: "firstName",
      },
      {
        type: "input",
        message: "Last name:",
        name: "lastName",
      },
      {
        type: "rawlist",
        message: "Role:",
        name: "role",
        choices: [
          "Front Desk Associate",
          "Salesperson",
          "Accountant",
          "Software Engineer",
          "Lead Service",
          "Lead Sales",
          "Lead Accountant",
          "Lead Developer",
        ],
      },
      {
        type: "rawlist",
        message: "Who do they report to?",
        name: "manager",
        choices: ["Bailey Barnes", "Mike Millers", "Claire Cunningham", "Sarah Sanders"],
      },
    ])
    .then((data) => {
      db.query(
        `SELECT * FROM roles WHERE department_id = ?`,
        data.role,
        function (err, roleResult) {
          db.query(
            `SELECT * FROM employee WHERE manager_id = ?`,
            data.manager,
            function (err, managerResult) {
              db.query(
                `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`,
                [data.firstName, data.lastName, roleResult[0].id, managerResult[0].id],
                function (err, result) {
                  err ? console.log(err) : console.log("Employee added successfully!");
                }
              );
            }
          );
        }
      );
      prompt();
    });
}

function updateEmployeeRole() {
  inquirer
    .prompt([
      {
        type: "rawlist",
        message: "Which employee's role would you like to update?",
        name: "employee",
        choices: ["Avery Alfred", "Sylvester Smith", "Linda Lorey", "Ron Rodriguez"],
      },
      {
        type: "rawlist",
        message: "What is their new role?",
        name: "role",
        choices: [
          "Front Desk Associate",
          "Salesperson",
          "Accountant",
          "Software Engineer",
          "Lead Service",
          "Lead Sales",
          "Lead Accountant",
          "Lead Developer",
        ],
      },
    ])
    .then((data) => {
      const fullNameArr = data.employee.split(" ");
      const firstName = fullNameArr[0];
      const lastName = fullNameArr[1];
      console.log(fullNameArr);
      db.query(
        `SELECT * FROM employee WHERE first_name = ? AND last_name = ?`,
        [firstName, lastName],
        function (err, result) {
          console.log(result);
          db.query(`UPDATE employee SET role_id`);
          err ? console.log(err) : console.log("Employee updated successfully!");
        }
      );
      prompt();
    });
}
