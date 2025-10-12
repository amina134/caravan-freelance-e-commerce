// sideBar.jsx
import React from "react";
import "./sideBar.css";

const Sidebar = ({ setActivePage }) => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Admin</h2>
      <ul className="sidebar-list">
        <li className="sidebar-item" onClick={() => setActivePage("dashboard")}>
          Dashboard
        </li>
        <li className="sidebar-item" onClick={() => setActivePage("orders")}>
          Orders
        </li>
        <li className="sidebar-item" onClick={() => setActivePage("menu")}>
          Menu
        </li>
        <li className="sidebar-item" onClick={() => setActivePage("customers")}>
          Customers
        </li>
        <li className="sidebar-item" onClick={() => setActivePage("reviews")}>
          Reviews
        </li>
        {/* <li className="sidebar-item" onClick={() => setActivePage("settings")}>
          Settings
        </li> */}
      </ul>
    </div>
  );
};

export default Sidebar;
