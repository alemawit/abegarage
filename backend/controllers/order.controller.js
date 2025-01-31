//import order from order.service
const { createOrderService, getOrderByIdService, getAllOrdersService, deleteOrderService } = require('../service/order.service');

// Create a new order
const createOrder = async (req, res) => {
  const { customer_id, employee_id, order_status } = req.body;

  // Validate input
  if (!customer_id || !employee_id || !order_status) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const order = await createOrderService(
      customer_id,
      employee_id,
      order_status
    );
    return res.status(201).json(order);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Get a specific order
const getOrderById = async (req, res) => {
  const { order_id } = req.params;

  try {
    const order = await getOrderByIdService(order_id);
    return res.status(200).json(order);
  } catch (err) {
    if (err.message === "Order not found") {
      return res.status(404).json({ error: err.message });
    }
    return res.status(500).json({ error: err.message });
  }
};

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await getAllOrdersService();
    return res.status(200).json(orders);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Delete an order
const deleteOrder = async (req, res) => {
  const { order_id } = req.params;

  try {
    const result = await deleteOrderService(order_id);
    return res.status(200).json(result);
  } catch (err) {
    if (err.message === "Order not found") {
      return res.status(404).json({ error: err.message });
    }
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {  createOrder, getOrderById, getAllOrders, deleteOrder };