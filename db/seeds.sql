INSERT INTO department (department_name)
VALUES ("Customer Service"),
       ("Sales"),
       ("Finance"),
       ("IT");

INSERT INTO roles (title, salary, department_id)
VALUES ("Front Desk Associate", 40000, 1),
       ("Salesperson", 50000, 2),
       ("Accountant", 60000, 3),
       ("Software Engineer", 70000, 4),
       ("Lead Service", 65000, 1),
       ("Lead Sales", 75000, 2),
       ("Lead Accountant", 85000, 3),
       ("Lead Developer", 95000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Avery", "Alfred", 21, 105),
       ("Sylvester", "Smith", 22, 106),
       ("Linda", "Lorey", 23, 107),
       ("Ron", "Rodriguez", 24, 8),
       ("Bailey", "Barnes", 25, 5),
       ("Mike", "Millers", 26, 6),
       ("Claire", "Cunningham", 27, 107),
       ("Sarah", "Sanders", 28, 108);
