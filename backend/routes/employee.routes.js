
// Employ.js

//import express from "express";
const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
//import the employee controller
const {getAllEmployee,getSingleEmployee,addNewEmployee,updateEmployee} = require("../controllers/employee.controller");

// Routes

// Get all employees
router.get("/api/employee",getAllEmployee);

// Get single employee by ID
router.get("/api/employee/:id",getSingleEmployee);
  
// Add new employee
router.post("/api/employee",addNewEmployee);

// Update employee by ID
router.put("/api/employee",updateEmployee); 
  
//export the router
module.exports = router;