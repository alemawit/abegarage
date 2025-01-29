// Import required modules
const express = require("express");
const router = express.Router();

// Import controller functions
const {
  getAllEmployee,
  getSingleEmployee,
  addNewEmployee,
  updateEmployee,
} = require("../controllers/employee.controller");

// Define your routes
router.get("/api/employees", getAllEmployee); // Get all employees
router.get("/api/employees/:id", getSingleEmployee); // Get a single employee by ID
router.post("/api/employees", addNewEmployee); // Add new employee
router.put("/api/employees/:id", updateEmployee); // Update employee by ID

module.exports = router;
