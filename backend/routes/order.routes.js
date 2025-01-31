const express = require('express');
// Call the router method from express to create the router
const router = express.Router();
// Import the order controller
const orderController = require('../controllers/order.controller');
// Import the auth middleware
// import authMiddleware from '../middleware/authMiddleware.js';
// Create the routes for the order
router.post('/api/create-order', orderController.createOrder);
router.get('/api/get-all-orders',  orderController.getAllOrders);
router.get('/api/get-order-by-id/:order_id',  orderController.getOrderById);
// Export the router
module.exports= router;