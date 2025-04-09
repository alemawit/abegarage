import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCar,
  faShoppingCart,
  faUser,
  faEdit,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import vehicleService from "../../../../services/vehicle.service";
import orderService from "../../../../services/order.service";
import { useNavigate, useLocation } from "react-router";
import { useAuth } from "../../../../Contexts/AuthContext";
import OrdersComponent from "../../Admin/NewOrders/NewOrders";

function CustomerDetailComponent() {
  const [showVehicleForm, setShowVehicleForm] = useState(false);
  const [vehicle_year, setVehicleYear] = useState("");
  const [vehicle_make, setVehicleMake] = useState("");
  const [vehicle_model, setVehicleModel] = useState("");
  const [vehicle_type, setVehicleType] = useState("");
  const [vehicle_mileage, setVehicleMileage] = useState("");
  const [vehicle_tag, setVehicleTag] = useState("");
  const [vehicle_serial, setVehicleSerial] = useState("");
  const [vehicle_color, setVehicleColor] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [vehicleData, setVehicleData] = useState([]);
  const [order, setOrders] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { fromOrders } = location.state || {};
  const customerData =
    location.state?.selectedCustomer || location.state?.customer || null;
  const customer_id = customerData?.customer_id;

  const { employee } = useAuth();
  const loggedInEmployeeToken = employee?.employee_token || "";

  // Redirect or fallback if customer_id is missing
  useEffect(() => {
    if (!customer_id) {
      console.error("Customer ID is missing. Redirecting...");
      navigate("/admin/customers", { replace: true });
    }
  }, [customer_id, navigate]);

  useEffect(() => {
    if (!customer_id) return;

    const fetchVehicles = async () => {
      try {
        const response = await vehicleService.getVehicle(
          customer_id,
          loggedInEmployeeToken
        );
        setVehicleData(response);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
        setVehicleData([]);
      }
    };

    fetchVehicles();
  }, [customer_id, loggedInEmployeeToken, refreshTrigger]);

  useEffect(() => {
    if (!customer_id) return;

    orderService
      .getCustomerOrders(customer_id, loggedInEmployeeToken)
      .then((res) => setOrders(res.data))
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setOrders([]);
      });
  }, [customer_id, loggedInEmployeeToken, refreshTrigger]);

  const handleEdit = (customerData) => {
    navigate(`/admin/edit-customer/${customerData.customer_id}`, {
      state: { customerData },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!customer_id) {
      console.error("Customer ID is missing.");
      setSuccessMessage("Failed to add vehicle. Customer ID is missing.");
      return;
    }

    const vehicleFormData = {
      customer_id,
      vehicle_year,
      vehicle_make,
      vehicle_model,
      vehicle_type,
      vehicle_mileage,
      vehicle_tag,
      vehicle_serial,
      vehicle_color,
    };

    vehicleService
      .createVehicle(vehicleFormData, loggedInEmployeeToken, customer_id) // ✅ fixed here
      .then((data) => {
        console.log(data);
        setSuccessMessage("Vehicle added successfully!");
        setVehicleYear("");
        setVehicleMake("");
        setVehicleModel("");
        setVehicleType("");
        setVehicleMileage("");
        setVehicleTag("");
        setVehicleSerial("");
        setVehicleColor("");
        setRefreshTrigger((prev) => !prev);

        if (fromOrders) {
          navigate("/admin/order");
        }

        setTimeout(() => {
          setSuccessMessage("");
        }, 4000);
      })
      .catch((error) => {
        console.error("Error occurred:", error);
        setSuccessMessage("Failed to add vehicle. Please try again.");
      });
  };

  const renderVehicleTable = () => (
    <Table striped bordered hover className="mt-4">
      <thead>
        <tr>
          <th>Year</th>
          <th>Make</th>
          <th>Model</th>
          <th>Type</th>
          <th>Color</th>
          <th>Mileage</th>
          <th>Tag</th>
          <th>Serial</th>
        </tr>
      </thead>
      <tbody>
        {vehicleData.map((vehicle) => (
          <tr key={vehicle.vehicle_id}>
            <td>{vehicle.vehicle_year}</td>
            <td>{vehicle.vehicle_make}</td>
            <td>{vehicle.vehicle_model}</td>
            <td>{vehicle.vehicle_type}</td>
            <td>{vehicle.vehicle_color}</td>
            <td>{vehicle.vehicle_mileage}</td>
            <td>{vehicle.vehicle_tag}</td>
            <td>{vehicle.vehicle_serial}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );

  if (!customer_id) {
    return (
      <div className="alert alert-danger">
        No customer selected. Please go back and select a customer.
      </div>
    );
  }

  return (
    <div className="customer-detail-container">
      {/* Customer Info */}
      <div className="customer-info-section">
        <h2 className="section-title">
          <FontAwesomeIcon icon={faUser} className="icon" /> Customer
          Information
        </h2>
        <div className="info-card">
          <div className="info-item">
            <span className="info-label">Name:</span>
            <span className="info-value">
              {customerData?.customer_first_name}{" "}
              {customerData?.customer_last_name}
            </span>
          </div>
          <div className="info-item">
            <span className="info-label">Email:</span>
            <span className="info-value">{customerData?.customer_email}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Phone:</span>
            <span className="info-value">
              {customerData?.customer_phone_number}
            </span>
          </div>
          <div className="info-item">
            <span className="info-label">Status:</span>
            <span className="info-value">
              {customerData?.active_customer_status ? "Active" : "Inactive"}
            </span>
          </div>
          <div className="info-item">
            <span className="info-label">Edit Customer Info:</span>
            <button onClick={() => handleEdit(customerData)}>
              <FontAwesomeIcon color="red" icon={faEdit} />
            </button>
          </div>
        </div>
      </div>

      {/* Vehicle Info */}
      <div className="vehicle-info-section">
        <h2 className="section-title">
          <FontAwesomeIcon icon={faCar} className="icon" /> Vehicles of{" "}
          {customerData?.customer_first_name}
        </h2>

        {vehicleData.length > 0 ? (
          renderVehicleTable()
        ) : (
          <div className="info-card">
            <div>No vehicles found</div>
          </div>
        )}

        {!showVehicleForm && (
          <button
            className="theme-btn btn-style-one add-new-vehicle"
            onClick={() => setShowVehicleForm(true)}
            style={{
              width: "auto",
              padding: "8px 16px",
              display: "inline-block",
            }}
          >
            <span>Add new vehicle</span>
          </button>
        )}

        {showVehicleForm && (
          <div className="info-card add-new-vehicle-box">
            <div
              className="section-header1"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Button
                variant="link"
                onClick={() => setShowVehicleForm(false)}
                style={{ marginLeft: "auto" }}
              >
                <FontAwesomeIcon
                  icon={faTimes}
                  border
                  className="text-danger"
                />
              </Button>
            </div>

            <section className="contact-section">
              <div className="auto-container">
                <div className="contact-title">
                  <h2>Add a new vehicle</h2>
                </div>
                {successMessage && (
                  <div className="alert alert-success" role="alert">
                    {successMessage}
                  </div>
                )}
                <div className="row clearfix">
                  <div className="form-column col-lg-7">
                    <div className="inner-column">
                      <div className="contact-form">
                        <form onSubmit={handleSubmit}>
                          <div className="row clearfix">
                            {[
                              {
                                name: "vehicle_year",
                                value: vehicle_year,
                                setter: setVehicleYear,
                                placeholder: "Vehicle year",
                              },
                              {
                                name: "vehicle_make",
                                value: vehicle_make,
                                setter: setVehicleMake,
                                placeholder: "Vehicle make",
                              },
                              {
                                name: "vehicle_model",
                                value: vehicle_model,
                                setter: setVehicleModel,
                                placeholder: "Vehicle model",
                                required: true,
                              },
                              {
                                name: "vehicle_type",
                                value: vehicle_type,
                                setter: setVehicleType,
                                placeholder: "Vehicle type",
                              },
                              {
                                name: "vehicle_mileage",
                                value: vehicle_mileage,
                                setter: setVehicleMileage,
                                placeholder: "Vehicle mileage",
                                required: true,
                              },
                              {
                                name: "vehicle_tag",
                                value: vehicle_tag,
                                setter: setVehicleTag,
                                placeholder: "Vehicle tag",
                                required: true,
                              },
                              {
                                name: "vehicle_serial",
                                value: vehicle_serial,
                                setter: setVehicleSerial,
                                placeholder: "Vehicle serial",
                                required: true,
                              },
                              {
                                name: "vehicle_color",
                                value: vehicle_color,
                                setter: setVehicleColor,
                                placeholder: "Vehicle color",
                                required: true,
                              },
                            ].map((field, idx) => (
                              <div key={idx} className="form-group col-md-12">
                                <input
                                  type="text"
                                  name={field.name}
                                  value={field.value}
                                  onChange={(e) => field.setter(e.target.value)}
                                  placeholder={field.placeholder}
                                  required={field.required}
                                />
                              </div>
                            ))}
                            <div className="form-group col-md-12">
                              <button
                                className="theme-btn btn-style-one"
                                type="submit"
                              >
                                <span>Add vehicle</span>
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>

      {/* Orders Info */}
      <div className="orders-info-section">
        <h2 className="section-title">
          <FontAwesomeIcon icon={faShoppingCart} className="icon" /> Orders of{" "}
          {customerData?.customer_first_name}
        </h2>
        {order && <OrdersComponent orderFromCustomer={order} />}
      </div>
    </div>
  );
}

export default CustomerDetailComponent;
