DROP DATABASE IF EXISTS employeetracker;

CREATE DATABASE employeetracker;

use employeetracker;

CREATE TABLE department (
id INT AUTO_INCREMENT NOT NULL,
PRIMARY KEY(id),
 name VARCHAR(30)
 );
 CREATE TABLE role (
id INT AUTO_INCREMENT NOT NULL,
PRIMARY KEY(id),
title VARCHAR (30),
salary DECIMAL(30.2),
department_id int,
CONSTRAINT department_id FOREIGN KEY(department_id) REFERENCES department(id)
);
 
CREATE TABLE employee(
id INT AUTO_INCREMENT NOT NULL,
PRIMARY KEY(id),
first_name VARCHAR (30) NOT NULL,
 last_name VARCHAR (30) NOT NULL,
 role_id int,
 manager_id int,
 CONSTRAINT role_id FOREIGN KEY(role_id) REFERENCES role(id)
 );
 
INSERT INTO department (name) VALUES("Sales"),("Sales"),("Engineering"),("Engineering"),("Finance"),("Legal"),("Legal"),("Engineering");
INSERT INTO role (title, salary, department_id) VALUES("Sales Lead","100000",1),("Sales Person","80000",2),("Lead Engineer","150000",3),("Software Engineer","120000",4),("Accountant","125000",5),("Legal Team Lead","250000",6),("Lawyer","190000",7),("Lead Engineer","150000",8);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES("John", "Doe",1,3), ("Mike", "Chan",2,1), ("Ashley","Rodriguez",3,null),("Kevin","Tupki",4,3),("Malia","Brown",5,null),("Sarah","Lourd",6,null),("Tom","Allen",7,6),("Christian","Eckenrode",8,3);


CONSTRAINT manager_id FOREIGN KEY(manager_id) REFERENCES employee(id)