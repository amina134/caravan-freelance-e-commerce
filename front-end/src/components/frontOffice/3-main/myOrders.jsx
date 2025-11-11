import { useEffect, useState } from "react";
import "./myOrders.css";
import { useSelector } from "react-redux";
import { getOrdersByUserId } from "../../../api/orderApi";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
  const { currentUser } = useSelector((state) => state.userElement);
  const userId = currentUser?._id;

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getOrdersByUserId(userId);
        setOrders(res);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchOrders();
  }, [userId]);

  // Loading state
  if (loading) {
    return <div className="loading-state2">Loading your orders...</div>;
  }

  // Empty orders
  if (orders.length === 0) {
    return (
      <div className="empty-orders2">
        <p>No orders found</p>
        <button className="back-btn2" onClick={() => navigate("/")}>
          Back to Menu
        </button>
      </div>
    );
  }

  return (
    <div className="my-orders-page2">
      <div className="orders-header2">
        <h2>My Orders</h2>
        <button className="back-btn2" onClick={() => navigate("/")}>
          Back to Menu
        </button>
      </div>

      <div className="orders-list2">
        {[...orders].reverse().map((order) => (
          <div key={order._id} className="order-card2">
            <div className="order-summary2">
              <p>
                <strong>Order ID:</strong> {order._id}
              </p>
              <p>
                <strong>Status:</strong> {order.status || "Pending"}
              </p>
              <p>
                <strong>Total:</strong> {order.totalPrice.toFixed(2)} dt
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="order-items2">
              <h4>Items:</h4>
              <ul>
                {order.cartItems.map((item, idx) => (
                  <li key={idx} className="order-item2">
                    <div className="item-info2">
                      {item.productId?.image && (
                        <img
                          src={`/${item.productId.image}`}
                          alt={item.productId.name}
                          className="order-item-img2"
                        />
                      )}
                      <span className="item-name2">
                        {item.productId?.name || "Deleted product"}
                      </span>
                      <span className="item-qty2">× {item.quantity}</span>
                    </div>
                    {item.supplements?.length > 0 && (
                      <ul className="supplements-list2">
                        {item.supplements.map((sup, i) => (
                          <li key={i} className="supplement-item2">
                            + {sup.name} ({sup.price.toFixed(2)} dt)
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
