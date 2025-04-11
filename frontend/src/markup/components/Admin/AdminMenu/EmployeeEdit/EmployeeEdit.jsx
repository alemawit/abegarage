import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Import useNavigate for v6
import employeeService from "../../../../../services/employee.service"; // Ensure this service has the proper API calls

// Ensure the API URL is defined using environment variables
const api_url = import.meta.env.VITE_REACT_APP_URL;

const EmployeeEdit = () => {
  const navigate = useNavigate();
  const { employee_id } = useParams(); // Get employee ID from URL
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        console.log("Fetching employee data...");
        const data = await employeeService.getEmployeeById(employee_id);
        console.log("Fetched employee data:", data.data);

        if (!data) {
          setError("Failed to fetch employee data.");
          return;
        }

        setEmployee(data.data);
      } catch (err) {
        console.error("Error while fetching employee:", err);
        if (err instanceof SyntaxError) {
          setError("Unexpected response format, expected JSON.");
        } else {
          setError("An error occurred while fetching employee data");
        }
      }
    };

    fetchEmployee();
  }, [employee_id]);

  const handleSave = async () => {
    try {
      const updatedEmployee = {
        employee_first_name: employee.employee_first_name,
        employee_last_name: employee.employee_last_name,
        employee_phone: employee.employee_phone,
        active_employee: parseInt(employee.active_employee, 10),
        company_role_id: employee.company_role_id,
      };

      console.log(
        "Sending data to:",
        `${api_url}/api/employees/${employee_id}`
      );
      console.log("Data being sent:", updatedEmployee);

      // Call the update function
      const response = await employeeService.updateEmployee(
        employee_id,
        updatedEmployee
      );

      // Check if response contains success message
      if (response && response.message === "Employee updated successfully!") {
        navigate("/admin/employees"); // Redirect if success message is found
      } else {
        setError(response.message || "Failed to save employee data");
      }
    } catch (err) {
      console.error("Error updating employee:", err);
      setError("Failed to update employee data: " + err.message);
    }
  };

  return (
    <div className="row clearfix">
      {error && <p style={{ color: "red" }}>{error}</p>}

      {employee ? (
        <div className="contact-form">
          {/* Display employee details first */}
          <h2>
            Edit :{employee.employee_first_name} {employee.employee_last_name}
          </h2>
          <p>
            <strong>Employee email :</strong> {employee.employee_email}
          </p>

          {/* Form to update employee */}
          <div>
            <input
              type="text"
              value={employee.employee_first_name}
              onChange={(e) =>
                setEmployee({
                  ...employee,
                  employee_first_name: e.target.value,
                })
              }
            />
          </div>
          <div>
            <input
              type="text"
              value={employee.employee_last_name}
              onChange={(e) =>
                setEmployee({
                  ...employee,
                  employee_last_name: e.target.value,
                })
              }
            />
          </div>
          <div>
            <input
              type="text"
              value={employee.employee_phone}
              onChange={(e) =>
                setEmployee({
                  ...employee,
                  employee_phone: e.target.value,
                })
              }
            />
          </div>
          <div>
            <select
              value={employee.active_employee}
              onChange={(e) =>
                setEmployee({
                  ...employee,
                  active_employee: e.target.value === "1" ? 1 : 0, // Convert to 0 or 1
                })
              }
            >
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
            </select>
          </div>
          <div>
            <select
              value={employee.company_role_id}
              onChange={(e) =>
                setEmployee({
                  ...employee,
                  company_role_id: parseInt(e.target.value, 10),
                })
              }
            >
              <option value={1}>Employee</option>
              <option value={2}>Manager</option>
              <option value={3}>Admin</option>
            </select>
          </div>
          <button
            onClick={handleSave}
            className="theme-btn btn-style-one"
            type="submit"
            style={{
              width: "auto",
              padding: "8px 16px",
              minWidth: "fit-content",
              display: "inline-block",
              textAlign: "center",
            }}
          >
            <span>UPDATE</span>
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EmployeeEdit;
