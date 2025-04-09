import React, { useState, useEffect } from "react";
import { Table, Modal, Badge, Spinner } from "react-bootstrap";
import { useAuth } from "../../../../../Contexts/AuthContext";
import { format } from "date-fns";
import orderService from "../../../../../services/order.service";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEdit } from "react-icons/fa";

const OrderList = ({ orderFromCustomer }) => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const navigate = useNavigate();
  const { employee } = useAuth();
  let loggedInEmployeeToken = employee?.employee_token || "";

  useEffect(() => {
    orderService
      .getAllOrders(loggedInEmployeeToken)
      .then((res) => {
        console.log("API Response:", res);
        if (res.data && Array.isArray(res.data)) {
          setOrders(res.data); // ✅ FIXED: use the array directly
        } else {
          setOrders([]); // fallback if unexpected structure
        }
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
        setOrders([]);
      })
      .finally(() => setLoading(false));
  }, [loggedInEmployeeToken]);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
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
        ) : currentOrders.length === 0 ? (
          <div className="text-center">No Orders Available</div>
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
                {currentOrders.map((order, indx) => (
                  <tr key={indx}>
                    <td>{order.order_id}</td>
                    <td>{order.customer_name || "Unknown"}</td>
                    <td>
                      {order.vehicle_make} {order.vehicle_year}
                    </td>
                    <td>
                      {order.order_date
                        ? format(new Date(order.order_date), "MM/dd/yyyy HH:mm")
                        : "Invalid Date"}
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
                      <FaEye
                        style={{
                          cursor: "pointer",
                          color: "#081847",
                          marginRight: "10px",
                        }}
                        onClick={() => handleViewDetails(order)}
                      />
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
                <strong>Customer:</strong>{" "}
                {selectedOrder.customer_name || "Unknown"}
              </p>
              <p>
                <strong>Vehicle:</strong> {selectedOrder.vehicle_make}{" "}
                {selectedOrder.vehicle_year}
              </p>
              <p>
                <strong>Order Date:</strong>
                {selectedOrder.order_date
                  ? format(
                      new Date(selectedOrder.order_date),
                      "MM/dd/yyyy HH:mm"
                    )
                  : "Invalid Date"}
              </p>
              <p>
                <strong>Status:</strong>
                {selectedOrder.active_order === 2
                  ? "Received"
                  : selectedOrder.active_order
                  ? "Completed"
                  : "In Progress"}
              </p>
              <p>
                <strong>Received by:</strong>{" "}
                {selectedOrder.employee_name || "N/A"}
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
