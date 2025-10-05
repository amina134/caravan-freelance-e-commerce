// src/Sidebar.jsx
import React from "react";
import "./sideBar.css";
import ProductsAdmin from "./productsAdmin";

const Sidebar = () => {
  const menuItems = ["Dashboard", "Orders", "Menu", "Customers", "Settings"];

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Admin</h2>
      <ul className="sidebar-list">
       
          <li  className="sidebar-item">
            Dashboard
           
          </li>
          <li className="sidebar-item">
            Orders
     
          </li>
          <li  className="sidebar-item" onClick={<ProductsAdmin/>}>
            Menu
      
          </li>
          <li  className="sidebar-item">
            Customers
  
          </li>
          <li  className="sidebar-item">
            Settings
            
          </li>
     
      </ul>
    </div>
  );
};

export default Sidebar;
