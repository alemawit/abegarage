import React from "react";
//import the component adminMenu
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
//import componet edit customer
import CustomerEdit from "../../components/Admin/AdminMenu/CustomerEdit/CustomerEdit";

const EditCustomer = () => {
  return (
    <div>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <CustomerEdit />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCustomer;
