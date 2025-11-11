import React, { useState } from "react";
import {
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Users,
  Clock,
} from "lucide-react";
import "./adminDashboard.css";
import Sidebar from "./sideBar";
import ProductsAdmin from "./productsAdmin";
import OrdersAdmin from "./ordersAdmin";
import CustomersAdmin from "./customerAdmin";
import ReviewsAdmin from "./reviewsAdmin";

const StatCard = ({ title, value, change, icon, color }) => {
  const isPositive = change >= 0;

  return (
    <div className={`adm-stat-card adm-stat-card-${color}`}>
      <div className="adm-stat-header">
        <div
          className="adm-stat-icon-wrapper"
          style={{ background: `var(--${color}-light)` }}
        >
          {icon}
        </div>
        <div className={`adm-stat-change ${isPositive ? "positive" : "negative"}`}>
          <TrendingUp
            size={16}
            style={{ transform: isPositive ? "none" : "rotate(180deg)" }}
          />
          {Math.abs(change)}%
        </div>
      </div>
      <div className="adm-stat-content">
        <h3 className="adm-stat-value">{value}</h3>
        <p className="adm-stat-title">{title}</p>
      </div>
    </div>
  );
};

const OrderCard = ({ order }) => (
  <div className="adm-order-card">
    <div className="adm-order-header">
      <span className="adm-order-id">#{order.id}</span>
      <span className={`adm-order-status status-${order.status.toLowerCase()}`}>
        {order.status}
      </span>
    </div>
    <div className="adm-order-details">
      <p className="adm-order-customer">{order.customer}</p>
      <p className="adm-order-items">{order.items} items</p>
    </div>
    <div className="adm-order-footer">
      <span className="adm-order-time">
        <Clock size={14} />
        {order.time}
      </span>
      <span className="adm-order-price">${order.price}</span>
    </div>
  </div>
);

const AdminDashboard = () => {
  const [activePage, setActivePage] = useState("dashboard");

  const stats = [
    {
      title: "Total Revenue",
      value: "$12,426",
      change: 12.5,
      icon: <DollarSign size={24} />,
      color: "purple",
    },
    {
      title: "Orders Today",
      value: "156",
      change: 8.2,
      icon: <ShoppingBag size={24} />,
      color: "blue",
    },
    {
      title: "Active Customers",
      value: "2,847",
      change: 15.3,
      icon: <Users size={24} />,
      color: "green",
    },
    {
      title: "Avg Order Value",
      value: "$79.65",
      change: -2.4,
      icon: <TrendingUp size={24} />,
      color: "orange",
    },
  ];

  const recentOrders = [
    {
      id: "1247",
      customer: "Sarah Johnson",
      items: 3,
      time: "5 min ago",
      price: "45.50",
      status: "Pending",
    },
    {
      id: "1246",
      customer: "Mike Chen",
      items: 2,
      time: "12 min ago",
      price: "32.00",
      status: "Preparing",
    },
    {
      id: "1245",
      customer: "Emma Wilson",
      items: 5,
      time: "18 min ago",
      price: "87.25",
      status: "Ready",
    },
    {
      id: "1244",
      customer: "James Brown",
      items: 1,
      time: "25 min ago",
      price: "18.50",
      status: "Completed",
    },
  ];

  const popularItems = [
    { name: "Truffle Pasta", orders: 42, revenue: "$588" },
    { name: "Caesar Salad", orders: 38, revenue: "$456" },
    { name: "Grilled Salmon", orders: 31, revenue: "$775" },
  ];

  return (
    <div className="adm-dashboard-container">
      <Sidebar setActivePage={setActivePage} />

      <div className="adm-dashboard-main">
        {activePage === "dashboard" && (
          <>
            <header className="adm-dashboard-header">
              <div>
                <h1 className="adm-dashboard-title">Welcome Back, Chef! 👨‍🍳</h1>
                <p className="adm-dashboard-subtitle">
                  Here's what's happening in your restaurant today
                </p>
              </div>
              <div className="adm-header-actions">
                <button className="adm-btn-secondary">Download Report</button>
                <button className="adm-btn-primary">New Order</button>
              </div>
            </header>

            <div className="adm-stats-grid">
              {stats.map((stat, index) => (
                <StatCard key={index} {...stat} />
              ))}
            </div>

            <div className="adm-content-grid">
              <div className="adm-orders-section">
                <div className="adm-section-header">
                  <h2 className="adm-section-title">Recent Orders</h2>
                  <button className="adm-btn-link">View All</button>
                </div>
                <div className="adm-orders-list">
                  {recentOrders.map((order) => (
                    <OrderCard key={order.id} order={order} />
                  ))}
                </div>
              </div>

              <div className="adm-popular-section">
                <div className="adm-section-header">
                  <h2 className="adm-section-title">Popular Items</h2>
                  <button className="adm-btn-link">View Menu</button>
                </div>
                <div className="adm-popular-list">
                  {popularItems.map((item, index) => (
                    <div key={index} className="adm-popular-item">
                      <div className="adm-popular-rank">{index + 1}</div>
                      <div className="adm-popular-info">
                        <p className="adm-popular-name">{item.name}</p>
                        <p className="adm-popular-orders">
                          {item.orders} orders
                        </p>
                      </div>
                      <div className="adm-popular-revenue">{item.revenue}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {activePage === "menu" && <ProductsAdmin />}
        {activePage === "orders" && <OrdersAdmin />}
        {activePage === "customers" && <CustomersAdmin />}
        {activePage === "reviews" && <ReviewsAdmin />}
        {activePage === "settings" && <h2>Settings Page</h2>}
      </div>
    </div>
  );
};

export default AdminDashboard;
