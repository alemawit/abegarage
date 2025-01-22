const express = require("express");
const mysql = require("mysql2");
const crypto = require("crypto");
const dbconfig = require("../dbconfig/db.config");



// Generate order hash
function generateOrderHash(customerId, employeeId, orderDate) {
  const hashInput = `${customerId}${employeeId}${orderDate}`;
  return crypto.createHash("sha256").update(hashInput).digest("hex");
}

// Create a new order
app.post("/orders", (req, res) => {
  const { customer_id, employee_id, order_status } = req.body;

  if (!customer_id || !employee_id || !order_status) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const order_date = new Date();
  const order_hash = generateOrderHash(customer_id, employee_id, order_date);

  const query = `
    INSERT INTO orders (customer_id, employee_id, order_date, order_hash, order_status)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.execute(
    query,
    [customer_id, employee_id, order_date, order_hash, order_status],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.status(201).json({
        order_id: result.insertId,
        customer_id,
        employee_id,
        order_date,
        order_hash,
        order_status,
      });
    }
  );
});

// Get a specific order
app.get("/orders/:order_id", (req, res) => {
  const { order_id } = req.params;

  const query = "SELECT * FROM orders WHERE order_id = ?";

  db.execute(query, [order_id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(results[0]);
  });
});

// Get all orders
app.get("/orders", (req, res) => {
  const query = "SELECT * FROM orders";

  db.execute(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json(results);
  });
});

// Delete an order
app.delete("/orders/:order_id", (req, res) => {
  const { order_id } = req.params;

  const query = "DELETE FROM orders WHERE order_id = ?";

  db.execute(query, [order_id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json({ message: "Order deleted successfully" });
  });
});

