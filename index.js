const { prompt } = require("inquirer");
const db = require("./db");
const { removeRole } = require("./db");

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
          name: "View all Departments",
          value: "VIEW_ALL_DEPARTMENT",
        },
        {
          name: "View All Employess by Role",
          value: "VIEW_EMPLOYEES_BY_ROLE",
        },
        {
          name: "View All Roles",
          value: "VIEW_ALL_ROLES",
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
          name: "Remove Role",
          value: "REMOVE_ROLE",
        },
        {
          name: "Remove Department",
          value: "REMOVE_DEPARTMENT",
        },
        {
          name: "Update Employee Role",
          value: "UPDATE_EMPLOYEE_BY_ROLE",
        },
        {
          name: "View all Managers",
          value: "VIEW_MANAGER",
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
      return viewEmployeeByDepartment();
    case "VIEW_ALL_DEPARTMENT":
      return viewDepartments();
    case "ADD_DEPARTMENT":
      return addDepartment();
    //..other functions
    case "VIEW_ALL_ROLES":
      return viewAllRoles();
    case "ADD_ROLE":
      return addRole();
    case "CREATE_EMPLOYEE":
      return createNewEmployee();
    case "UPDATE_EMPLOYEE_BY_ROLE":
      return updateEmployeeRole();
    case "VIEW_MANAGER":
      return viewManagers();
    case "REMOVE_EMPLOYEE":
      return removeThisEmployee();
    case "REMOVE_ROLE":
      return removeThisRole();
    case "REMOVE_DEPARTMENT":
      return removeThisDept();
    default:
      return quit();
  }
}

async function viewEmployees() {
  const employees = await db.findAllEmployees();

  console.log("\n");
  console.table(employees);

  loadMainPrompts();
}

async function viewDepartments() {
  const departments = await db.findAllDepartments();
  console.table(departments);
  loadMainPrompts();
}

async function viewAllRoles() {
  const roles = await db.findAllRoles();
  console.table(roles);

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
      message: "Would you like to add a new Role?",
    },
  ]);

  await db.createRole(roleId);
  loadMainPrompts();
}

async function viewManagers() {
  const managers = await db.findAllPossibleManagers();
  console.table(managers);

  loadMainPrompts();
}

async function removeThisRole() {
  const roles = await db.findAllRoles();

  const removeRoleChoices = roles.map(({ id, title }) => ({
    name: `${title}`,
    value: id,
  }));

  const { roleId } = await prompt([
    {
      type: "list",
      name: "roleId",
      message: "Which role would you like to remove?",
      choices: removeRoleChoices,
    },
  ]);

  await db.removeRole(roleId);
  loadMainPrompts();
}

async function removeThisDept() {
  const department = await db.findAllDepartments();

  const removeDepartmentChoices = department.map(({ id, name }) => ({
    name: `${name}`,
    value: id,
  }));

  const { departmentId } = await prompt([
    {
      type: "list",
      name: "departmentId",
      message: "Which role would you like to remove?",
      choices: removeDepartmentChoices,
    },
  ]);
  await db.removeDepartment(departmentId);
  loadMainPrompts();
}
async function removeThisEmployee() {
  const removeemployee = await db.removeEmployee();
  console.log(`This employee ${removeemployee} has been removed`);
}

function quit() {
  console.log("Goodbye!");
  process.exit();
}
