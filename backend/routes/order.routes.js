import express from 'express';
// Call the router method from express to create the router
const router = express.Router();
// Import the order controller
import orderController from '../controllers/orderController.js';
// Import the auth middleware
// import authMiddleware from '../middleware/authMiddleware.js';
// Create the routes for the order
router.post('/create-order', orderController.createOrder);
router.get('/get-all-orders',  orderController.getAllOrders);
router.get('/get-order-by-id/:order_id',  orderController.getOrderById);
// Export the router
export default router;