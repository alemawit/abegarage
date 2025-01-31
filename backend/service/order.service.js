const pool = require("../config/pool.config");
const crypto = require("crypto");

// Generate order hash
const generateOrderHash = (customerId, employeeId, orderDate) => {
  const hashInput = `${customerId}${employeeId}${orderDate}`;
  return crypto.createHash("sha256").update(hashInput).digest("hex");
};

// Create a new order
const createOrderService = async (
  customer_id,
  employee_id,
  order_status,
  order_data
) => {
  const {
    order_total_price,
    order_estimated_completion_date,
    order_additional_requests,
    order_additional_requests_completed,
    service_id,
    service_completed,
  } = order_data;

  const order_date = new Date();
  const order_hash = generateOrderHash(customer_id, employee_id, order_date);

  // Write query to insert into orders table
  const query = `
    INSERT INTO orders (customer_id, employee_id, order_date, order_hash)
    VALUES (?, ?, ?, ?)
  `;

  const query2 = `
    INSERT INTO order_info (order_id, order_total_price, order_estimated_completion_date, order_additional_requests, order_additional_requests_completed)
    VALUES (?, ?, ?, ?, ?)
  `;

  const query3 = `
    INSERT INTO order_services (order_id, service_id, service_completed)
    VALUES (?, ?, ?)
  `;

  const query4 = `
    INSERT INTO order_status (order_id, order_status)
    VALUES (?, ?)
  `;

  try {
    // Start by inserting into the orders table
    const [result] = await pool.execute(query, [
      customer_id,
      employee_id,
      order_date,
      order_hash,
    ]);
    const order_id = result.insertId;

    // Insert into order_info table
    await pool.execute(query2, [
      order_id,
      order_total_price,
      order_estimated_completion_date,
      order_additional_requests,
      order_additional_requests_completed,
    ]);

    // Insert into order_services table
    if (service_id && service_completed !== undefined) {
      await pool.execute(query3, [order_id, service_id, service_completed]);
    }

    // Insert into order_status table
    await pool.execute(query4, [order_id, order_status]);

    return { order_id, order_hash };
  } catch (err) {
    console.error("Error creating order:", err);
    throw err;
  }
};

// Get all orders
const getAllOrdersService = async () => {
  const query = "SELECT * FROM orders";

  try {
    const [results] = await pool.execute(query);
    return results;
  } catch (err) {
    console.error("Error fetching orders:", err);
    throw err;
  }
};

// Get an order by ID
const getOrderByIdService = async (order_id) => {
  const query = "SELECT * FROM orders WHERE order_id = ?";

  try {
    const [results] = await pool.execute(query, [order_id]);
    if (results.length === 0) {
      throw new Error("Order not found");
    }
    return results[0];
  } catch (err) {
    console.error("Error fetching order by ID:", err);
    throw err;
  }
};

// Delete an order by ID
const deleteOrderService = async (order_id) => {
  const query = "DELETE FROM orders WHERE order_id = ?";

  try {
    const [result] = await pool.execute(query, [order_id]);
    if (result.affectedRows === 0) {
      throw new Error("Order not found");
    }
    return { message: "Order deleted successfully" };
  } catch (err) {
    console.error("Error deleting order:", err);
    throw err;
  }
};

module.exports = {
  createOrderService,
  getOrderByIdService,
  getAllOrdersService,
  deleteOrderService,
};
