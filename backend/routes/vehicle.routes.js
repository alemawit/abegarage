import express from 'express';
// Call the router method from express to create the router
const router = express.Router();
// Import the vehicle controller
import vehicleController from '../controllers/vehicleController.js';
// Import the auth middleware
// import authMiddleware from '../middleware/authMiddleware.js';
// Create the routes for the vehicle
router.post('/create-vehicle',  vehicleController.createVehicle);
router.get('/get-all-vehicles',  vehicleController.getAllVehicles);
router.get('/get-vehicles-by-customer-id/:customer_id', vehicleController.getVehiclesByCustomerId);
// Export the router
export default router;