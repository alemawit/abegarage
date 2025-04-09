import React, { useState } from "react";
import "./AddEmployeeForm.css";
import employeeService from "../../../../services/employee.service";
import { useAuth } from "../../../../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function AddEmployeeForm(props) {
  const [employee_email, setEmail] = useState("");
  const [employee_first_name, setFirstName] = useState("");
  const [employee_last_name, setLastName] = useState("");
  const [employee_phone, setPhoneNumber] = useState("");
  const [employee_password, setPassword] = useState("");
  const [active_employee, setActive_employee] = useState(1);
  const [company_role_id, setCompany_role_id] = useState(1);
  // Errors
  const [emailError, setEmailError] = useState("");
  const [firstNameRequired, setFirstNameRequired] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  let loggedInEmployeeToken = "";
  const { employee } = useAuth();
  if (employee && employee.employee_token) {
    loggedInEmployeeToken = employee.employee_token;
  }

  const navigate = useNavigate();

  const resetForm = () => {
    setEmail("");
    setFirstName("");
    setLastName("");
    setPhoneNumber("");
    setPassword("");
    setActive_employee(1);
    setCompany_role_id(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;

    if (!employee_first_name) {
      setFirstNameRequired("First name is required");
      valid = false;
    } else {
      setFirstNameRequired("");
    }

    if (!employee_email) {
      setEmailError("Email is required");
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(employee_email)) {
      setEmailError("Invalid email format");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!employee_password || employee_password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!valid) return;

    const formData = {
      employee_email,
      employee_first_name,
      employee_last_name,
      employee_phone,
      employee_password,
      active_employee,
      company_role_id,
    };

    employeeService
      .createEmployee(formData, loggedInEmployeeToken)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add employee");
        }
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          setServerError(data.error);
        } else {
          setSuccess(true);
          resetForm();
          setTimeout(() => navigate("/admin/employees"), 2000);
        }
      })
      .catch((error) => setServerError(error.message || "An error occurred."));
  };

  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>Add a new employee</h2>
        </div>
        <div className="row clearfix">
          <div className="form-column col-lg-7">
            <div className="inner-column">
              <div className="contact-form">
                <form onSubmit={handleSubmit}>
                  <div className="row clearfix">
                    {serverError && (
                      <div className="validation-error">{serverError}</div>
                    )}
                    <input
                      type="email"
                      placeholder="Employee email"
                      value={employee_email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {emailError && (
                      <div className="validation-error">{emailError}</div>
                    )}
                    <input
                      type="text"
                      placeholder="Employee first name"
                      value={employee_first_name}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    {firstNameRequired && (
                      <div className="validation-error">
                        {firstNameRequired}
                      </div>
                    )}
                    <input
                      type="text"
                      placeholder="Employee last name"
                      value={employee_last_name}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Employee phone"
                      value={employee_phone}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <select
                      value={company_role_id}
                      onChange={(e) =>
                        setCompany_role_id(Number(e.target.value))
                      }
                    >
                      <option value="1">Employee</option>
                      <option value="2">Manager</option>
                      <option value="3">Admin</option>
                    </select>
                    <input
                      type="password"
                      placeholder="Employee password"
                      value={employee_password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {passwordError && (
                      <div className="validation-error">{passwordError}</div>
                    )}
                    <button
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
                      <span>Add Employee</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AddEmployeeForm;
