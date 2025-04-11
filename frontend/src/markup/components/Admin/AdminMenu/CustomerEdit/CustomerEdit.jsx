import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Import useNavigate for v6
import customerService from "../../../../../services/customer.service"; // Ensure this service has the proper API calls

// Ensure the API URL is defined using environment variables
const api_url = import.meta.env.VITE_REACT_APP_URL;

const CustomerEdit = () => {
  const navigate = useNavigate();
  const { customer_id } = useParams(); // Get customer ID from URL
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        console.log("Fetching customer data...");
        const data = await customerService.getCustomerById(customer_id);
        console.log("Fetched customer data:", data);

        if (!data || !data.data) {
          setError("Failed to fetch customer data.");
          return;
        }

        setCustomer(data.data); // Make sure to set data.data
        console.log("Customer data set:", data.data);
      } catch (err) {
        console.error("Error while fetching customer:", err);
        if (err instanceof SyntaxError) {
          setError("Unexpected response format, expected JSON.");
        } else {
          setError("An error occurred while fetching customer data");
        }
      }
    };

    fetchCustomer();
  }, [customer_id]);

  const handleSave = async () => {
    try {
      const updatedCustomer = {
        customer_first_name: customer.customer_first_name,
        customer_last_name: customer.customer_last_name,
        customer_phone_number: customer.customer_phone_number,
        active_customer_status: customer.active_customer_status ? 1 : 0,
      };

      console.log(
        "Sending data to:",
        `${api_url}/api/customers/${customer_id}`
      );
      console.log("Data being sent:", updatedCustomer);

      const response = await customerService.updateCustomer(
        customer_id,
        updatedCustomer
      );

      console.log("Response:", response);

      if (response.status === "success") {
        console.log("Customer updated successfully, navigating...");
        navigate("/admin/customers"); // Navigate after successful update
      } else {
        setError(
          `Failed to save customer data: ${response.message || "Unknown error"}`
        );
      }
    } catch (err) {
      console.error("Error updating customer:", err);
      setError("Failed to update customer data: " + err.message);
    }
  };

  return (
    <div className="row clearfix">
      {error && <p style={{ color: "red" }}>{error}</p>}

      {customer ? (
        <div className="contact-form">
          <h2 style={{ color: "#08194a", fontWeight: "bold" }}>
            Edit : {customer.customer_first_name} {customer.customer_last_name}{" "}
            <span style={{ color: "#9e2631" }}>____</span>
          </h2>
          <br />
          <p>
            <strong>Customer email:</strong> {customer.customer_email}
          </p>

          <div>
            <input
              type="text"
              value={customer.customer_first_name}
              onChange={(e) =>
                setCustomer({
                  ...customer,
                  customer_first_name: e.target.value,
                })
              }
              placeholder="Enter first name"
            />
          </div>
          <div>
            <input
              type="text"
              value={customer.customer_last_name}
              onChange={(e) =>
                setCustomer({
                  ...customer,
                  customer_last_name: e.target.value,
                })
              }
              placeholder="Enter last name"
            />
          </div>
          <div>
            <input
              type="text"
              value={customer.customer_phone_number}
              onChange={(e) =>
                setCustomer({
                  ...customer,
                  customer_phone_number: e.target.value,
                })
              }
              placeholder="Enter phone number"
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <input
              style={{ width: "20px" }}
              type="checkbox"
              checked={customer.active_customer_status === 1}
              onChange={(e) =>
                setCustomer({
                  ...customer,
                  active_customer_status: e.target.checked ? 1 : 0,
                })
              }
            />
            <span>Is active customer</span>
          </div>
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
            onClick={handleSave}
          >
            <span>Update</span>
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CustomerEdit;
