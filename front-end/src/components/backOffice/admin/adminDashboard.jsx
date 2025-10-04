// src/AdminDashboard.jsx
import React from "react";
import Sidebar from "./sideBar";


const AdminDashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-main">
        <h1>Welcome to the Admin Dashboard</h1>
        <p>This is your main content area.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
