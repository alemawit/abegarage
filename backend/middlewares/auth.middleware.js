// Import the dotenv module
require("dotenv").config();
// Import the jsonwebtoken package
const jwt = require("jsonwebtoken");
const employeeService = require("../service/employee.service");

// A function to verify the token received from the frontend
const verifyToken = async (req, res, next) => {
  // Get the token from the Authorization header in the format "Bearer <token>"
  const token = req.headers["authorization"];

  // Check if the token is provided
  if (!token) {
    return res.status(403).json({
      status: "fail",
      message: "No token provided!",
    });
  }

  // Extract token after "Bearer" if present
  const tokenWithoutBearer = token.split(" ")[1];

  // Verify the token using the secret key from environment variables
  jwt.verify(
    tokenWithoutBearer,
    process.env.JWT_SECRET,
    async (err, decoded) => {
      // Check if the token is valid
      if (err) {
        return res.status(401).json({
          status: "fail",
          message: "Unauthorized!",
        });
      }

      // Set the decoded token to the request object
      req.employee_email = decoded.employee_email;
      next();
    }
  );
};

// A function to check if the user is an admin
const isAdmin = async (req, res, next) => {
  const employee_email = req.employee_email;

  try {
    const employee = await employeeService.getEmployeeByEmail(employee_email);

    // Check if employee exists
    if (!employee || employee.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "Employee not found!",
      });
    }

    // Check if the employee is an admin (assuming 3 is the role ID for admin)
    if (employee[0].company_role_id === 1) {
      return next();
    } else {
      return res.status(403).json({
        status: "fail",
        message: "Unauthorized! You do not have admin rights.",
      });
    }
  } catch (error) {
    console.error("Error fetching employee details:", error);
    return res.status(500).json({
      status: "fail",
      message: "Internal server error.",
    });
  }
};

// Export the verifyToken and isAdmin functions
const authMiddleware = {
  verifyToken,
  isAdmin,
};

module.exports = authMiddleware;
