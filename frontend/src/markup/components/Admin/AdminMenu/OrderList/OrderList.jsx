


import React, { useState, useEffect } from "react";
import { Table, Modal, Badge, Spinner } from "react-bootstrap";
import { useAuth } from "../../../../../Contexts/AuthContext";
import { format } from "date-fns";
import orderService from "../../../../../services/order.service";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEdit } from "react-icons/fa"; // Importing icons

const OrderList = ({ orderFromCustomer }) => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null); // Ensure this is set
  const [showModal, setShowModal] = useState(false); // Modal state
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [customerPage, setCustomerPage] = useState(1);
  const navigate = useNavigate();
  const { employee } = useAuth();
  let loggedInEmployeeToken = employee?.employee_token || "";

  useEffect(() => {
    orderService
      .getAllOrders(loggedInEmployeeToken)
      .then((res) => {
        console.log("API Response:", res);
        if (res.data && typeof res.data === "object") {
          setOrders([res.data]); // Wrap it in an array if it's a single order
        } else {
          setOrders([]); // Handle invalid data
        }
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
        setOrders([]); // Prevent `null` or `undefined` state
      })
      .finally(() => setLoading(false));
  }, [loggedInEmployeeToken]);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowModal(true); // Set showModal to true to open the modal
  };

  const handleEditClick = (order) => {
    navigate(`/admin/edit-order/${order.order_id}`, { state: { order } });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  return (
    <section className="contact-section">
      <div className="auto-container">
        {!orderFromCustomer && (
          <div className="contact-title">
            <h2>Orders</h2>
          </div>
        )}

        {loading ? (
          <div className="text-center my-5">
            <Spinner
              animation="border"
              style={{ color: "#081847" }}
              size="lg"
            />
            <p>Loading orders...</p>
          </div>
        ) : orderFromCustomer ? (
          !currentOrders ? (
            <div>No Order Available</div>
          ) : (
            <div className="table-responsive">
              <Table striped bordered hover className="orders-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Vehicle</th>
                    <th>Order Date</th>
                    <th>Received by</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentOrders?.map((order, indx) => (
                    <tr key={indx}>
                      <td>{order.order_id}</td>
                      <td>{order.customer_name || "N/A"}</td>
                      <td>
                        {order.vehicle_make} {order.vehicle_year}
                      </td>
                      <td>
                        {format(new Date(order.order_date), "MM/dd/yyyy HH:mm")}
                      </td>
                      <td>{order.employee_name || "N/A"}</td>
                      <td>
                        <Badge
                          style={{ borderRadius: "20px" }}
                          bg={
                            order.active_order === 2
                              ? "secondary"
                              : order.active_order
                              ? "success"
                              : "warning"
                          }
                        >
                          {order.active_order === 2
                            ? "Received"
                            : order.active_order
                            ? "Completed"
                            : "In Progress"}
                        </Badge>
                      </td>
                      <td>
                        {/* View Details Icon */}
                        <FaEye
                          style={{
                            cursor: "pointer",
                            color: "#081847",
                            marginRight: "10px",
                          }}
                          onClick={() => handleViewDetails(order)}
                        />
                        {/* Edit Icon */}
                        <FaEdit
                          style={{ cursor: "pointer", color: "#FFA500" }}
                          onClick={() => handleEditClick(order)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )
        ) : (
          <div className="table-responsive">
            <Table striped bordered hover className="orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Vehicle</th>
                  <th>Order Date</th>
                  <th>Received by</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentOrders?.map((order, indx) => (
                  <tr key={indx}>
                    <td>{order.order_id}</td>
                    <td>{order.customer_first_name || "N/A"}</td>
                    <td>
                      {order.vehicle_make} {order.vehicle_year}
                    </td>
                    <td>
                      {format(new Date(order.order_date), "MM/dd/yyyy HH:mm")}
                    </td>
                    <td>{order.employee_first_name || "N/A"}</td>
                    <td>
                      <Badge
                        style={{ borderRadius: "20px" }}
                        bg={
                          order.active_order === 2
                            ? "secondary"
                            : order.active_order
                            ? "success"
                            : "warning"
                        }
                      >
                        {order.active_order === 2
                          ? "Received"
                          : order.active_order
                          ? "Completed"
                          : "In Progress"}
                      </Badge>
                    </td>
                    <td>
                      {/* View Details Icon */}
                      <FaEye
                        style={{
                          cursor: "pointer",
                          color: "#081847",
                          marginRight: "10px",
                        }}
                        onClick={() => handleViewDetails(order)}
                      />
                      {/* Edit Icon */}
                      <FaEdit
                        style={{ cursor: "pointer", color: "#FFA500" }}
                        onClick={() => handleEditClick(order)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}

        {/* Modal for View Details */}
        {selectedOrder && (
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Order Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                <strong>Order ID:</strong> {selectedOrder.order_id}
              </p>
              <p>
                <strong>Customer:</strong> {selectedOrder.customer_name}
              </p>
              <p>
                <strong>Vehicle:</strong> {selectedOrder.vehicle_make}{" "}
                {selectedOrder.vehicle_year}
              </p>
              <p>
                <strong>Order Date:</strong>{" "}
                {format(new Date(selectedOrder.order_date), "MM/dd/yyyy HH:mm")}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {selectedOrder.active_order === 2
                  ? "Received"
                  : selectedOrder.active_order
                  ? "Completed"
                  : "In Progress"}
              </p>
              <p>
                <strong>Received by:</strong> {selectedOrder.employee_name}
              </p>
            </Modal.Body>
            <Modal.Footer>
              <button
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
    </section>
  );
};

export default OrderList;
