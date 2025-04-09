import React from "react";
//import the auth hook
import { useAuth } from "../../../Contexts/AuthContext";
//import login component
import LoginForm from "../../components/LoginForm/LoginForm";
//import the admin menu component
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
import OrdersList from "../../components/Admin/AdminMenu/OrderList/OrderList";

const Orders = () => {
  //Destructure the auth hook
  const { isLogged, isAdmin } = useAuth();
  //Check if the user is logged in and is an admin
  if (isLogged) {
    if (isAdmin) {
      return (
        <div>
          <div className="container-fluid admin-pages">
            <div className="row">
              <div className="col-md-3 admin-left-side">
                <AdminMenu />
              </div>
              <div className="col-md-9 admin-right-side">
                <OrdersList />
                {/* <p>List of employees</p> */}
                {/* Add the employee list component here */}
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

export default Orders;
