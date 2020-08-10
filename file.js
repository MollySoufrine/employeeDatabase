async function viewEmployeesByRole() {
  const roles = await db.findAllRoles();

  const roleChoices = roles.map(({ id, name }) => ({
    name: name,
    value: id,
  }));

  const { roleId } = await prompt([
    {
      type: "list",
      name: "roleId",
      message: "Which employee role would you like to search for?",
      choices: roleChoices,
    },
  ]);

  const employees = await db.findAllEmployeesByRole(roleId);

  console.log("\n");
  console.table(employees);

  loadMainPrompts();
}

async function createNewEmployee() {
  const newEmployee = await db.createNewEmployee();

  const createEmployee = newEmployee.map(({ id, name }) => ({
    name: name,
    value: id,
  }));

  const { newId } = await prompt([
    {
      type: "input",
      name: "newId",
      message: "Would you like to add a new employee?",
      choices: createEmployee,
    },
  ]);

  const employee = await db.findNewEmployee(newId);

  console.log("\n");
  console.table(employee);

  loadMainPrompts();
}

async function updateEmployeeRole() {
  const updateEmployeebyRole = await db.findEmployeeByRole();

  const updateEmployee = updateEmployeebyRole.map(({ id, name }) => ({
    name: name,
    value: id,
  }));

  const { roleId } = await prompt([
    {
      type: "list",
      name: "employeeroleId",
      message: "Would you like to search and update an employee by their role?",
      choices: updateEmployee,
    },
  ]);

  const employees = await db.findNewEmployee(roleId);

  console.log("\n");
  console.table(employees);

  loadMainPrompts();
}

async function updateEmployeeRole() {
  const updateEmployeebyRole = await db.findEmployeeByRole();

  const updateEmployee = updateEmployeebyRole.map(({ id, name }) => ({
    name: name,
    value: id,
  }));

  const { roleId } = await prompt([
    {
      type: "list",
      name: "employeeroleId",
      message: "Would you like to search and update an employee by their role?",
      choices: updateEmployee,
    },
  ]);

  const employees = await db.findNewEmployee(roleId);

  console.log("\n");
  console.table(employees);

  loadMainPrompts();
}

async function updateEmployeeManager() {
  const updateManager = await db.findEmployeeManager();

  const updateByManager = updateManager.map(({ id, name }) => ({
    name: name,
    value: id,
  }));

  const { managerId } = await prompt([
    {
      type: "list",
      name: "managerId",
      message: "Would you like to search and update manager?",
      choices: updateByManager,
    },
  ]);

  const managers = await db.findNewEmployee(managerId);

  console.log("\n");
  console.table(managers);

  loadMainPrompts();
}
