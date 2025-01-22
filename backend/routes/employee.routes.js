
// Employ.js

import express from "express";
const bodyParser = require("body-parser");
const router = express.Router();

// Routes

// Get all employees
app.get("/api/employees",getAllEmployee);

// Get single employee by ID
app.get("/api/employee/:id",getSingleEmployee);
  
// Add new employee
app.post("/api/employee",addNewEmployee);

// Update employee by ID
app.put("/api/employee",updateEmployee); 
  
export default router;
