import React from "react";
//import the component adminMenu
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
// import componet edit order
import EditOrderComponent from "../../components/EditOrderComponent/EditOrderComponent";

const EditOrder = () => {
  return (
    <div>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <EditOrderComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditOrder;
