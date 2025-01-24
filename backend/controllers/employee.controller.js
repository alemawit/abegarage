const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { pool } = require("../dbconfig/db.config");
//import the addEmployee service
const { addEmployee } = require("../service/employee.service");


dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Get all employees with optional limit
const getAllEmployee = async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const [rows] = await pool.query("SELECT * FROM employees LIMIT ?", [limit]);
    res.status(200).json({
      limit: limit,
      contacts: rows,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
}};

// Get a single employee by ID
const getSingleEmployee= async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [rows] = await pool.query(
      "SELECT * FROM employees WHERE employee_id = ?",
      [id]
    );
    if (rows.length > 0) {
      res.status(200).json(rows[0]);
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new employee
const addNewEmployee = async (req, res) => {
  try {
    console.log("Controller Request Body:", req.body); // Debugging log
     if (!req.body) {
       throw new Error(
         "Request body is missing. Ensure express.json() is enabled."
       );
     }
    // Call the service function
    await addEmployee(req, res);
  } catch (error) {
    console.error("Controller Error:", error.message);
    res.status(500).json({
      msg: "An unexpected error occurred in the controller",
    });
  }
};




// Update an existing employee
const updateEmployee= async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updateData = { ...req.body };
    const result = await pool.query(
      "UPDATE employees SET ? WHERE employee_id = ?",
      [updateData, id]
    );
    if (result[0].affectedRows > 0) {
      res.status(200).json({ success: "true" });
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  }
// Export the functions
const employeeController = {
  getAllEmployee,
  getSingleEmployee,
  addNewEmployee,
  updateEmployee,
};

module.exports = employeeController;

  
