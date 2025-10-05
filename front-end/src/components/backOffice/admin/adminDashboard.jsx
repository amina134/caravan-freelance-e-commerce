import React, { useState } from 'react';
import { TrendingUp, DollarSign, ShoppingBag, Users, Clock, Star, AlertCircle, ChefHat } from 'lucide-react';
import './adminDashboard.css'
import Sidebar from './sideBar';


const StatCard = ({ title, value, change, icon, color }) => {
  const isPositive = change >= 0;

  return (
    <div className={`stat-card stat-card-${color}`}>
      <div className="stat-header">
        <div className="stat-icon-wrapper" style={{ background: `var(--${color}-light)` }}>
          {icon}
        </div>
        <div className={`stat-change ${isPositive ? 'positive' : 'negative'}`}>
          <TrendingUp size={16} style={{ transform: isPositive ? 'none' : 'rotate(180deg)' }} />
          {Math.abs(change)}%
        </div>
      </div>
      <div className="stat-content">
        <h3 className="stat-value">{value}</h3>
        <p className="stat-title">{title}</p>
      </div>
    </div>
  );
};

const OrderCard = ({ order }) => (
  <div className="order-card">
    <div className="order-header">
      <span className="order-id">#{order.id}</span>
      <span className={`order-status status-${order.status.toLowerCase()}`}>
        {order.status}
      </span>
    </div>
    <div className="order-details">
      <p className="order-customer">{order.customer}</p>
      <p className="order-items">{order.items} items</p>
    </div>
    <div className="order-footer">
      <span className="order-time">
        <Clock size={14} />
        {order.time}
      </span>
      <span className="order-price">${order.price}</span>
    </div>
  </div>
);

const AdminDashboard = () => {
  const stats = [
    { title: 'Total Revenue', value: '$12,426', change: 12.5, icon: <DollarSign size={24} />, color: 'purple' },
    { title: 'Orders Today', value: '156', change: 8.2, icon: <ShoppingBag size={24} />, color: 'blue' },
    { title: 'Active Customers', value: '2,847', change: 15.3, icon: <Users size={24} />, color: 'green' },
    { title: 'Avg Order Value', value: '$79.65', change: -2.4, icon: <TrendingUp size={24} />, color: 'orange' }
  ];

  const recentOrders = [
    { id: '1247', customer: 'Sarah Johnson', items: 3, time: '5 min ago', price: '45.50', status: 'Pending' },
    { id: '1246', customer: 'Mike Chen', items: 2, time: '12 min ago', price: '32.00', status: 'Preparing' },
    { id: '1245', customer: 'Emma Wilson', items: 5, time: '18 min ago', price: '87.25', status: 'Ready' },
    { id: '1244', customer: 'James Brown', items: 1, time: '25 min ago', price: '18.50', status: 'Completed' }
  ];

  const popularItems = [
    { name: 'Truffle Pasta', orders: 42, revenue: '$588' },
    { name: 'Caesar Salad', orders: 38, revenue: '$456' },
    { name: 'Grilled Salmon', orders: 31, revenue: '$775' }
  ];

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <h1 className="dashboard-title">Welcome Back, Chef! 👨‍🍳</h1>
            <p className="dashboard-subtitle">Here's what's happening in your restaurant today</p>
          </div>
          <div className="header-actions">
            <button className="btn-secondary">Download Report</button>
            <button className="btn-primary">New Order</button>
          </div>
        </header>

        <div className="stats-grid">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        <div className="content-grid">
          <div className="orders-section">
            <div className="section-header">
              <h2 className="section-title">Recent Orders</h2>
              <button className="btn-link">View All</button>
              <h1>hez</h1>
            </div>
            <div className="orders-list">

              {recentOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </div>

          <div className="popular-section">
            <div className="section-header">
              <h2 className="section-title">Popular Items</h2>
              <button className="btn-link">View Menu</button>
            </div>
            <div className="popular-list">
              {popularItems.map((item, index) => (
                <div key={index} className="popular-item">
                  <div className="popular-rank">{index + 1}</div>
                  <div className="popular-info">
                    <p className="popular-name">{item.name}</p>
                    <p className="popular-orders">{item.orders} orders</p>
                  </div>
                  <div className="popular-revenue">{item.revenue}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      
     
    </div>
  );
};

export default AdminDashboard;