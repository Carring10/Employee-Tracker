INSERT INTO department (id, department_name)
VALUES (1, "Customer Service"),
       (2, "Sales"),
       (3, "Finance"),
       (4, "IT");

INSERT INTO roles (id, title, salary, department_id)
VALUES (21, "Front Desk Associate", 40000, 1),
       (22, "Salesperson", 50000, 2),
       (23, "Accountant", 60000, 3),
       (24, "Software Engineer", 70000, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (101, "Avery", "Alfred", 21, 5),
       (102, "Sylvester", "Smith", 22, 6),
       (103, "Linda", "Lorey", 23, 7),
       (104, "Ron", "Rodriguez", 24, 8);
