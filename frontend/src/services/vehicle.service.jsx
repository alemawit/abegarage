const api_url = import.meta.env.VITE_REACT_APP_URL;

// A function to create a new vehicle
const createVehicle = async (
  formVehicleData,
  loggedInEmployeeToken,
  customerId
) => {
  console.log("Creating vehicle with data:", formVehicleData);

  // Ensure customerId is not undefined
  if (!customerId) {
    throw new Error("Customer ID is missing");
  }

  try {
    const response = await fetch(
      `${api_url}/api/add-vehicle?customer_id=${customerId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${loggedInEmployeeToken}`, // Use Bearer token
        },
        body: JSON.stringify(formVehicleData),
      }
    );

    // Check if response is OK
    if (!response.ok) {
      const errorData = await response.text(); // Use text() for error responses
      console.error("Error response body:", errorData);
      try {
        const jsonErrorData = JSON.parse(errorData);
        throw new Error(jsonErrorData.error || "Failed to create vehicle");
      } catch (jsonError) {
        throw new Error("Failed to create vehicle, non-JSON response");
      }
    }

    const data = await response.json(); // Parse the successful response
    return data;
  } catch (error) {
    console.error("Error during vehicle creation:", error.message);
    throw error;
  }
};

const getVehicle = async (customer_id, loggedInEmployeeToken) => {
  try {
    const response = await fetch(
      `${api_url}/api/get-vehicle?customer_id=${customer_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${loggedInEmployeeToken}`, // Use Bearer token
        },
      }
    );

    const result = await response.text(); // Use text() first to inspect raw response

    if (!response.ok) {
      console.error("Error response:", result);
      // Try parsing if it's JSON, otherwise return an error message
      try {
        const jsonResult = JSON.parse(result);
        return {
          vehicles: [],
          error: jsonResult.message || "Failed to get vehicles",
        };
      } catch (jsonParseError) {
        return {
          vehicles: [],
          error: "Failed to get vehicles, non-JSON response",
        };
      }
    }

    // Successfully received data - parse it as JSON
    const jsonResponse = JSON.parse(result); // Parse raw text into JSON
    return jsonResponse.data || []; // Ensure we return an empty array if no data exists
  } catch (error) {
    console.error("Error fetching vehicles:", error.message);
    return []; // Return an empty array on network errors
  }
};

const vehicleService = {
  createVehicle,
  getVehicle,
};

export default vehicleService;
