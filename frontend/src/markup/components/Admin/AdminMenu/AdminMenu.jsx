//

import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for programmatic navigation
//import { Link } from "react-router-dom"; // Import Link for navigation
import { Link } from "react-router-dom"; // Import Link for navigation
import { VscPersonAdd } from "react-icons/vsc";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { MdOutlinePersonAddAlt1 } from "react-icons/md";
import { SlPeople } from "react-icons/sl";
import { MdOutlineCarCrash } from "react-icons/md";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import { GiHomeGarage } from "react-icons/gi";
import { GiMechanicGarage } from "react-icons/gi";
import {
  LayoutDashboard,
  ShoppingCart,
  Car,
  UserPlus,
  Users,
  Settings,
  FilePlus,
} from "lucide-react";

function AdminMenu() {
  const navigate = useNavigate(); // Create a navigate function

  const handleDashboardClick = () => {
    navigate("/admin"); // Redirect to the admin dashboard route
  };

  return (
    <div className="container">
      <aside className="sidebar">
        <div className="logo">
          <h2>Admin Menu</h2>
        </div>
        <nav className="menu">
          <ul>
            <li>
              <MdOutlineAdminPanelSettings size={30} color="#c94e4e" />
              {/* Use the onClick handler to navigate */}
              <span
                onClick={handleDashboardClick}
                style={{ cursor: "pointer" }}
              >
                Dashboard
              </span>
            </li>
            <li>
              <Car size={28} color="#c94e4e" />
              <Link to="/admin/orders">Orders</Link>
            </li>
            <li>
              <GiHomeGarage size={30} color="#c94e4e" />
              <Link to="/admin/order">New order</Link>
            </li>
            <li>
              <UserPlus size={28} color="#c94e4e" />
              <Link to="/admin/add-employee">Add employee</Link>
            </li>
            <li>
              <MdOutlinePeopleAlt size={30} color="#c94e4e" />
              <Link to="/admin/employees">Employees</Link>
            </li>
            <li>
              <MdOutlinePersonAddAlt1 size={30} color="#c94e4e" />
              <Link to="/admin/customer">Add customer</Link>
            </li>
            <li>
              <Users size={28} color="#c94e4e" />
              <Link to="/admin/customers">Customers</Link>
            </li>
            <li>
              <GiMechanicGarage size={30} color="#c94e4e" />;
              <Link to="/admin/service">Services</Link>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
}

export default AdminMenu;
