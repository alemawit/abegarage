//import order from order.service
const { createOrderService, getOrderByIdService, getAllOrdersService, deleteOrderService } = require('../service/order.service');

// Create a new order
const createOrder = async (req, res) => {
  try {
    console.log("Received Request Body:", req.body); // ✅ Debugging log

    const { customer_id, employee_id, order_status, order_data, vehicle_id } =
      req.body;

    // ✅ Validate input with detailed error messages
    if (!customer_id)
      return res.status(400).json({ error: "customer_id is required" });
    if (!employee_id)
      return res.status(400).json({ error: "employee_id is required" });
    if (!order_status)
      return res.status(400).json({ error: "order_status is required" });
    if (!vehicle_id)
      return res.status(400).json({ error: "vehicle_id is required" });
    if (!order_data || typeof order_data !== "object") {
      return res
        .status(400)
        .json({ error: "order_data must be a valid object" });
    }

    // You can also check if the `vehicle_id` exists in the database before proceeding
    // Example:
    // const vehicleExists = await checkVehicleExistence(vehicle_id);
    // if (!vehicleExists) {
    //   return res.status(400).json({ error: "vehicle_id does not exist in the database" });
    // }

    const order = await createOrderService(
      customer_id,
      employee_id,
      order_status,
      order_data,
      vehicle_id // Pass vehicle_id to the service function
    );

    return res.status(201).json(order);
  } catch (err) {
    console.error("Error creating order:", err); // ✅ Log the full error
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