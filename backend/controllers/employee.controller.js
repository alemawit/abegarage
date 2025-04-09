const employeeService = require("../service/employee.service");
const conn = require("../dbconfig/db.config"); // Ensure this is correct

// Create the add employee controller
async function createEmployee(req, res, next) {
  try {
    const {
      employee_email,
      employee_first_name,
      employee_last_name,
      employee_phone,
      active_employee,
      company_role_id,
      employee_password,
    } = req.body;

    // Validate input fields
    if (
      !employee_email ||
      !employee_first_name ||
      !employee_last_name ||
      !employee_phone ||
      !active_employee ||
      !company_role_id ||
      !employee_password
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if employee email already exists in the database
    const employeeExists = await employeeService.checkIfEmployeeExists(
      employee_email
    );
    if (employeeExists) {
      return res.status(400).json({
        error:
          "This email address is already associated with another employee!",
      });
    }

    // Create the employee
    const employeeData = {
      employee_email,
      employee_first_name,
      employee_last_name,
      employee_phone,
      active_employee,
      company_role_id,
      employee_password,
    };
    const employee = await employeeService.createEmployee(employeeData);

    if (!employee) {
      return res.status(400).json({
        error: "Failed to add the employee!",
      });
    }

    res.status(200).json({
      status: "true",
      message: "Employee created successfully!",
    });
  } catch (error) {
    console.error("Error creating employee:", error);
    res.status(500).json({
      error: "Something went wrong!",
    });
  }
}

// Create a getAllEmployees controller
async function getAllEmployees(req, res, next) {
  try {
    const employees = await employeeService.getAllEmployees();

    if (!employees || employees.length === 0) {
      return res.status(400).json({
        error: "No employees found!",
      });
    }

    res.status(200).json({
      status: "success",
      data: employees,
    });
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
}

// Get single employee by ID
async function getEmployeeById(req, res) {
  try {
    const employeeId = req.params.id;
    const employee = await employeeService.getEmployeeById(employeeId);

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.status(200).json({
      status: "success",
      data: employee,
    });
  } catch (error) {
    console.error("Error fetching employee:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// Update employee controller
async function updateEmployee(req, res) {
  try {
    const employee_id = req.params.employee_id;
    const updatedData = req.body;

    if (
      !updatedData.employee_first_name ||
      !updatedData.employee_last_name ||
      !updatedData.employee_phone
    ) {
      return res
        .status(400)
        .json({ error: "First name, last name, and phone are required" });
    }

    if (
      updatedData.active_employee !== undefined &&
      typeof updatedData.active_employee !== "boolean"
    ) {
      return res.status(400).json({ error: "Active status must be a boolean" });
    }

    const result = await employeeService.updateEmployee(
      employee_id,
      updatedData
    );

    if (result.success) {
      return res.status(200).json({ message: result.message });
    } else {
      return res.status(400).json({ error: result.message });
    }
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Delete employee controller
async function deleteEmployee(req, res) {
  try {
    const employee_id = req.params.employee_id;

    const employee = await employeeService.getEmployeeById(employee_id);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    const result = await employeeService.deleteEmployee(employee_id);

    if (result.success) {
      return res
        .status(200)
        .json({ message: "Employee deleted successfully!" });
    } else {
      return res
        .status(400)
        .json({ error: result.message || "Failed to delete the employee" });
    }
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Export the controllers
module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
