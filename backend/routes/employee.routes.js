
// Employ.js

import express from "express";
const bodyParser = require("body-parser");
const router = express.Router();

// Routes

// Get all employees
app.get("/api/employees",Getallemployees);

// Get single employee by ID
app.get("/api/employee/:id",Getsingleemployee);
  
// Add new employee
app.post("/api/employee",Addnewemployee);

// Update employee by ID
app.put("/api/employee",Updateemployee); 
  
export default router;
