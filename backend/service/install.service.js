// Import required modules
const express = require("express");
const conn = require("../dbconfig/db.config");
const fs = require("fs");

// Function to create database tables
async function install() {
  const queryfile = __dirname + "/sql/initial-queries.sql";
  console.log(queryfile);

  // Read the SQL file
  const lines = fs.readFileSync(queryfile, "utf-8").split("\n");

  // Temporary variables for query processing
  let queries = [];
  let templine = "";

  // Collect all complete queries from the file
  lines.forEach((line) => {
    if (!line.trim().startsWith("--") && line.trim() !== "") {
      templine += line.trim();
      if (line.trim().endsWith(";")) {
        queries.push(templine);
        templine = ""; // Reset for the next query
      }
    }
  });

  let finalMessage = {};

  try {
    // Execute each query sequentially
    for (let i = 0; i < queries.length; i++) {
      try {
        await conn.query(queries[i]);
        // console.log(`Query executed: ${queries[i]}`);
        console.log("table created");
      } catch (err) {
        console.error(`Error executing query: ${queries[i]} \n`, err.message);
        finalMessage.message = "Not all tables are created!";
      }
    }

    // Prepare the final message
    if (!finalMessage.message) {
      finalMessage.message = "All tables created successfully!";
      finalMessage.status = 200;
    } else {
      finalMessage.status = 500;
    }
  } catch (err) {
    console.error("Error during the installation process:", err.message);
    finalMessage.message = "An error occurred during installation.";
    finalMessage.status = 500;
  }

  // Return the final message
  return finalMessage;
}

// Export the install function
module.exports = { install };
