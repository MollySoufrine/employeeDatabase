const db = require("./db");





// extra functions

async function removethisRole() {
  const removebyRole = await db.removeRole();

  const removeR = removebyRole.map(({ id, role }) => ({
    role: role,
    value: id,
  }));
  const { roleId } = await prompt([
    {
      type: "list",
      name: "removeRole",
      message: "Which role would you like to remove?",
      choices: removeR,
    },
  ]);
  const removethisRole = await db.
}
