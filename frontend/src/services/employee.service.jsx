// Import API URL from environment variables correctly
const api_url = import.meta.env.VITE_REACT_APP_URL;
// Check if the API URL is defined
//console.log("API URL:", api_url);

// A function to send a POST request to create a new employee
const createEmployee = async (formData, loggedInEmployeeToken) => {
  try {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": loggedInEmployeeToken,
      },
      body: JSON.stringify(formData),
    };
console.log(api_url);
    const response = await fetch(`${api_url}/api/employee`, requestOptions);
// console.log(response);
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error("Not an admin!");
    }

    return response;
  } catch (error) {
    console.error("Fetch request failed:", error);
    throw error;
  }
};

// get all employees

const getAllEmployees = async (token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };
  const response = await fetch(`${api_url}/api/employee`, requestOptions);
  return response;
};

const getEmployeeById = async (employee_id, token) => {
  try {
    const response = await fetch(`${api_url}/api/employee/${employee_id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      // Log the response text if status is not OK
      const errorText = await response.text();
      console.error("Error response:", errorText); // Log the response body for debugging
      throw new Error(`Failed to fetch employee: ${response.statusText}`);
    }

    // Check the response content type (ensure it's JSON)
    const contentType = response.headers.get("Content-Type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Unexpected response format, expected JSON.");
    }

    // Parse and return the JSON response
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error while fetching employee:", error);
    throw error; // Rethrow to let the caller handle it
  }
};

const updateEmployee = async (employee_id, employeeData, token) => {
  try {
    const response = await fetch(`${api_url}/api/employees/${employee_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Ensure token is passed
      },
      body: JSON.stringify(employeeData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update employee: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error while updating employee:", error);
    throw error;
  }
};

const deleteEmployee = async (employee_id, token) => {
  try {
    const response = await fetch(`${api_url}/api/employees/${employee_id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    throw new Error("Failed to delete employee");
  }
};

// Export all the functions
const employeeService = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
export default employeeService;
