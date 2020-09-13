const connection = require("./connection");
const listRoles = [];

class DB {
  // Keeping a reference to the connection on the class in case we need it later
  constructor(connection) {
    this.connection = connection;
  }

  // Find all employees, join with roles and departments to display their roles, salaries, departments, and managers
  findAllEmployees() {
    return this.connection.query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
    );
  }

  // Find all employees except the given employee id
  createManager(managerId) {
    //TODO: complete the function
    return this.connection.query(
      "SELECT employee_id FROM employee WHERE manager_id = NULL",
      managerId
    );
  }

  // Create a new employee
  createNewEmployee(employee) {
    return this.connection.query("INSERT INTO employee SET ? ", employee);
  }

  // Remove an employee with the given id
  removeEmployee(employeeId) {
    return this.connection.query(
      "DELETE FROM employee WHERE id  = ?",
      employeeId
    );
  }

  // Update the given employee's role
  updateRole(employeeId, roleId) {
    return this.connection.query(
      "UPDATE employee SET role_id = ? WHERE id = ?",
      [roleId, employeeId]
    );
  }

  // Update the given employee's manager
  updateManager(employeeId, managerId) {
    return this.connection.query(
      "UPDATE employee SET manager_id = ? WHERE id = ? ",
      [employeeId, managerId]
    );
  }

  // Find all roles, join with departments to display the department name
  findAllRoles() {
    return this.connection.query(
      "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
    );
  }

  // Create a new role

  createRole(answers) {
    return this.connection.query("INSERT INTO role SET ?", answers);
  }

  // Remove a role from the db
  removeRole(roleId) {
    return this.connection.query("DELETE FROM role WHERE id = ?", roleId);
  }

  // Find all departments, join with employees and roles and sum up utilized department budget
  findAllDepartments() {
    return this.connection.query(
      //LEFT JOIN department on department.id = role.department_id
      "SELECT department.name, department.id FROM department LEFT JOIN role on role.department_id = department.id ;"
    );
  }
  // Create a new department
  createDepartment(answers) {
    return this.connection.query("INSERT INTO department SET ?", answers);
  }
  // Remove a department
  removeDepartment(departmentId) {
    return this.connection.query(
      "DELETE FROM department WHERE id = ?",
      departmentId
    );
  }
  // Find all employees in a given department, join with roles to display role titles
  findAllEmployeesByDepartment(departmentId) {
    return this.connection.query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id WHERE department.id = ?",
      departmentId
    );
  }

  // Find all employees by manager, join with departments and roles to display titles and department names
}

module.exports = new DB(connection);
