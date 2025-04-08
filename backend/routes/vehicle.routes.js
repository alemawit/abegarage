const express = require('express');
// Call the router method from express to create the router
const router = express.Router();
// Import the vehicle controller
const vehicleController = require('../controllers/vehicle.controller.js');
// Import the auth middleware
// import authMiddleware from '../middleware/authMiddleware.js';
// Create the routes for the vehicle
router.post('/api/vehicle',  vehicleController.createVehicle);
router.get('/api/vehicles',  vehicleController.getAllVehicles);
router.get('/api/vehicles/:customer_id', vehicleController.getVehiclesByCustomerId);
router.get('/api/vehicle/:id',  vehicleController.getVehicleById);
router.put('/api/vehicle/:id',  vehicleController.updateVehicle);
// Export the router
module.exports= router;