// Import mysql2 module
const mysql = require("mysql2");
// Import dotenv module to read .env file
require("dotenv").config();

// Create a pool to connect to the database
const pool = mysql.createPool({
  host: process.env.DB_HOST, // DB host (localhost or an IP address)
  user: process.env.DB_USERNAME, // DB username
  password: process.env.DB_PASSWORD, // DB password
  database: process.env.DB_DATABASE, // DB name
  waitForConnections: true, // Allows the pool to wait for a connection if all are busy
  connectionLimit: 10, // Max number of connections in the pool
  queueLimit: 0, // Unlimited queue of requests
  multipleStatements: true, // Enable multiple statements
});

// Export a promise-based pool
module.exports = pool.promise();
