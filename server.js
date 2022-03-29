const express = require("express");
const mysql = require("mysql2");
const table = require("console.table");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "IceCreAm88721!",
    database: "employee_db",
  },
  console.log(`Connected to the employee_db database.`)
);

db.query("SELECT * FROM department", (err, results) => {
  err ? console.log(err) : console.log(results);
});

db.query("SELECT * FROM roles", (err, results) => {
  err ? console.log(err) : console.log(results);
});

db.query("SELECT * FROM employee", (err, results) => {
  err ? console.log(err) : console.log(results);
});
