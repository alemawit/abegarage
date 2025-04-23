// Import the express module
const express = require("express");
// Import the dotenv module and call the config method to load the environment variables
require("dotenv").config();
// Import the sanitizer module
const sanitize = require("sanitize");
// Import the CORS module
const cors = require("cors");
// Set up the CORS options to allow requests from our front-end
// const corsOptions = {
//   origin: process.env.FRONTEND_URL, // Using FRONTEND_URL from .env
//   optionsSuccessStatus: 200,
// };
// CORS configuration
const allowedOrigins = [
  "http://localhost:5173", // Local dev
  process.env.FRONTEND_URL, // Deployed frontend (from environment variable)
];

const corsOptions = {
  origin: function (origin, callback) {
    console.log("CORS Origin:", origin);  // Log incoming origin for debugging
    if (!origin) return callback(null, true); // Allow no-origin requests (e.g., mobile apps)
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionSuccessStatus: 200,
};
console.log("Frontend URL:", process.env.FRONTEND_URL);
// Create a variable to hold our port number
const port = process.env.PORT; // Using PORT from .env
// Import the router
const router = require("./routes");
// Create the webserver
const app = express();
// Add the CORS middleware
app.use(cors(corsOptions));
// Add the express.json middleware to the application
app.use(express.json());
// Add the sanitizer to the express middleware
app.use(sanitize.middleware);
// Define a root route handler for `/`
app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});
// Add the routes to the application as middleware
app.use(router);
// Start the webserver
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
// Export the webserver for use in the application
module.exports = app;
