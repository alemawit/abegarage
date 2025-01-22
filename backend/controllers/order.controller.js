const express = require("express");
const crypto = require("crypto");
const db = require("../dbconfig/db.config");

const app = express();
app.use(express.json());

// Generate order hash
function generateOrderHash(customerId, employeeId, orderDate) {
  const hashInput = `${customerId}${employeeId}${orderDate}`;
  return crypto.createHash("sha256").update(hashInput).digest("hex");
}

// Create a new order
const createOrder = async(req, res) => {
      await createOrderService(customer_id, employee_id, order_status);
  
};

// Get a specific order
const getOrderById = async(req, res) => {
  await getOrderByIdService(order_id);
};

// Get all orders
const getAllOrders = async(req, res) => {
  await getAllOrdersService();
};

// Delete an order
const deleteOrder = (req, res) => {
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
};

