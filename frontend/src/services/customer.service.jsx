// Import from the env
const api_url = import.meta.env.VITE_REACT_APP_URL;

// Function to create a new customer
const createCustomer = async (formData, token) => {
  try {
    console.log("Sending Data:", formData);

    const response = await fetch(`${api_url}/api/customer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Use Bearer token
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json(); // Parse the response body

    if (!response.ok) {
      throw new Error(data.message || "Failed to create customer");
    }

    console.log("Customer Created Successfully:", data);
    return data; // Return parsed response
  } catch (error) {
    console.error("Fetch request failed:", error);
    throw error;
  }
};

// Function to get all customers
const getAllCustomers = async (token) => {
  try {
    const response = await fetch(`${api_url}/api/customers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Use Bearer token
      },
    });

    // Log the response status and body
    console.log("Response Status:", response.status);
    const data = await response.json(); // Read the response body once

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch customers.");
    }

    return data.data; // Return the customer data directly
  } catch (error) {
    console.error("Fetch request failed:", error);
    throw error; // Re-throw the error to be handled in the calling function
  }
};

// Function to get a specific customer by ID
const getCustomerById = async (customerId, token) => {
  try {
    const response = await fetch(`${api_url}/api/customer/${customerId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Use Bearer token
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch customer with ID: ${customerId}`);
    }

    // Parse the response body and return the customer data
    const data = await response.json();
    return data; // Return the parsed customer data
  } catch (error) {
    console.error("Fetch request failed:", error);
    throw error; // Re-throw the error to be handled in the calling function
  }
};

// Function to search customers based on query (name, email, phone)
const customerSearch = async (searchQuery, token) => {
  try {
    const response = await fetch(
      `${api_url}/api/customers?search=${searchQuery}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Use Bearer token
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to search customers.");
    }

    const data = await response.json();
    return data; // Return the filtered customer data
  } catch (error) {
    console.error("Fetch request failed:", error);
    throw error; // Re-throw the error to be handled in the calling function
  }
};

// Function to update an existing customer
const updateCustomer = async (customerId, formData, token) => {
  try {
    const response = await fetch(`${api_url}/api/customer/${customerId}`, {
      method: "PUT", // Use PUT method for updating existing resources
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Use Bearer token
      },
      body: JSON.stringify(formData), // Send updated data in the request body
    });

    if (!response.ok) {
      throw new Error(`Failed to update customer with ID: ${customerId}`);
    }

    // Parse the response body (optional)
    const data = await response.json(); // If the server returns updated customer data
    return data; // Return the updated customer data
  } catch (error) {
    console.error("Fetch request failed:", error);
    throw error; // Re-throw the error to be handled in the calling function
  }
};

// Export functions
const customerService = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  customerSearch,
  updateCustomer,
};

export default customerService;
