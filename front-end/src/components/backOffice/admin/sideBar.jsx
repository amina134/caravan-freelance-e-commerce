// src/Sidebar.jsx
import React from "react";
// import "./Sidebar.css";

const Sidebar = () => {
  const menuItems = ["Dashboard", "Orders", "Menu", "Customers", "Settings"];

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Admin</h2>
      <ul className="sidebar-list">
        {menuItems.map((item) => (
          <li key={item} className="sidebar-item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
