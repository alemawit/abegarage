import React from "react";
// Import the auth hook
import { useAuth } from "../../../Contexts/AuthContext";
// Import login component
import LoginForm from "../../components/LoginForm/LoginForm";
// Import the admin menu component
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
import CustomerList from "../../components/Admin/AdminMenu/CustomerList/CustomerList";

const Customers = () => {
  // Destructure the auth hook
  const { isLogged, role } = useAuth();
  console.log(role);

  // Check if the user is logged in and has access (Admin or Manager)
  if (isLogged) {
    if (role === 1) {
      return (
        <div>
          <div className="container-fluid admin-pages">
            <div className="row">
              <div className="col-md-3 admin-left-side">
                <AdminMenu />
              </div>
              <div className="col-md-9 admin-right-side">
                {/* Add the customer list component here */}
                <CustomerList />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="unauthorized">
          <h1>Unauthorized</h1>
          <p>You are not authorized to view this page</p>
        </div>
      );
    }
  } else {
    return <LoginForm />;
  }
};

export default Customers;
