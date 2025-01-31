// Import the query function from the db.config.js file 
const pool = require ("../dbconfig/db.config.js");

// A function to check if a vehicle exists in the database based on the vehicle's serial
const checkIfVehicleExists = async (vehicle_serial_number) => {
  const query = "SELECT * FROM customer_vehicle_info WHERE vehicle_serial_number = ?";
  const [rows] = await pool.query(query, [vehicle_serial_number]);
  if (rows.length > 0) {
    return true;
  }
  return false;
}
// A function to create a new vehicle
// A function to create a new vehicle
const createVehicle = async (vehicle) => {
  let createdVehicle = null;
  try {
    // Ensure the customer exists
    const customerQuery =
      "SELECT customer_id FROM customer_identifier WHERE customer_id = ?";
    const [customers] = await pool.query(customerQuery, [vehicle.customer_id]);

    if (!customers[0]) {
      throw new Error("Customer not found, cannot insert vehicle");
    }

    // Insert vehicle information
    const query =
      "INSERT INTO customer_vehicle_info (customer_id, vehicle_year, vehicle_make, vehicle_model, vehicle_type, vehicle_mileage, vehicle_tag, vehicle_serial_number, vehicle_color) VALUES (?,?,?,?,?,?,?,?,?)";
    const [result] = await pool.query(query, [
      vehicle.customer_id,
      vehicle.vehicle_year,
      vehicle.vehicle_make,
      vehicle.vehicle_model,
      vehicle.vehicle_type,
      vehicle.vehicle_mileage,
      vehicle.vehicle_tag,
      vehicle.vehicle_serial_number,
      vehicle.vehicle_color,
    ]);

    // Construct the vehicle object to return
    createdVehicle = {
      vehicle_id: result.insertId,
      customer_id: vehicle.customer_id,
      vehicle_year: vehicle.vehicle_year,
      vehicle_make: vehicle.vehicle_make,
      vehicle_model: vehicle.vehicle_model,
      vehicle_type: vehicle.vehicle_type,
      vehicle_mileage: vehicle.vehicle_mileage,
      vehicle_tag: vehicle.vehicle_tag,
      vehicle_serial_number: vehicle.vehicle_serial_number,
      vehicle_color: vehicle.vehicle_color,
    };
  } catch (error) {
    console.error("Error inserting vehicle:", error.message);
  }
  return createdVehicle; // Returns the created vehicle object or null if error occurred
};


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
      SET customer_id = ?, vehicle_year = ?, vehicle_make = ?, vehicle_model = ?, vehicle_type = ?, vehicle_mileage = ?, vehicle_tag = ?, vehicle_serial_number = ?, vehicle_color = ? WHERE vehicle_id = ?
    `;
    const infoParams= [
      vehicle.customer_id,
      vehicle.vehicle_year,
      vehicle.vehicle_make,
      vehicle.vehicle_model,
      vehicle.vehicle_type,
      vehicle.vehicle_mileage,
      vehicle.vehicle_tag,
      vehicle.vehicle_serial_number,
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
        vehicle_serial_number: vehicle.vehicle_serial_number,
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