import React from "react";
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
import NewOrders from "../../components/Admin/NewOrders/NewOrders";

const AddNewOrder = () => {
  return (
    <div className="container-fluid admin-pages">
      <div className="row">
        <div className="col-md-3 admin-left-side">
          <AdminMenu />
        </div>
        <div className="col-md-9 admin-right-side">
          <NewOrders />
        </div>
      </div>
    </div>
  );
};

export default AddNewOrder;
