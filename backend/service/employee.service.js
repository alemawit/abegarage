const conn = require("../dbconfig/db.config");
const bcrypt = require("bcrypt");

// A function to get employee by email
async function getEmployeeByEmail(email) {
  const query = `
    SELECT * FROM employee
    INNER JOIN employee_info ON employee.employee_id = employee_info.employee_id
    INNER JOIN employee_role ON employee.employee_id = employee_role.employee_id
    INNER JOIN company_roles ON employee_role.company_role_id = company_roles.company_role_id
    LEFT JOIN employee_pass ON employee.employee_id = employee_pass.employee_id
    WHERE employee.employee_email = ?
  `;
  const rows = await conn.query(query, [email]);

  // Log the result for debugging purposes
  console.log("Employee data from DB:", rows);

  return rows;
}

// A function to check if employee exists in the database
async function checkIfEmployeeExists(email) {
  const query = "SELECT * FROM employee WHERE employee_email = ?";
  const rows = await conn.query(query, [email]);
  return rows.length > 0;
}

// A function to create a new employee
async function createEmployee(employee) {
  let createdEmployee = {};
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(employee.employee_password, salt);

    const query =
      "INSERT INTO employee (employee_email, active_employee) VALUES (?, ?)";
    const rows = await conn.query(query, [
      employee.employee_email,
      employee.active_employee,
    ]);

    if (rows.affectedRows !== 1) {
      throw new Error("Failed to insert employee data into the employee table");
    }

    const employee_id = rows.insertId;

    const query2 =
      "INSERT INTO employee_info (employee_id, employee_first_name, employee_last_name, employee_phone) VALUES (?, ?, ?, ?)";
    await conn.query(query2, [
      employee_id,
      employee.employee_first_name,
      employee.employee_last_name,
      employee.employee_phone,
    ]);

    const query3 =
      "INSERT INTO employee_pass (employee_id, employee_password_hashed) VALUES (?, ?)";
    await conn.query(query3, [employee_id, hashedPassword]);

    const query4 =
      "INSERT INTO employee_role (employee_id, company_role_id) VALUES (?, ?)";
    await conn.query(query4, [employee_id, employee.company_role_id]);

    createdEmployee = { employee_id: employee_id };
  } catch (err) {
    console.log(err);
    return false;
  }
  return createdEmployee;
}

// A function to get all employees
async function getAllEmployees() {
  const query = `
    SELECT * FROM employee
    INNER JOIN employee_info ON employee.employee_id = employee_info.employee_id
    INNER JOIN employee_role ON employee.employee_id = employee_role.employee_id
    INNER JOIN company_roles ON employee_role.company_role_id = company_roles.company_role_id
    ORDER BY employee.employee_id DESC LIMIT 10
  `;
  const rows = await conn.query(query);
  return rows;
}

// A function to get a single employee by ID
async function getEmployeeById(employee_id) {
  const query = `
    SELECT * FROM employee
    INNER JOIN employee_info ON employee.employee_id = employee_info.employee_id
    INNER JOIN employee_role ON employee.employee_id = employee_role.employee_id
    INNER JOIN company_roles ON employee_role.company_role_id = company_roles.company_role_id
    WHERE employee.employee_id = ?
  `;
  const rows = await conn.query(query, [employee_id]);

  if (rows.length === 0) {
    throw new Error("Employee not found");
  }

  return rows[0];
}

// Function to update employee details
async function updateEmployee(employee_id, updatedData) {
  try {
    const {
      employee_first_name,
      employee_last_name,
      employee_phone,
      active_employee,
      company_role_id,
    } = updatedData;

    if (
      !employee_first_name ||
      !employee_last_name ||
      !employee_phone ||
      active_employee === undefined ||
      !company_role_id
    ) {
      throw new Error("Missing required fields for update");
    }

    const sql1 = `
      UPDATE employee_info
      SET employee_first_name = ?, employee_last_name = ?, employee_phone = ?
      WHERE employee_id = ?
    `;
    await conn.query(sql1, [
      employee_first_name,
      employee_last_name,
      employee_phone,
      employee_id,
    ]);

    const sql2 = `
      UPDATE employee_role
      SET company_role_id = ?
      WHERE employee_id = ?
    `;
    await conn.query(sql2, [company_role_id, employee_id]);

    if (active_employee !== undefined) {
      const sql3 = `
        UPDATE employee
        SET active_employee = ?
        WHERE employee_id = ?
      `;
      await conn.query(sql3, [active_employee, employee_id]);
    }

    return { success: true, message: "Employee details updated successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, message: error.message };
  }
}

// Function to delete employee
async function deleteEmployee(employee_id) {
  try {
    const sql1 = "DELETE FROM employee_role WHERE employee_id = ?";
    await conn.query(sql1, [employee_id]);

    const sql2 = "DELETE FROM employee_pass WHERE employee_id = ?";
    await conn.query(sql2, [employee_id]);

    const sql3 = "DELETE FROM employee_info WHERE employee_id = ?";
    await conn.query(sql3, [employee_id]);

    const sql4 = "DELETE FROM employee WHERE employee_id = ?";
    await conn.query(sql4, [employee_id]);

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, message: error.message };
  }
}

// Export the service functions
module.exports = {
  checkIfEmployeeExists,
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  getEmployeeByEmail, // Ensure this function is available for login service
};
