// Import from the env
const api_url = import.meta.env.VITE_REACT_APP_URL;

// Create a function to send a service create request
const createService = async (formServiceData, loggedInEmployeeToken) => {
  console.log(formServiceData.service_price);
  console.log(loggedInEmployeeToken);
  try {
    const response = await fetch(`${api_url}/api/service`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loggedInEmployeeToken}`, // Use Bearer token
      },
      body: JSON.stringify(formServiceData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData.message);
      throw new Error(errorData.error || "Failed to create service");
    }
    return response.json();
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};

// Function to get all services
const getAllServices = async (loggedInEmployeeToken) => {
  try {
    const response = await fetch(`${api_url}/api/service`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loggedInEmployeeToken}`, // Use Bearer token
      },
    });

    // Check if the response status is OK
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch services");
    }

    // Parse the response data
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching services: ${error.message}`);
    return {
      success: false,
      message: error.message,
    };
  }
};

// Function to update a service
const updateService = async (serviceData, loggedEmployeeToken) => {
  try {
    const response = await fetch(
      `${api_url}/api/service/${serviceData.service_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${loggedEmployeeToken}`, // Use Bearer token
        },
        body: JSON.stringify(serviceData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to update service");
    }

    return response.json();
  } catch (error) {
    console.error("Error updating service:", error.message);
    throw error;
  }
};

// Exports the service
const serviceService = {
  createService,
  getAllServices,
  updateService,
};

export default serviceService;
