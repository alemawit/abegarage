// Import the mysql2 module Promise Wrapper
const mysql = require("mysql2/promise");

// Prepare connection parameters to connect to the database
const dbConfig = {
  connectionLimit: 10,
  password: process.env.DB_PASS,
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
};

// Create the connection pool
const pool = mysql.createPool(dbConfig);

// Prepare a function that will execute the SQL queries asynchronously
async function query(sql, params) {
  try {
    // Execute the SQL query with parameters
    const [rows, fields] = await pool.execute(sql, params);
    console.log("Connection successful");
    return rows;
  } catch (error) {
    // Handle any errors that occur during the query
    console.error("Database query failed:", error.message);
    throw new Error("Database query failed");
  }
}

// Function to check the connection
async function testConnection() {
  try {
    // Run a simple query to test the connection
    const [rows] = await pool.execute("SELECT 1");
    console.log("Database connection is working:", rows);
  } catch (error) {
    console.error("Database connection failed:", error.message);
  }
}

// Call the testConnection function to verify the database connection
testConnection();

// Export the query function for use in the application
module.exports = { query };
