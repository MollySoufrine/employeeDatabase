DROP DATABASE IF EXISTS employeetracker;

CREATE DATABASE employeetracker;

use employeetracker;


CREATE TABLE employee(
id INT AUTO_INCREMENT NOT NULL,
PRIMARY KEY(id),
first_name VARCHAR (30) NOT NULL,
 last_name VARCHAR (30) NOT NULL,
 role_id int,
 manager_id int,
 FOREIGN KEY(role_id) REFERENCES role(id),
 FOREIGN KEY(manager_id) REFERENCES (id)
 );
 
CREATE TABLE role(
id INT AUTO_INCREMENT NOT NULL,
PRIMARY KEY(id),
title VARCHAR (30),
salary DECIMAL,
department_id int,
FOREIGN KEY(department_id) REFERENCES department(id)
);

 CREATE TABLE department (
id INT AUTO_INCREMENT NOT NULL,
PRIMARY KEY(id),
 name VARCHAR(30)
 );
 
 INSERT INTO employee(first_name, last_name) VALUES("John", "Doe"), ("Mike", "Chan"), ("Ashley","Rodriguez"),("Kevin","Tupki"),("Malia","Brown"),("Sarah","Lourd"),("Tom","Allen"),("Christian","Eckenrode");
INSERT INTO role (title, salary) VALUES("Sales Lead",100000),("Sales Person","80000"),("Lead Engineer","150000"),("Software Engineer","120000"),("Accountant","125000"),("Legal Team Lead","250000"),("Lawyer","190000"),("Lead Engineer","150000");
INSERT INTO department (name) VALUES("Sales"),("Sales"),("Engineering"),("Engineering"),("Finance"),("Legal"),("Legal"),("Engineering");
