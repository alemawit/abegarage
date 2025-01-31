const  pool  = require("../dbconfig/db.config");
const { StatusCodes } = require("http-status-codes");
//import bcrypt
const bcrypt = require("bcrypt");

// function to get all employees
async function getAllEmployeeService(req, res) {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    //select all employee from the employee, employee_info and employee_pass table
    const [rows] = await pool.query(
      "SELECT employee.employee_id, employee.employee_email,employee_info.employee_first_name, employee_info.employee_last_name, employee_info.employee_phone, employee.employee_active_status, employee.employee_added_date  FROM employee INNER JOIN employee_info ON employee.employee_id = employee_info.employee_id LIMIT ?",
      [limit]
    );
    return rows;

  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
}
//function to get a single employee
async function getSingleEmployeeService(req, res) {
  try {
    // Get the employee ID from the URL
    const id = parseInt(req.params.id);
    //generate a unique id
    // if (isNaN(id)) {
    //   return res.status(400).json({ message: "Invalid employee ID" });
    // }
    //select a single employee from the employee, employee_info and employee_pass table
    const [rows] = await pool.query(
      "SELECT employee.employee_id, employee.employee_email,employee_info.employee_first_name, employee_info.employee_last_name, employee_info.employee_phone, employee.employee_active_status, employee.employee_added_date  FROM employee INNER JOIN employee_info ON employee.employee_id = employee_info.employee_id WHERE employee.employee_id = ?",
      [id]
    );
    return rows;

  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
}

// Function to add a new employee
async function addEmployee(req, res) {
  const {
    employee_email,
    employee_first_name,
    employee_last_name,
    employee_phone,
    employee_password,
  } = req.body;

  // Validate required fields
  if (
    !employee_email ||
    !employee_first_name ||
    !employee_last_name ||
    !employee_phone || !employee_password
  ) {
    return res.status(400).json({
      msg: "Please provide employee email, first name, last name, and phone number.",
    });
  }

  const added_date = new Date().toISOString().slice(0, 19).replace("T", " ");

  try {
    // Execute parameterized query using promise-based pool
    const [result] = await pool.query(
      "INSERT INTO employee (employee_email, employee_active_status, employee_added_date) VALUES (?, 1, ?)",
      [employee_email, added_date]
    );
    const employee_id = result.insertId; // Get the inserted employee ID

    // Insert into the employee_info table
    await pool.query(
      "INSERT INTO employee_info (employee_id, employee_first_name, employee_last_name, employee_phone) VALUES (?, ?, ?, ?)",
      [employee_id, employee_first_name, employee_last_name, employee_phone]
    );
    //hash the employee password
    const hashedPassword = await bcrypt.hash(employee_password, 10);
   

    // Insert into the employee_pass table
    await pool.query(
      "INSERT INTO employee_pass (employee_id, employee_password) VALUES (?, ?)",
      [employee_id, hashedPassword]
    );

    return res.status(201).json({
      msg: "Employee added successfully",
      employee_id: employee_id,
    });
  } catch (error) {
    console.error("Error adding employee:", error.message);
    return res.status(500).json({
      msg: "An unexpected error occurred while adding the employee.",
    });
  }
}
//function to get all employees by email
async function getEmployeeByEmailService(employee_email) {
  try {
    //select all email from the employee table and employee_pass from employee_pass table
    const [rows] = await pool.query(
      "SELECT employee.employee_id, employee.employee_email, employee_pass.employee_password FROM employee INNER JOIN employee_pass ON employee.employee_id = employee_pass.employee_id WHERE employee.employee_email = ?",
      [employee_email]
    );
    return rows;
    
}

catch (error) {
  console.error("Error getting employee by email:", error.message);
  return null;
}
}
//function to update an employee
async function updateEmployeeService(req) {
  try {
    const id = parseInt(req.params.id);
    if (!id) {
      throw new Error("Employee ID is required");
    }

    const updateData = { ...req.body };

    // Check if there's data to update
    if (Object.keys(updateData).length === 0) {
      throw new Error("No fields provided for update");
    }

    // Dynamically generate SET clause
    const fields = Object.keys(updateData)
      .map((key) => `${key} = ?`)
      .join(", ");
    const values = Object.values(updateData);

    // Add the ID to the values array for the WHERE clause
    values.push(id);

    // Perform the update query
    const [result] = await pool.query(
      //update the employee, employee_info and employee_pass table

      `UPDATE employee, employee_info, employee_pass
      SET ${fields}
      WHERE employee.employee_id = employee_info.employee_id
      AND employee.employee_id = employee_pass.employee_id
      AND employee.employee_id = ?`,
      values

    );

    if (result.affectedRows === 0) {
      // Return null if no rows were updated (employee not found)
      return null;
    }

    // Optionally fetch and return the updated employee details
    const [rows] = await pool.query(
      "SELECT * FROM employee WHERE employee_id = ?",
      [id]
    );

    return rows;
  } catch (error) {
    // Throw the error to be handled by the controller
    throw error;
  }
}



module.exports = {
  addEmployee,
  getAllEmployeeService,
  getSingleEmployeeService,
  updateEmployeeService,
  getEmployeeByEmailService,
};
