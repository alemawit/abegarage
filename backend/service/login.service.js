// Import the query function from the db.config.js file
const conn = require("../dbconfig/db.config");
// Import the bcrypt module for password comparison
const bcrypt = require("bcrypt");
// Import the employee service to get employee by email
const employeeService = require("./employee.service");

async function logIn(employeeData) {
  try {
    let returnData = {};

    // Fetch the employee data by email
    const employee = await employeeService.getEmployeeByEmail(
      employeeData.employee_email
    );

    // Ensure employee data exists
    if (!employee || employee.length === 0) {
      returnData = {
        status: "fail",
        message: "Employee does not exist",
      };
      console.error("Error: Employee does not exist.");
      return returnData;
    }

    // Ensure employee has the hashed password
    if (!employee[0] || !employee[0].employee_password_hashed) {
      return {
        status: "fail",
        message: "Invalid employee data (password missing)",
      };
    }

    // Compare the entered password with the stored hashed password
    const passwordMatch = await bcrypt.compare(
      employeeData.employee_password,
      employee[0].employee_password_hashed
    );

    if (!passwordMatch) {
      returnData = {
        status: "fail",
        message: "Incorrect password",
      };
      console.error("Error: Incorrect password");
      return returnData;
    }

    // If login is successful, return employee data
    returnData = {
      status: "success",
      data: employee[0], // Avoid sending sensitive information like passwords
    };
    return returnData;
  } catch (error) {
    console.error("Login Service Error:", error);
    return {
      status: "fail",
      message: "Internal server error",
    };
  }
}

// Export the login function to be used in the controller
module.exports = {
  logIn,
};
