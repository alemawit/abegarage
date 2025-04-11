// Import API URL from environment variables correctly
const api_url = import.meta.env.VITE_REACT_APP_URL;

// A function to send a POST request to create a new employee
const createEmployee = async (formData, loggedInEmployeeToken) => {
  try {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loggedInEmployeeToken}`, // Use Bearer token
      },
      body: JSON.stringify(formData),
    };
    console.log(api_url);
    const response = await fetch(`${api_url}/api/employee`, requestOptions);
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

// Function to get all employees
const getAllEmployees = async (token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Use Bearer token
    },
  };
  const response = await fetch(`${api_url}/api/employee`, requestOptions);
  return response;
};

// Function to get an employee by ID
const getEmployeeById = async (employee_id, token) => {
  try {
    const response = await fetch(`${api_url}/api/employee/${employee_id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Use Bearer token
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response:", errorText);
      throw new Error(`Failed to fetch employee: ${response.statusText}`);
    }

    const contentType = response.headers.get("Content-Type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Unexpected response format, expected JSON.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error while fetching employee:", error);
    throw error;
  }
};

// Function to update an employee
const updateEmployee = async (employee_id, employeeData, token) => {
  try {
    const response = await fetch(`${api_url}/api/employees/${employee_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Use Bearer token
      },
      body: JSON.stringify(employeeData),
    });
console.log(response);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({})); // Catch JSON parsing errors
      throw new Error(
        `Failed to update employee: ${errorData.message || response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error while updating employee:", error);
    throw error;
  }
};

// Function to delete an employee
const deleteEmployee = async (employee_id, token) => {
  try {
    const response = await fetch(`${api_url}/api/employees/${employee_id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`, // Use Bearer token
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
