const mysql = require("mysql2/promise");
require("dotenv").config();

// Create a promise-based connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST, // Database host
  user: process.env.DB_USERNAME, // Database username
  password: process.env.DB_PASSWORD, // Database password
  database: process.env.DB_DATABASE, // Database name
  waitForConnections: true, // Wait if no connections are available
  connectionLimit: 10, // Limit the number of connections
  queueLimit: 0, // Unlimited queue
  multipleStatements: true, // Allow multiple statements
});

// Export the pool for use in other files
module.exports = pool;
