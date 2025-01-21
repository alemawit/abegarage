const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { pool } = require("../db");

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Get all employees with optional limit
app.get("/api/employees", async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const [rows] = await pool.query("SELECT * FROM employees LIMIT ?", [limit]);
    res.status(200).json({
      limit: limit,
      contacts: rows,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single employee by ID
app.get("/api/employee/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [rows] = await pool.query(
      "SELECT * FROM employees WHERE employee_id = ?",
      [id]
    );
    if (rows.length > 0) {
      res.status(200).json(rows[0]);
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new employee
app.post("/api/employee", async (req, res) => {
  try {
    const newEmployee = {
      ...req.body,
      added_date: new Date().toISOString().slice(0, 19).replace("T", " "), // Ensure added_date is in the correct format
    };
    const result = await pool.query("INSERT INTO employees SET ?", newEmployee);
    res.status(200).json({ success: "true", insertId: result[0].insertId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update an existing employee
app.put("/api/employee/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updateData = { ...req.body };
    const result = await pool.query(
      "UPDATE employees SET ? WHERE employee_id = ?",
      [updateData, id]
    );
    if (result[0].affectedRows > 0) {
      res.status(200).json({ success: "true" });
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
