const pool = require("../dbconfig/db.config");
const fs = require("fs");
const path = require("path");

// Path to the .sql file
const sqlFilePath = path.join(__dirname, "../dbconfig/mysql.sql");

// Function to execute the SQL file
const initializeDatabase = async () => {
  try {
    // Read the SQL file
    const sql = await fs.promises.readFile(sqlFilePath, "utf8");

    // Execute the SQL queries
    await pool.query(sql);
    console.log("Tables created successfully");
  } catch (err) {
    console.error("Error initializing the database:", err);
  }
};

// Call the function to initialize the database
initializeDatabase();
