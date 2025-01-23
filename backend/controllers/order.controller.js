const express = require("express");
const crypto = require("crypto");
const db = require("../dbconfig/db.config");
import { createOrderService, getAllOrdersService, getOrderByIdService, deleteOrderService } from "../service/order.service";

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
const deleteOrder = async(req, res) => {
  await deleteOrderService(order_id);
};

