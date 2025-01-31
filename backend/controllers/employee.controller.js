const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { pool } = require("../dbconfig/db.config");
//import the addEmployee service
const {
  addEmployee,
  getAllEmployeeService,
  getSingleEmployeeService,
  updateEmployeeService,
} = require("../service/employee.service");



dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Get all employees from the database
const getAllEmployee = async (req, res) => {
 try {
   //calling the service function
    const rows = await getAllEmployeeService(req, res);
    if(!rows){
      res.status(404).json({ message: "Employees not found" });
    }
    else{
      res.status(200).json({
       
        employees: rows,
      });
    }
    
   
 }
  catch (error) {
    res.status(500).json({ message: error.message });
  }


};

// Get a single employee by ID
const getSingleEmployee= async (req, res) => {
  try {
   //calling the service function
    const rows = await getSingleEmployeeService(req, res);
    if(!rows){
      res.status(404).json({ message: "Employee not found" });
    }
    else{
      res.status(200).json({
        employee: rows[0],
      });
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

//get all employees by email
const getEmployeeByEmail = async (req, res) => {
  try {
    // Call the service function
    const rows = await getEmployeeByEmailService(req.params.email);

    // Return the employees
    return res.status(200).json({
      employees: rows,
    });
  } catch (error) {
    // Handle any unexpected errors
    return res.status(500).json({ message: error.message });
  }
};

// Update an existing employee
const updateEmployee = async (req, res) => {
  try {
    // Call the service function
    const rows = await updateEmployeeService(req);

    if (!rows) {
      // If no rows were updated, return a 404 response
      return res.status(404).json({ message: "Employee not found" });
    }

    // Return the updated employee data
    return res.status(200).json({
      employee: rows[0],
    });
  } catch (error) {
    // Handle any unexpected errors
    return res.status(500).json({ message: error.message });
  }
};


// Export the functions

module.exports = {
  getAllEmployee,
  getSingleEmployee,
  addNewEmployee,
  updateEmployee,
  getEmployeeByEmail,
};

  
