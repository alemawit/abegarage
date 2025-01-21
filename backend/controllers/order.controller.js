const express = require("express");
const router = express.Router();

// GET all orders
router.get("/orders", (req, res) => {
  const { limit, sortby, completed } = req.query;
  let filteredOrders = orders;

  if (completed !== undefined) {
    filteredOrders = filteredOrders.filter(
      (order) => order.order_completed == completed
    );
  }

  if (sortby) {
    filteredOrders.sort((a, b) => new Date(a[sortby]) - new Date(b[sortby]));
  }

  if (limit) {
    filteredOrders = filteredOrders.slice(0, parseInt(limit));
  }

  res.status(200).json(filteredOrders);
});

// GET order by ID
router.get("/order/:id", (req, res) => {
  const orderId = parseInt(req.params.id);
  const order = orders.find((o) => o.order_id === orderId);
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404).json({ message: "Order not found" });
  }
});

// POST new order
router.post("/order", (req, res) => {
  const newOrder = req.body;
  newOrder.order_id = orders.length + 1;
  orders.push(newOrder);
  res.status(201).json({ success: "true" });
});

// PUT update order
router.put("/order", (req, res) => {
  const { order_id, ...updateData } = req.body;
  const orderIndex = orders.findIndex((o) => o.order_id === order_id);
  if (orderIndex !== -1) {
    orders[orderIndex] = { ...orders[orderIndex], ...updateData };
    res.status(200).json({ success: "true" });
  } else {
    res.status(404).json({ message: "Order not found" });
  }
});

module.exports = router;
