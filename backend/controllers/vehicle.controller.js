// Import the vehicle service
const vehicleService =require('../service/vehicle.service.js');

// Create the add vehicle controller
const createVehicle = async (req, res, next) => {
  try {
    // Check if vehicle already exists using its serial number
    const vehicleExists = await vehicleService.checkIfVehicleExists(req.body.vehicle_serial);
    if (vehicleExists) {
      return res.status(400).json({
        error: "This vehicle is already registered with the provided serial number!",
      });
    }

    // Create the vehicle
    const vehicleData = req.body;
    const createdVehicle = await vehicleService.createVehicle(vehicleData);

    if (!createdVehicle) {
      return res.status(400).json({
        error: "Failed to add the vehicle!",
      });
    }

    // Return success response
    return res.status(200).json({
      status: "success",
      vehicle: createdVehicle,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: "Something went wrong!",
    });
  }
};
// Create the get vehicles by customer ID controller
const getVehiclesByCustomerId = async (req, res, next) => {
  try {
    const customerId = req.params.customer_id;

    // Get the vehicles for the customer
    const vehicles = await vehicleService.getVehiclesByCustomerId(customerId);

    if (!vehicles || vehicles.length === 0) {
      return res.status(404).json({
        error: "No vehicles found for this customer!",
      });
    }

    return res.status(200).json({
      status: "success",
      data: vehicles,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: "Something went wrong!",
    });
  }
};
// Create the get all vehicles controller
const getAllVehicles = async (req, res, next) => {
  try {
    const vehicles = await vehicleService.getAllVehicles();

    if (!vehicles || vehicles.length === 0) {
      return res.status(404).json({
        error: "No vehicles found!",
      });
    }

    return res.status(200).json({
      status: "success",
      data: vehicles,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: "Something went wrong!",
    });
  }
};
// Create the get vehicle by ID controller
const getVehicleById = async (req, res, next) => {
  try {
    const vehicleId = req.params.id;

    // Get the vehicle by ID
    const vehicle = await vehicleService.getVehicleById(vehicleId);

    if (!vehicle || vehicle.length === 0) {
      return res.status(404).json({
        error: "Vehicle not found!",
      });
    }

    return res.status(200).json({
      status: "success",
      data: vehicle[0],
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: "Something went wrong!",
    });
  }
};
// Create the update vehicle controller
const updateVehicle = async (req, res, next) => {
  try {
    const vehicleId = req.params.id;
    const updatedVehicleData = {...req.body};

    // Check if the vehicle exists
    const vehicleExists = await vehicleService.getVehicleById(vehicleId);
    if (!vehicleExists || vehicleExists.length === 0) {
      return res.status(404).json({
        error: "Vehicle not found!",
      });
    }

    // Update the vehicle
    const updatedVehicle = await vehicleService.updateVehicle(vehicleId, updatedVehicleData);

    if (!updatedVehicle) {
      return res.status(400).json({
        error: "Failed to update the vehicle!",
      });
    }

    // Return success response
    return res.status(200).json({
      status: "success",
      vehicle: updatedVehicle,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: "Something went wrong!",
    });
  }
};
// Export the vehicle controller functions
const vehicleController = {
  createVehicle,
  getVehiclesByCustomerId,
  getAllVehicles,
  getVehicleById,
  updateVehicle, 
};

module.exports= vehicleController;