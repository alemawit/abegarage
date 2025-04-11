require("dotenv").config();
const jwt = require("jsonwebtoken");
const employeeService = require("../service/employee.service");

const verifyToken = async (req, res, next) => {
  const token = req.headers["authorization"];

  // Check if token is provided
  if (!token) {
    return res.status(403).json({
      status: "fail",
      message: "No token provided!",
    });
  }

  // Extract token without 'Bearer ' prefix
  const tokenWithoutBearer = token.startsWith("Bearer ")
    ? token.split(" ")[1].trim()
    : token.trim();

  console.log("Received token:", token);
  console.log("Token without 'Bearer':", tokenWithoutBearer);

  // Verify the token
  jwt.verify(
    tokenWithoutBearer,
    process.env.JWT_SECRET,
    async (err, decoded) => {
      if (err) {
        console.error("Token verification error:", err);
        return res.status(401).json({
          status: "fail",
          message: "Unauthorized!",
        });
      }

      console.log("Decoded token:", decoded);
      req.employee_email = decoded.employee_email; // Ensure this matches your token's payload
      next(); // Proceed to the next middleware/route
    }
  );
};

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

    // Ensure this matches your role ID for admin
    if (employee[0].company_role_id === 1) {
      return next(); // Proceed if the user is an admin
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

module.exports = {
  verifyToken,
  isAdmin,
};
