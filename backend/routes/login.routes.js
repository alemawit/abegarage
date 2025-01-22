// Import the express module  
import express from 'express';
// Call the router method from express to create the router 
const router = express.Router();
// Import the login controller 
import logIn from "../controllers/loginController.js";
// Create a route to handle the login request on post
router.post("/api/employee/login", logIn);
// Export the router
export default router;