//import Routes and Route from react-router-dom
import { Routes, Route, Router } from "react-router-dom";
//import the components
import Home from "./markup/pages/Home";
import Login from "./markup/pages/Login";
import AddEmployee from "./markup/pages/admin/AddEmployee";
import Header from "./markup/components/Header/Header";
import "./App.css";
import Footer from "./markup/components/Footer/Footer";
import Service from "./markup/pages/admin/Service";
import About from "./markup/pages/About";
import Unautorized from "./markup/pages/Unautorized";
//import the private auth route component
import PrivateAuthRoute from "./markup/components/Auth/PrivateAuthRoute";
import Orders from "./markup/pages/admin/Orders";
import AddCustomers from "./markup/pages/admin/AddCustomers";
import Employees from "./markup/pages/admin/Employees";
//import AdminDashboard from "./markup/pages/Admin/AdminDashboard";
import Dashboard from "./markup/pages/admin/Dashboard";
import Contact from "./markup/pages/Contact";
import Customers from "./markup/pages/admin/Customers";
import EditEmployee from "./markup/pages/admin/EditEmployee";
import EditCustomer from "./markup/pages/admin/EditCustomer";
import AddNewOrder from "./markup/pages/admin/AddNewOrder";
import Services from "./markup/pages/Services";
import EditOrder from "./markup/pages/admin/EditOrder";
import CustomerDetail from "./markup/pages/admin/CustomerDetail";

function App() {
  return (
    <>
      {/* header section */}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/services" element={<Services />} />

        <Route path="/Unauthorized" element={<Unautorized />} />
        <Route
          path="/admin/orders"
          element={
            <PrivateAuthRoute roles={[1, 2, 3]}>
              <Orders />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/order"
          element={
            <PrivateAuthRoute roles={[1]}>
              <AddNewOrder />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="admin/service"
          element={
            <PrivateAuthRoute roles={[1, 2, 3]}>
              <Service />
            </PrivateAuthRoute>
          }
        />

        <Route
          path="/admin/customer"
          element={
            <PrivateAuthRoute roles={[1]}>
              <AddCustomers />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/customer-detail/:id"
          element={
            <PrivateAuthRoute roles={[1]}>
              <CustomerDetail />
            </PrivateAuthRoute>
          }
        />

        <Route path="/admin/employees" element={<Employees />} />

        <Route
          path="/admin/add-Employee"
          element={
            <PrivateAuthRoute roles={[1]}>
              <AddEmployee />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/edit-order/:id"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <EditOrder />
            </PrivateAuthRoute>
          }
        />
        <Route path="admin" element={<Dashboard />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin/customers" element={<Customers />} />
        <Route path="/employees/edit/:employee_id" element={<EditEmployee />} />
        <Route path="/customer/edit/:customer_id" element={<EditCustomer />} />
        <Route
          path="/admin/edit-customer/:customer_id"
          element={<EditCustomer />}
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
