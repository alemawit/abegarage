import React from "react";
// Import the component adminMenu
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
import { useAuth } from "../../../Contexts/AuthContext";
// Import the component addEmployeeForm
import AddEmployeeForm from "../../components/Admin/AddEmployeeForm/AddEmployeeForm";

function AddEmployee() {
  // Destructure the auth hook
  const { isLogged, role } = useAuth();

  // Check if the user is logged in and is an admin
  if (!isLogged || role !== 1) {
    return (
      <div className="unauthorized">
        <h1>Unauthorized</h1>
        <p>You are not authorized to view this page</p>
      </div>
    );
  }

  // If the user is authorized, render the Add Employee page
  return (
    <div>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <AddEmployeeForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEmployee;
