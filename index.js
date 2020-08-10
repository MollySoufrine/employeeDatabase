const { prompt } = require("inquirer");
const db = require("./db");

// const { createNewEmployee } = require("./db");

require("console.table");

//Run the program
loadMainPrompts();

async function loadMainPrompts() {
  const { choice } = await prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        {
          name: "View all Employees",
          value: "VIEW_EMPLOYEES",
        },
        {
          name: "View all Employees by Department",
          value: "VIEW_EMPLOYEES_BY_DEPARTMENT",
        },
        {
          name: "View All Employess by Role",
          value: "VIEW_EMPLOYEES_BY_ROLE",
        },
        {
          name: "Add Employee",
          value: "CREATE_EMPLOYEE",
        },
        {
          name: "Add Department",
          value: "ADD_DEPARTMENT",
        },
        {
          name: "Add Role",
          value: "ADD_ROLE",
        },
        {
          name: "Remove Employee",
          value: "REMOVE_EMPLOYEE",
        },
        {
          name: "Update Employee Role",
          value: "UPDATE_EMPLOYEE_BY_ROLE",
        },
        {
          name: "Update Employee Manager",
          value: "UPDATE_EMPLOYEE_MANAGER",
        },
        {
          name: "Quit",
          value: "QUIT",
        },
      ],
    },
  ]);

  // Call the appropriate function depending on what the user chose
  switch (choice) {
    case "VIEW_EMPLOYEES":
      return viewEmployees();
    case "VIEW_EMPLOYEES_BY_DEPARTMENT":
      return viewDepartments();
    case "ADD_DEPARTMENT":
      return addDepartment();
    //..other functions
    case "VIEW_EMPLOYEES_BY_ROLE":
      return viewAllRoles();
    case "ADD_ROLE":
      return addRole();
    case "CREATE_EMPLOYEE":
      return createNewEmployee();
    case "UPDATE_EMPLOYEE_BY_ROLE":
      return updateEmployeeRole();
    default:
      return quit();
  }
}

async function viewEmployees() {
  const employee = await db.findAllEmployees();

  console.log("\n");
  console.table(employee);

  loadMainPrompts();
}

async function viewDepartments() {
  const departments = await db.findAllDepartments();
  console.log(departments);
  loadMainPrompts();
}

async function viewAllRoles() {
  const roles = await db.findAllRoles();

  console.log("\n");
  console.table(employees);

  loadMainPrompts();
}

async function createNewEmployee() {
  const findRoles = await db.findAllRoles();
  const findEmployees = await db.findAllEmployees();

  const newId = await prompt([
    {
      type: "input",
      name: "first_name",
      message: "First name?",
    },
    {
      type: "input",
      name: "last_name",
      message: "Last name?",
    },
  ]);
  const addEmployee = findRoles.map(({ id, name }) => ({
    name: name,
    value: id,
  }));
  const { newEmployeeRole } = await prompt([
    {
      type: "list",
      name: "newEmployeeRole",
      message: "Select new employees role",
      choices: addEmployee,
    },
  ]);
  newId.role_id = newEmployeeRole;
  const employeeManager = findEmployees.map(
    ({ id, first_name, last_name }) => ({
      value: id,
      name: `${first_name} ${last_name}`,
    })
  );
  const { newEmployeeManager } = await prompt([
    {
      type: "list",
      name: "employeeManager",
      message: "Select employees manager",
      choices: employeeManager,
    },
  ]);
  newId.manager_id = newEmployeeManager;
  const employees = await db.createNewEmployee(newId);

  console.log(
    `Added ${newId.first_name} ${newId.last_name} to the employee list`
  );

  loadMainPrompts();
}

async function updateEmployeeRole() {
  const findEmployees = await db.findAllEmployees();
  const findRoles = await db.findAllRoles();

  const employeeChoices = findEmployees.map(
    ({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    })
  );

  const { updatedRole } = await prompt([
    {
      type: "list",
      name: "updatedRole",
      message: "Select an employee to update",
      choices: employeeChoices,
    },
  ]);

  const roleChoices = findRoles.map(({ id, title }) => ({
    name: title,
    value: id,
  }));
  const { newRole } = await prompt([
    {
      type: "list",
      name: "newRole",
      message: "select new role",
      choices: roleChoices,
    },
  ]);

  await db.updateRole(updatedRole, newRole);

  console.log("Updated Employee");

  loadMainPrompts();
}

async function addDepartment() {
  const departmentId = await prompt([
    {
      type: "input",
      name: "departmentId",
      message: "Would you like to add a new Department?",
    },
  ]);
  await db.createDepartment(departmentId);
  loadMainPrompts();
}

async function addRole() {
  const roleId = await prompt([
    {
      type: "input",
      name: "roleId",
      message: "Would you like to add a new Department?",
    },
  ]);

  await db.createRole(roleId);
  loadMainPrompts();
}

function quit() {
  console.log("Goodbye!");
  process.exit();
}
