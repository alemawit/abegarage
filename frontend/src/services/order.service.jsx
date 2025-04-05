// //Import the //Import from the env

// const api_url = import.meta.env.VITE_REACT_APP_URL;
// //Create a function to send and order create request
// const createOrder = async (orderData, loggedInEmployeeToken) => {
//   console.log(orderData);
//   try {
//     const response = await fetch(`${api_url}/api/order`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "x-access-token": loggedInEmployeeToken,
//       },
//       body: JSON.stringify(orderData),
//     });
//     if (!response.ok) {
//       const errorData = await response.json();
//       console.log(errorData.message);
//       throw new Error(errorData.error || "Failed to create order");
//     }
//     console.log(response);
//     return response.json();
//   } catch (error) {
//     console.error("Error:", error.message);
//     throw error;
//   }
// };

// const getAllOrders = async (loggedInEmployeeToken) => {
//   try {
//     console.log("Fetching orders with token:", loggedInEmployeeToken);
//     const response = await fetch(`${api_url}/api/orders`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         "x-access-token": loggedInEmployeeToken,
//       },
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       console.error("Error message:", errorData.message);
//       throw new Error(errorData.error || "Failed to get orders");
//     }

//     const data = await response.json();
//     console.log("API Response:", data); // Make sure the response structure is what you expect
//     return data; // Returning the data in a structured way
//   } catch (error) {
//     console.error("Error:", error.message);
//     // Return an empty array or a fallback structure in case of an error, to prevent crashes
//     return { orders: [] }; // or any fallback data structure
//   }
// };

// const getCustomerOrders = async (customer_id, loggedInEmployeeToken) => {
//   try {
//     const response = await fetch(`${api_url}/api/order/${customer_id}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         "x-access-token": loggedInEmployeeToken,
//       },
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       console.log(errorData.message);
//       throw new Error(errorData.error || "Failed to get orders");
//     }
//     console.log(response);
//     return response.json();
//   } catch (error) {
//     console.error("Error:", error.message);
//     throw error;
//   }
// };

// const updateOrder = async (orderData, loggedInEmployeeToken) => {
//   try {
//     const response = await fetch(`${api_url}/api/order/${orderData.order_id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         "x-access-token": loggedInEmployeeToken,
//       },
//       body: JSON.stringify(orderData),
//     });
//     if (!response.ok) {
//       const errorData = await response.json();
//       console.log(errorData.message);
//       throw new Error(errorData.error || "Failed to update order");
//     }
//     console.log(response);
//     return response.json();
//   } catch (error) {
//     console.error("Error:", error.message);
//     throw error;
//   }
// };

// const trackOrder = async (orderHash) => {
//   console.log(orderHash);
//   try {
//     const response = await fetch(
//       `${api_url}/api/track-order/${orderHash.order_hash}`,
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.message || "Failed to fetch order details");
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     if (error.message.includes("No Order found")) {
//       throw new Error("Order not found - please check your tracking code");
//     }
//     throw new Error(error.message || "Failed to connect to the server");
//   }
// };

// const orderService = {
//   createOrder,
//   getAllOrders,
//   getCustomerOrders,
//   updateOrder,
//   trackOrder,
// };
// //Export the orderService
// export default orderService;

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
        "x-access-token": loggedInEmployeeToken,
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
        "x-access-token": loggedInEmployeeToken,
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
        "x-access-token": loggedInEmployeeToken,
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
        "x-access-token": loggedInEmployeeToken,
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
