import './checkoutForm.css';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Check, ShoppingCart } from 'lucide-react';
import { postOrder } from '../../../api/orderApi';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import cart from '../../../../../back-end/model/cart';
const CheckoutForm = ({ onSubmit }) => {
  const location = useLocation();
  const {currentUser}=useSelector((state)=>state.userElement);

  const [cartItems,setCartItems]=useState([])
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    address: '',
    city: '',
    notes: ''
   
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  // get the cart items 
  const cartItemsRedux = useSelector((state) => state.cartElement.items||[]);
  // console.log("cart items redux",cartItemsRedux)
  useEffect(() => {
  // Try to get cart from Redux first
  if (cartItemsRedux.length > 0) {
    setCartItems(cartItemsRedux);
    console.log("cart itemssss redux",cartItemsRedux);
  } else {
    // If Redux is empty, fallback to localStorage
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed)) setCartItems(parsed);
        console.log("Cartttttt from localStorage:", parsed);
      }
  }
}, [cartItemsRedux]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setIsSubmitting(true);
      if (!currentUser?._id) {
      alert("Please log in before placing an order.");
      setIsSubmitting(false);
      return;
    }
    if (onSubmit) 
       
      {
       
        onSubmit(formData);
     
      }
    console.log("cartItemsssssss",cartItems)
    const orderData = {
    userId:currentUser._id,
    ...formData,
    cartItems:cartItems ||[],
  };
    console.log("formdaaaaata",{...formData});

    const postedOrder=await postOrder(orderData)
    console.log("postedOrder",postedOrder)
    
    console.log('Order submitted', formData, cartItems);
    setTimeout(() => setIsSubmitting(false), 1000);
  };

  // const totalPrice = cart.reduce((acc, item) => {
  //   const itemPrice = item.productId.price * item.quantity;
  //   const extrasPrice = item.supplements?.reduce((sum, extra) => sum + extra.price * item.quantity, 0) || 0;
  //   return acc + itemPrice + extrasPrice;
  // }, 0);

  // const subtotal = totalPrice;
  // const tax = subtotal * 0.1;
  // const total = subtotal + tax;
  
  return (
    <div className="checkout-wrapper">
      <div className="checkout-form-container">
        <div className="form-header">
          <h2>Delivery Information</h2>
          <p>Complete your order details below</p>
        </div>
        
        <form className="checkout-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              id="name"
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number *</label>
            <input
              id="phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="XX XXX XXX"
              required
            />
          </div>
           
          <div className="form-group">
            <label htmlFor="address">Delivery Address *</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your complete address"
              rows="3"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="city">City / Area *</label>
            <input
              id="city"
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Tunis"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="notes">Additional Notes (Optional)</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Special instructions for delivery..."
              rows="2"
            />
          </div>

          <button type="submit" className={`checkout-btn ${isSubmitting ? 'loading' : ''}`} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Check size={18} /> Order Confirmed
              </>
            ) : (
              <>
                <ShoppingCart size={18} /> Place Order (Pay on Delivery)
              </>
            )}
          </button>
        </form>
      </div>

      <div className="checkout-summary-container">
        <div className="summary-header">
          <h3>Order Summary</h3>
          {/* <span className="item-count">{cart.length} items</span> */}
        </div>

        {/* {cart.length === 0 ? (
          <div className="empty-cart">
            <ShoppingCart size={40} />
            <p>Your cart is empty</p>
          </div>
        ) : (
          <div className="summary-content">
            <div className="summary-items">
              {cart.map((item) => {
                const itemTotal = item.productId.price * item.quantity +
                  (item.supplements?.reduce((sum, extra) => sum + extra.price * item.quantity, 0) || 0);
                
                return (
                  <div key={item._id || item.productId._id} className="summary-item">
                    <div className="item-main">
                      <span className="item-name">{item.productId.name}</span>
                      <span className="item-qty">x {item.quantity}</span>
                    </div>
                    <span className="item-price">{itemTotal.toFixed(2)} dt</span>
                    
                    {item.supplements && item.supplements.length > 0 && (
                      <div className="summary-extras">
                        {item.supplements.map((extra, idx) => (
                          <div key={idx} className="extra-item">
                            <span className="extra-name">+ {extra.name}</span>
                            <span className="extra-price">{(extra.price).toFixed(2)} dt</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="summary-divider"></div>

            <div className="summary-breakdown">
              <div className="breakdown-row">
                <span>Subtotal</span>
                <span>{subtotal.toFixed(2)} dt</span>
              </div>
              <div className="breakdown-row">
                <span>Tax (10%)</span>
                <span>{tax.toFixed(2)} dt</span>
              </div>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-total">
              <span>Total Amount</span>
              <span className="total-price">{total.toFixed(2)} dt</span>
            </div>

            <div className="payment-note">
              <p> Pay on delivery. No prepayment required.</p>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default CheckoutForm;