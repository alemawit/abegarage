import React, { useState } from "react";
import "./AddCustomerForm.css";
import customerService from "../../../../services/customer.service";
import { useAuth } from "../../../../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function AddCustomerForm(props) {
  const [customer_email, setEmail] = useState("");
  const [customer_first_name, setFirstName] = useState("");
  const [customer_last_name, setLastName] = useState("");
  const [customer_phone, setPhoneNumber] = useState("");
  const [customer_password, setPassword] = useState("");
  const [active_customer, setActive_customer] = useState(1);
  const [customer_role_id, setCustomer_role_id] = useState(1); // Role: 1 for regular customer
  // Errors
  const [emailError, setEmailError] = useState("");
  const [firstNameRequired, setFirstNameRequired] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  const navigate = useNavigate();

  let loggedInCustomerToken = "";
  const { customer } = useAuth();
  if (customer && customer.customer_token) {
    loggedInCustomerToken = customer.customer_token;
  }

  const resetForm = () => {
    setEmail("");
    setFirstName("");
    setLastName("");
    setPhoneNumber("");
    setPassword("");
    setActive_customer(1);
    setCustomer_role_id(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError(""); // Clear any previous errors
    setSuccess(false); // Reset success state

    let valid = true;

    if (!customer_first_name) {
      setFirstNameRequired("First name is required");
      valid = false;
    } else {
      setFirstNameRequired("");
    }

    if (!customer_email) {
      setEmailError("Email is required");
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer_email)) {
      setEmailError("Invalid email format");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!customer_password || customer_password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!valid) return;

    const formData = {
      customer_email,
      customer_first_name,
      customer_last_name,
      customer_phone_number: customer_phone,
      active_customer_status: active_customer,
      customer_password,
      customer_role_id,
    };

    try {
      const response = await customerService.createCustomer(
        formData,
        loggedInCustomerToken
      );

      console.log("Final Response in Frontend:", response);

      if (response && response.status === "success") {
        setSuccess(true);
        resetForm();
        alert("Customer added successfully!");
        navigate("/admin/customers"); // ✅ Immediate navigation on success
      } else {
        throw new Error(response.message || "Unexpected response format");
      }
    } catch (error) {
      console.error("Error adding customer:", error);
      setServerError(error.message || "Failed to add customer");
    }
  };

  return (
    <section className="contact-section header-section2">
      <div className="auto-container header-container">
        <div className="contact-title header-contact-title">
          <h2>Add a new customer</h2>
        </div>
        <div className="row clearfix ">
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
                      placeholder="Customer email"
                      value={customer_email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {emailError && (
                      <div className="validation-error">{emailError}</div>
                    )}
                    <input
                      type="text"
                      placeholder="Customer first name"
                      value={customer_first_name}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    {firstNameRequired && (
                      <div className="validation-error">
                        {firstNameRequired}
                      </div>
                    )}
                    <input
                      type="text"
                      placeholder="Customer last name"
                      value={customer_last_name}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Customer phone"
                      value={customer_phone}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <input
                      type="password"
                      placeholder="Customer password"
                      value={customer_password}
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
                      <span>Add Customer</span>
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

export default AddCustomerForm;
