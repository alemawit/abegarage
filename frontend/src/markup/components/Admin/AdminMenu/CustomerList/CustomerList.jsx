import React, { useState, useEffect } from "react";
import { Table, Spinner, InputGroup, Form, Pagination } from "react-bootstrap"; // Added Pagination
import { useAuth } from "../../../../../Contexts/AuthContext";
import { format } from "date-fns";
import customerService from "../../../../../services/customer.service";
import { useNavigate } from "react-router-dom";
import { FaPen } from "react-icons/fa";

const CustomerList = () => {
  // State for storing customers
  const [customers, setCustomers] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 5; // Adjust the number of customers per page

  // Get logged-in employee token
  const { employee } = useAuth();
  const token = employee ? employee.employee_token : null;
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setApiError(true);
      setApiErrorMessage("Authentication error. Please log in.");
      return;
    }

    const fetchCustomers = async () => {
      try {
        const res = await customerService.getAllCustomers(token);
        setCustomers(res); // Directly set customers

        if (res.length === 0) {
          setApiError(true);
          setApiErrorMessage("No customers found.");
        }
      } catch (error) {
        setApiError(true);
        setApiErrorMessage(
          error.message || "Something went wrong. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [token]);
  // Function to handle Edit button click
  const handleEdit = (customer_id) => {
    navigate(`/customer/edit/${customer_id}`);
  };

  // Filter customers based on search query
  const filteredCustomers = customers.filter((customer) =>
    [
      customer.customer_first_name,
      customer.customer_last_name,
      customer.customer_email,
      customer.customer_phone,
    ].some((field) =>
      field ? field.toLowerCase().includes(searchQuery.toLowerCase()) : false
    )
  );

  // Calculate pagination indexes
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = filteredCustomers.slice(
    indexOfFirstCustomer,
    indexOfLastCustomer
  );

  // Handle pagination clicks
  const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {loading ? (
        <div className="text-center mt-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : apiError ? (
        <section className="contact-section">
          <div className="auto-container">
            <div className="contact-title">
              <h2>{apiErrorMessage}</h2>
            </div>
          </div>
        </section>
      ) : (
        <section className="contact-section">
          <div className="auto-container">
            <div className="contact-title">
              <h2>Customer List</h2>
            </div>

            {/* Search Bar */}
            <InputGroup className="mb-3">
              <Form.Control
                type="text"
                placeholder="Search customers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </InputGroup>

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Added Date</th>
                  <th>Active</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {currentCustomers.length > 0 ? (
                  currentCustomers.map((customer) => (
                    <tr key={customer.customer_id}>
                      <td>{customer.customer_id}</td>
                      <td>{customer.customer_first_name}</td>
                      <td>{customer.customer_last_name}</td>
                      <td>{customer.customer_email}</td>
                      <td>{customer.customer_phone_number}</td>
                      <td>
                        {customer.customer_added_date
                          ? format(
                              new Date(customer.customer_added_date),
                              "MM-dd-yyyy | KK:mm"
                            )
                          : "N/A"}
                      </td>
                      <td>{customer.active_customer_status ? "Yes" : "No"}</td>
                      <td>
                        <FaPen
                          style={{ cursor: "pointer", color: "#007bff" }}
                          onClick={() => handleEdit(customer.customer_id)}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center">
                      No customers found.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <Pagination className="justify-content-center">
                <Pagination.Prev
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                />
                {[...Array(totalPages).keys()].map((number) => (
                  <Pagination.Item
                    key={number + 1}
                    active={number + 1 === currentPage}
                    onClick={() => paginate(number + 1)}
                  >
                    {number + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                />
              </Pagination>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default CustomerList;
