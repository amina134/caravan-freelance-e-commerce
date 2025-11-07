import { useEffect, useState } from 'react';
import './orderSummary.css';
import { useLocation } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const OrderSummary = () => {
  const location = useLocation();
  const [orderSum, setOrderSum] = useState(null);
  const order = location.state?.order;
    
  const navigate = useNavigate();

  useEffect(() => {
    if (order) {
      setOrderSum({...order});
    }
  }, [order]);

  console.log("Order in summary:", orderSum);

  if (!orderSum) {
    return (
      <div className="order-summary-empty">
        <ShoppingCart size={40} />
        <p>No order found</p>
      </div>
    );
  }

  return (
    <div className="order-summary-wrapper">
     <button className="orders-btn" onClick={() => navigate("/userZone/myOrders")}>
      View My Orders
     </button>
      <h2 className="summary-title"> Order Successfully Placed!</h2>
      <p className="summary-subtitle">Thank you for your purchase, {orderSum.customerName}!</p>

      <div className="order-info">
        <h3> Order Details</h3>
        <p><strong>Order ID:</strong> {orderSum._id}</p>
        <p><strong>Status:</strong> {orderSum.status || "Pending"}</p>
        <p><strong>Total:</strong> {orderSum.totalPrice.toFixed(2)} dt</p>
      </div>

      <div className="delivery-info">
        <h3>Delivery Information</h3>
        <p><strong>Address:</strong> {orderSum.address}, {orderSum.city}</p>
        <p><strong>Phone:</strong> {orderSum.phone}</p>
        {orderSum.notes && <p><strong>Notes:</strong> {orderSum.notes}</p>}
      </div>

      <div className="cart-items">
        <h3> Items Ordered</h3>
        {orderSum.cartItems && orderSum.cartItems.length > 0 ? (
          <ul className="items-list">
            {orderSum.cartItems.map((item) => {
              const itemTotal =
                item.productId.price * item.quantity +
                (item.supplements?.reduce((sum, extra) => sum + extra.price * item.quantity, 0) || 0);

              return (
                <li key={item._id || item.productId._id} className="item">
                  <div className="item-details">
                    <span className="item-name">{item.productId.name}</span>
                    <span className="item-qty">x {item.quantity}</span>
                    <span className="item-price">{itemTotal.toFixed(2)} dt</span>
                  </div>

                  {item.supplements && item.supplements.length > 0 && (
                    <div className="item-extras">
                      {item.supplements.map((extra, idx) => (
                        <div key={idx} className="extra-line">
                          <span className="extra-name">+ {extra.name}</span>
                          <span className="extra-price">{extra.price.toFixed(2)} dt</span>
                        </div>
                      ))}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        ) : (
          <p>No items found</p>
        )}
      </div>

      <div className="final-note">
        <p> Please prepare the exact amount for payment on delivery.</p>
        <p> Estimated delivery time: 30–45 minutes.</p>
      </div>
    </div>
  );
};

export default OrderSummary;
