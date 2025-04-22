// Import the API base URL from the environment variables
const api_url = import.meta.env.VITE_REACT_APP_URL;

// ==============================
// CREATE ORDER
// ==============================
const createOrder = async (orderData, loggedInEmployeeToken) => {
  console.log("Creating order:", orderData);
  try {
    const response = await fetch(`${api_url}/api/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loggedInEmployeeToken}`, // Use Bearer token
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Create Order Error:", errorData.message);
      throw new Error(errorData.error || "Failed to create order");
    }

    return await response.json();
  } catch (error) {
    console.error("Error in createOrder:", error.message);
    throw error;
  }
};

// ==============================
// GET ALL ORDERS (Admin)
// ==============================
const getAllOrders = async (loggedInEmployeeToken) => {
  try {
    const response = await fetch(`${api_url}/api/orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loggedInEmployeeToken}`, // Use Bearer token
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Get All Orders Error:", errorData.message);
      throw new Error(errorData.error || "Failed to get orders");
    }

    return await response.json();
  } catch (error) {
    console.error("Error in getAllOrders:", error.message);
    return { orders: [] }; // Fallback to avoid frontend crash
  }
};

// ==============================
// GET CUSTOMER ORDERS
// ==============================
const getCustomerOrders = async (customer_id, loggedInEmployeeToken) => {
  try {
    const response = await fetch(`${api_url}/api/order/${customer_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loggedInEmployeeToken}`, // Use Bearer token
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Get Customer Orders Error:", errorData.message);
      throw new Error(errorData.error || "Failed to get customer orders");
    }

    return await response.json();
  } catch (error) {
    console.error("Error in getCustomerOrders:", error.message);
    throw error;
  }
};

// ==============================
// UPDATE ORDER
// ==============================
const updateOrder = async (orderData, loggedInEmployeeToken) => {
  try {
    const response = await fetch(`${api_url}/api/order/${orderData.order_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loggedInEmployeeToken}`, // Use Bearer token
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Update Order Error:", errorData.message);
      throw new Error(errorData.error || "Failed to update order");
    }

    return await response.json();
  } catch (error) {
    console.error("Error in updateOrder:", error.message);
    throw error;
  }
};

// ==============================
// TRACK ORDER (Public access)
// ==============================
const trackOrder = async (orderHash) => {
  try {
    const response = await fetch(
      `${api_url}/api/track-order/${orderHash.order_hash}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch order details");
    }

    return await response.json();
  } catch (error) {
    if (error.message.includes("No Order found")) {
      throw new Error("Order not found - please check your tracking code");
    }
    throw new Error(error.message || "Failed to connect to the server");
  }
};

// ==============================
// EXPORT SERVICE OBJECT
// ==============================
const orderService = {
  createOrder,
  getAllOrders,
  getCustomerOrders,
  updateOrder,
  trackOrder,
};

export default orderService;
