const { pool } = require("../dbconfig/db.config");
const { StatusCodes } = require("http-status-codes");


// Function to get all employees with a limit
async function getAllEmployees(req, res) {
  const limit = parseInt(req.query.limit) || 10;
  try {
    const [rows] = await pool.query("SELECT * FROM employees LIMIT ?", [limit]);
    return res.status(StatusCodes.OK).json(rows);
  } catch (error) {
    console.error(error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "Something went wrong, try again later!",
    });
  }
}

// Function to get an employee by ID
async function getEmployeeById(req, res) {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(
      "SELECT * FROM employees WHERE employee_id = ?",
      [id]
    );
    if (rows.length > 0) {
      return res.status(StatusCodes.OK).json(rows[0]);
    } else {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Employee not found" });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "Something went wrong, try again later!",
    });
  }
}

// Function to add a new employee
async function addEmployee(req, res) {
  const { email} = req.body;

  // Validate required fields
//   if (!email) {
//     return res
//       .status(400) // Bad Request
//       .json({ msg: "Please provide employee email, name, and position" });
//   }

  const added_date = new Date().toISOString().slice(0, 19).replace("T", " ");

  try {
    // Execute parameterized query
    const [result] = await pool.query(
      "INSERT INTO employee (employee_email, employee_active_status, employee_added_date) VALUES (?, 1, ?)",
      [email, added_date]
    );

    // Send success response
    return res.status(200).json({
      msg: "Employee added successfully",
      id: result.insertId, // ID of the inserted record
    });
  } catch (error) {
    console.error("Error adding employee:", error.message);
    return res.status(500).json({
      msg: "An unexpected error occurred",
    });
  }
}


// Function to update an employee by ID
async function updateEmployee(req, res) {
  const { id } = req.params;
  const updateData = req.body;
  if (!id || !updateData.name || !updateData.position) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide employee ID, name, and position" });
  }

  try {
    const result = await pool.query(
      "UPDATE employees SET ? WHERE employee_id = ?",
      [updateData, id]
    );
    if (result[0].affectedRows > 0) {
      return res
        .status(StatusCodes.OK)
        .json({ msg: "Employee updated successfully" });
    } else {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Employee not found" });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "Something went wrong, try again later!",
    });
  }
}

// Function to delete an employee by ID
async function deleteEmployee(req, res) {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM employees WHERE employee_id = ?", [id]);
    return res
      .status(StatusCodes.OK)
      .json({ msg: "Employee deleted successfully" });
  } catch (error) {
    console.error(error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "Something went wrong, try again later!",
    });
  }
}

module.exports = {
  getAllEmployees,
  getEmployeeById,
  addEmployee,
  updateEmployee,
  deleteEmployee,
};
 


