// Import the query function from the db.config.js file 
const pool = require ("../dbconfig/db.config.js");

// A function to check if a vehicle exists in the database based on the vehicle's serial
const checkIfVehicleExists = async (vehicle_serial) => {
  const query = "SELECT * FROM customer_vehicle_info WHERE vehicle_serial = ?";
  const [rows] = await pool.query(query, [vehicle_serial]);
  if (rows.length > 0) {
    return true;
  }
  return false;
}
// A function to create a new vehicle
const createVehicle = async (vehicle) => {
  let createdVehicle = {};
  try {
    const query = "INSERT INTO customer_vehicle_info (customer_id, vehicle_year, vehicle_make, vehicle_model, vehicle_type, vehicle_mileage, vehicle_tag, vehicle_serial, vehicle_color) VALUES (?,?,?,?,?,?,?,?,?)";
    const rows = await pool.query(query, [
      vehicle.customer_id,
      vehicle.vehicle_year,
      vehicle.vehicle_make,
      vehicle.vehicle_model,
      vehicle.vehicle_type,
      vehicle.vehicle_mileage,
      vehicle.vehicle_tag,
      vehicle.vehicle_serial,
      vehicle.vehicle_color,
    ]);
    
    createdVehicle = {
      vehicle_id: rows.insertId,
      customer_id: vehicle.customer_id,
      vehicle_year: vehicle.vehicle_year,
      vehicle_make: vehicle.vehicle_make,
      vehicle_model: vehicle.vehicle_model,
      vehicle_type: vehicle.vehicle_type,
      vehicle_mileage: vehicle.vehicle_mileage,
      vehicle_tag: vehicle.vehicle_tag,
      vehicle_serial: vehicle.vehicle_serial,
      vehicle_color: vehicle.vehicle_color,
    };
  } catch (error) {
    console.log(error);
  }
  return createdVehicle;
}
// A function to get all vehicles for a specific customer
const getVehiclesByCustomerId = async (customer_id) => {
  const query = "SELECT * FROM customer_vehicle_info WHERE customer_id = ?";
  const [rows] = await pool.query(query, [customer_id]);
  return rows;
}
// A function to get all vehicles
const getAllVehicles = async () => {
  const query = "SELECT * FROM customer_vehicle_info ORDER BY vehicle_id DESC";
  const [rows] = await pool.query(query);
  return rows;
}
// A function to get vehicle by vehicle_id
const getVehicleById = async (vehicle_id) => {
  const query = "SELECT * FROM customer_vehicle_info WHERE vehicle_id = ?";
  const [rows] = await pool.query(query, [vehicle_id]);
  return rows;
}
// A function to update an existing vehicle's information
const updateVehicle = async (vehicle_id, vehicle) => {
  // let updatedVehicle = {};
  try {
    const query = `
      UPDATE customer_vehicle_info 
      SET customer_id = ?, vehicle_year = ?, vehicle_make = ?, vehicle_model = ?, vehicle_type = ?, vehicle_mileage = ?, vehicle_tag = ?, vehicle_serial = ?, vehicle_color = ? WHERE vehicle_id = ?
    `;
    const infoParams= [
      vehicle.customer_id,
      vehicle.vehicle_year,
      vehicle.vehicle_make,
      vehicle.vehicle_model,
      vehicle.vehicle_type,
      vehicle.vehicle_mileage,
      vehicle.vehicle_tag,
      vehicle.vehicle_serial,
      vehicle.vehicle_color,
      vehicle_id
    ];
    await pool.query(query, infoParams);
      return  {
        vehicle_id,
        customer_id: vehicle.customer_id,
        vehicle_year: vehicle.vehicle_year,
        vehicle_make: vehicle.vehicle_make,
        vehicle_model: vehicle.vehicle_model,
        vehicle_type: vehicle.vehicle_type,
        vehicle_mileage: vehicle.vehicle_mileage,
        vehicle_tag: vehicle.vehicle_tag,
        vehicle_serial: vehicle.vehicle_serial,
        vehicle_color: vehicle.vehicle_color,
      };
   
  } catch (error) {
    console.log(error);
  }
  
}
// Export the functions
const vehicleService = {
  checkIfVehicleExists,
  createVehicle,
  getVehiclesByCustomerId,
  getAllVehicles,
  getVehicleById,
  updateVehicle, 
};

module.exports=  vehicleService;