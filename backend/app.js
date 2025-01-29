// Import required modules
const express = require("express");
const cors = require("cors");
const pool = require("./dbconfig/db.config"); // Import the DB pool

//import the router
const router = require("./routes/index");

// Create a new express application
const app = express();


// Use cors middleware for handling cross-origin requests
app.use(cors());

// Use json middleware for handling JSON requests
app.use(express.json());
//add the router to the application as a middleware
app.use(router);

// Test database connection using the pool
pool.getConnection() // Get a connection from the pool
  .then((connection) => {
    console.log("Connected to the database successfully!");
    connection.release(); // Release the connection back to the pool
  })
  .catch((err) => {
    console.error("Database connection error:", err.message);
  });

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to Abe Garage");
});

// Start the server
const PORT = process.env.DB_PORT; // Use the server port from the .env file or default to 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

