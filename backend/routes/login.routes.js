// Import the express module
const express = require("express");
// Create a new router instance
const router = express.Router();
// Import the login controller
const logInController = require("../controllers/login.controller");

// Define the login route
router.post("/api/employee/login", logInController.logIn);

// Export the router to be used in app.js
module.exports = router;
