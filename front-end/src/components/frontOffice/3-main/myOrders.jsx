import { useEffect, useState } from "react";

import "./myOrders.css";
import { useSelector, useDispatch } from 'react-redux';
import { getOrderById } from "../../../api/orderApi";

const MyOrders = () => {
  const {currentUser}=useSelector((state)=>state.userElement);
  const userId = currentUser?._id;
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = getOrderById(userId)
        setOrders(res.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchOrders();
  }, [userId]);

  if (loading) return <p>Loading orders...</p>;

  if (orders.length === 0) return <p>No orders found.</p>;

  return (
    <div className="my-orders-page">
      <h2>My Orders</h2>
      {orders.map((order) => (
        <div key={order._id} className="order-card">
          <p><strong>Order ID:</strong> {order._id}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Total:</strong> {order.totalPrice.toFixed(2)} dt</p>
          <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>

          <ul className="order-items">
            {order.cartItems.map((item, idx) => (
              <li key={idx}>
                {item.productId?.name || "Deleted product"} × {item.quantity}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
