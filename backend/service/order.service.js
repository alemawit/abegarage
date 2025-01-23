import db from "../dbconfig/db.config.js";
import crypto from "crypto";

// Generate order hash
const generateOrderHash = (customerId, employeeId, orderDate) => {
  const hashInput = `${customerId}${employeeId}${orderDate}`;
  return crypto.createHash("sha256").update(hashInput).digest("hex");
};

// Create a new order
const createOrderService = async (customer_id, employee_id, order_status) => {
  const order_date = new Date();
  const order_hash = generateOrderHash(customer_id, employee_id, order_date);

  const query = `
    INSERT INTO orders (customer_id, employee_id, order_date, order_hash, order_status)
    VALUES (?, ?, ?, ?, ?)
  `;

  return new Promise((resolve, reject) => {
    db.execute(
      query,
      [customer_id, employee_id, order_date, order_hash, order_status],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve({
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
};

// Get all orders
const getAllOrdersService = async () => {
  const query = "SELECT * FROM orders";

  return new Promise((resolve, reject) => {
    db.execute(query, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

// Get an order by ID
const getOrderByIdService = async (order_id) => {
  const query = "SELECT * FROM orders WHERE order_id = ?";

  return new Promise((resolve, reject) => {
    db.execute(query, [order_id], (err, results) => {
      if (err) {
        return reject(err);
      }
      if (results.length === 0) {
        return reject(new Error("Order not found"));
      }
      resolve(results[0]);
    });
  });
};

// Delete an order by ID
const deleteOrderService = async (order_id) => {
  const query = "DELETE FROM orders WHERE order_id = ?";

  return new Promise((resolve, reject) => {
    db.execute(query, [order_id], (err, result) => {
      if (err) {
        return reject(err);
      }
      if (result.affectedRows === 0) {
        return reject(new Error("Order not found"));
      }
      resolve({ message: "Order deleted successfully" });
    });
  });
};

export {
  createOrderService,
  getAllOrdersService,
  getOrderByIdService,
  deleteOrderService,
};
