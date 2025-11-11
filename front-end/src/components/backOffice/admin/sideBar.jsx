
import React from "react";
import "./sideBar.css";

const Sidebar = ({ setActivePage }) => {
  return (
    <div className="sidebar-admin">
      <h2 className="sidebar-title-admin">Admin</h2>
      <ul className="sidebar-list-admin">
        <li className="sidebar-item-admin" onClick={() => setActivePage("dashboard")}>
          Dashboard
        </li>
        <li className="sidebar-item-admin" onClick={() => setActivePage("orders")}>
          Orders
        </li>
        <li className="sidebar-item-admin" onClick={() => setActivePage("menu")}>
          Menu
        </li>
        <li className="sidebar-item-admin" onClick={() => setActivePage("customers")}>
          Customers
        </li>
        <li className="sidebar-item-admin" onClick={() => setActivePage("reviews")}>
          Reviews
        </li>
      
      </ul>
    </div>
  );
};

export default Sidebar;


