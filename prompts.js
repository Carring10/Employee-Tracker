const inquirer = require("inquirer");
const fs = require("fs");
const db = require("./db");
const mysql = require("mysql2");

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
        break;
      }
      case "View all roles": {
        db.query("SELECT * FROM roles", (err, results) => {
          err ? console.log(err) : console.table(results);
        });
        break;
      }
      case "View all employees": {
        db.query("SELECT * FROM employee", (err, results) => {
          err ? console.log(err) : console.table(results);
        });
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
    }
  })
  .catch((err) => console.log(err));

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
          console.log(result);
          err ? console.log(err) : console.log("Department added successfully!");
        }
      );
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
        `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`,
        [data.role, data.salary, data.choices],
        function (err, result) {
          console.log(result);
          err ? console.log(err) : console.log("Role added successfully!");
        }
      );
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
        type: "input",
        message: "Role:",
        name: "role",
      },
      {
        type: "input",
        message: "Manager:",
        name: "manager",
      },
    ])
    .then((data) => {
      console.log(data.department);
      db.query(
        `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`,
        [data.firstName, data.lastName, data.role, data.manager],
        function (err, result) {
          console.log(result);
          err ? console.log(err) : console.log("Employee added successfully!");
        }
      );
    });
}

function updateEmployeeRole() {
  inquirer.prompt([
    {
      type: "rawlist",
      message: "Which employee's role would you like to update?",
      name: "employee",
      choices: ["Avery Alfred", "Sylvester Smith", "Linda Lorey", "Ron Rodriguez"],
    },
  ]);
}
