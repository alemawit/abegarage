import React from 'react'

function AdminMenu() {
  return (
    <div className="container">
      <aside className="sidebar">
        <div className="logo">
          <h2>Admin Menu</h2>
        </div>
        <nav className="menu">
          <ul>
            <li>
              <a href="#">Dashboard</a>
            </li>
            <li>
              <a href="#">Orders</a>
            </li>
            <li>
              <a href="#">New order</a>
            </li>
            <li>
              <a href="#">Add employee</a>
            </li>
            <li>
              <a href="#">Employees</a>
            </li>
            <li>
              <a href="#">Add customer</a>
            </li>
            <li>
              <a href="#">Customers</a>
            </li>
            <li>
              <a href="#">Services</a>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
}

export default AdminMenu