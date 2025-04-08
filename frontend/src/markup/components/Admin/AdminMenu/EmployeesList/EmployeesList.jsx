import React, { useState, useEffect } from "react";
import { Table, Spinner, Pagination } from "react-bootstrap";
import { useAuth } from "../../../../../Contexts/AuthContext";
import { format } from "date-fns";
import employeeService from "../../../../../services/employee.service";
import { useNavigate } from "react-router-dom";
import { FaPen, FaTrash } from "react-icons/fa";

const EmployeesList = () => {
  const [employees, setEmployees] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 5;

  const { employee } = useAuth();
  let token = employee ? employee.employee_token : null;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await employeeService.getAllEmployees(token);
        if (!res.ok) {
          setApiError(true);
          setApiErrorMessage(
            res.status === 401
              ? "Please Login Again!"
              : res.status === 403
              ? "You are not authorized to view this page!"
              : "Please try again later"
          );
        }
        const data = await res.json();
        if (data.data.length !== 0) {
          setEmployees(data.data);
        }
      } catch (error) {
        setApiError(true);
        setApiErrorMessage("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, [token]);

  const handleEdit = (employee_id) => {
    navigate(`/employees/edit/${employee_id}`);
  };

  const handleDelete = async (employee_id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        const response = await employeeService.deleteEmployee(
          employee_id,
          token
        );
        if (response.ok) {
          setEmployees((prevEmployees) =>
            prevEmployees.filter(
              (employee) => employee.employee_id !== employee_id
            )
          );
          alert("Employee deleted successfully");
        } else {
          alert("Failed to delete the employee");
        }
      } catch (error) {
        console.error("Error deleting employee:", error);
        alert("An error occurred while deleting the employee");
      }
    }
  };

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );
  const totalPages = Math.ceil(employees.length / employeesPerPage);

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
              <h2>Employees List</h2>
            </div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Active</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Added Date</th>
                  <th>Role</th>
                  <th>Edit/Delete</th>
                </tr>
              </thead>
              <tbody>
                {currentEmployees.map((employee) => (
                  <tr key={employee.employee_id}>
                    <td>{employee.active_employee ? "Yes" : "No"}</td>
                    <td>{employee.employee_first_name}</td>
                    <td>{employee.employee_last_name}</td>
                    <td>{employee.employee_email}</td>
                    <td>{employee.employee_phone}</td>
                    <td>
                      {format(
                        new Date(employee.added_date),
                        "MM-dd-yyyy | KK:mm "
                      )}
                    </td>
                    <td>{employee.company_role_name}</td>
                    <td>
                      <FaPen
                        style={{
                          cursor: "pointer",
                          color: "#007bff",
                          marginRight: "10px",
                        }}
                        onClick={() => handleEdit(employee.employee_id)}
                      />
                      <FaTrash
                        style={{ cursor: "pointer", color: "#dc3545" }}
                        onClick={() => handleDelete(employee.employee_id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Pagination className="justify-content-center">
              <Pagination.Prev
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              />
              {[...Array(totalPages).keys()].map((number) => (
                <Pagination.Item
                  key={number + 1}
                  active={number + 1 === currentPage}
                  onClick={() => setCurrentPage(number + 1)}
                >
                  {number + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              />
            </Pagination>
          </div>
        </section>
      )}
    </>
  );
};

export default EmployeesList;
