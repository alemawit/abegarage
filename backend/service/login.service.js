const bcrypt = require("bcrypt");
const employeeService = require("../service/employee.service");

const logIn = async (employeeData) => {
  try {
    let returnData = {}; // Object to be returned
    const employee = await employeeService.getEmployeeByEmailService(
      employeeData.employee_email
    );

    if (employee.length === 0) {
      returnData = {
        status: "fail",
        message: "Employee does not exist",
      };
      return returnData;
    }

    console.log("Employee Password:", employeeData.employee_password); // Debug
    console.log(
      "Stored Hashed Password:",
      employee[0].employee_password
    ); // Debug

    // Ensure the password data exists
    if (
      !employeeData.employee_password ||
      !employee[0].employee_password
    ) {
      returnData = {
        status: "fail",
        message: "Missing password data",
      };
      return returnData;
    }

    const passwordMatch = await bcrypt.compare(
      employeeData.employee_password,
      employee[0].employee_password
    );
    console.log("Password Match:", passwordMatch); // Debug

    if (!passwordMatch) {
      returnData = {
        status: "fail",
        message: "Incorrect password",
      };
      return returnData;
    }

    returnData = {
      status: "success",
      data: employee[0],
    };
    return returnData;
  } catch (error) {
    console.log(error);
    return {
      status: "fail",
      message: "An error occurred during login",
    };
  }
};

module.exports = logIn;
