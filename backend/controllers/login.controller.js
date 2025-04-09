// Import the login service
const loginService = require("../service/login.service");
// Import the jsonwebtoken module
const jwt = require("jsonwebtoken");

// Import the secret key from environment variables
const jwtSecret = process.env.JWT_SECRET;

// Handle employee login
const logIn = async (req, res, next) => {
  try {
    const { employee_email, employee_password } = req.body;

    // Call the logIn service method
    const employee = await loginService.logIn({
      employee_email,
      employee_password,
    });

    // If the login service returns a failure
    if (employee.status === "fail") {
      return res.status(403).json({
        status: employee.status,
        message: employee.message,
      });
    }

    // If successful, generate the JWT token
    const payload = {
      employee_id: employee.data.employee_id,
      employee_email: employee.data.employee_email,
      employee_role: employee.data.company_role_id,
      employee_first_name: employee.data.employee_first_name,
    };

    const token = jwt.sign(payload, jwtSecret, { expiresIn: "24h" });

    // Send the response with the token
    return res.status(200).json({
      status: "success",
      message: "Employee logged in successfully",
      data: {
        employee_token: token,
      },
    });
  } catch (error) {
    // In case of unexpected errors, log and send an internal error response
    console.error("Login Error:", error);
    return res.status(500).json({
      status: "fail",
      message: "Internal server error",
    });
  }
};

// Export the login function to be used in the route
module.exports = {
  logIn,
};
