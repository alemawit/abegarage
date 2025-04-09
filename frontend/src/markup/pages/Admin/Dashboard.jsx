import React from "react";
//import the auth hook
import { useAuth } from "../../../Contexts/AuthContext";
//import login component
import LoginForm from "../../components/LoginForm/LoginForm";
//import the admin menu component
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
//import the admin dashboard component
import AdminDashboard from "../../components/Admin/AdminMenu/AdminDashboard/AdminDashboard";

const Dashboard = () => {
  //Destructure the auth hook

  //Check if the user is logged in and is an admin

  return (
    <div>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            {/* Add the admin dashboard component here */}
            <AdminDashboard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
