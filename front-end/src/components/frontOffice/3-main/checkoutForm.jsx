import './checkoutForm.css';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Check, ShoppingCart, AlertCircle, Package, Truck, CreditCard } from 'lucide-react';
import { postOrder } from '../../../api/orderApi';
import { useSelector } from 'react-redux';

const CheckoutForm = ({ onSubmit }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.userElement);
  const cartItemsRedux = useSelector((state) => state.cartElement.items || []);

  const [errorMsg, setErrorMsg] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    address: '',
    city: '',
    notes: ''
  });
  // validationg the phone number 
  const validatePhoneNumber = (phone) => {
  const phoneRegex = /^[2-5,9][0-9]{7}$/; // starts with 2,3,4,5,9 and 8 digits total
  return phoneRegex.test(phone);
};
  // Load cart items
  useEffect(() => {
    const getItemsFunc = async () => {
      if (cartItemsRedux.length > 0) {
        setCartItems(cartItemsRedux);
      } else {
        const savedCart = await localStorage.getItem('cartItems');
        if (savedCart) {
          const parsed = JSON.parse(savedCart);
          if (Array.isArray(parsed)) setCartItems(parsed || []);
        }
      }
    };
    getItemsFunc();
  }, [cartItemsRedux]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Calculate prices
  const totalPrice = cartItems.reduce((acc, item) => {
    const itemPrice = item.productId.price * item.quantity;
    const extrasPrice = item.supplements?.reduce((sum, extra) => sum + extra.price * item.quantity, 0) || 0;
    return acc + itemPrice + extrasPrice;
  }, 0);

  const deliveryFee = 7;
  const total = totalPrice + deliveryFee;

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    if (!currentUser?._id) {
      setErrorMsg("Please log in before placing an order.");
      setIsSubmitting(false);
      return;
    }
     // Validate phone
    if (!validatePhoneNumber(formData.phone)) {
      setErrorMsg("Please enter a valid phone number (8 digits, starting with 2, 3, 4, 5, or 9).");
      setIsSubmitting(false);
      return;
    }

    try {
      const orderData = {
        userId: currentUser._id,
        ...formData,
        cartItems: cartItems,
        totalPrice: total
      };

      const postedOrder = await postOrder(orderData);
      
      if (onSubmit) {
        onSubmit(formData);
      }

      navigate("/userZone/orderSummary", { state: { order: { ...postedOrder.order } } });
    } catch (error) {
      setErrorMsg(error.message || "You already have an active order. Please wait until it is delivered or cancelled before placing a new one.");
    } finally {
      setTimeout(() => setIsSubmitting(false), 1000);
    }
  };

  return (
    <div className="checkout-portal-wrapper">
      {/* Error Message */}
      {errorMsg && (
        <div className="checkout-alert-notification">
          <AlertCircle size={20} />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="checkout-main-container">
        {/* Left Side - Form */}
        <div className="checkout-form-section">
          <div className="checkout-delivery-card">
            <div className="delivery-card-header">
              <div className="header-icon-wrapper">
                <Truck size={24} />
              </div>
              <div className="header-content-info">
                <h2>Delivery Information</h2>
                <p>Please provide your delivery details</p>
              </div>
            </div>

            <form className="delivery-input-form" onSubmit={handleSubmit}>
              <div className="form-inputs-row">
                <div className="input-field-group">
                  <label htmlFor="name">
                    Full Name <span className="asterisk-required">*</span>
                  </label>
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

                <div className="input-field-group">
                  <label htmlFor="phone">
                    Phone Number <span className="asterisk-required">*</span>
                  </label>
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
              </div>

              <div className="input-field-group">
                <label htmlFor="address">
                  Delivery Address <span className="asterisk-required">*</span>
                </label>
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

              <div className="input-field-group">
                <label htmlFor="city">
                  City / Area <span className="asterisk-required">*</span>
                </label>
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

              <div className="input-field-group">
                <label htmlFor="notes">Additional Notes</label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Special instructions for delivery..."
                  rows="2"
                />
              </div>

              <button 
                type="submit" 
                className={`order-submit-button ${isSubmitting ? 'button-processing' : ''}`} 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Check size={20} />
                    <span>Processing Order...</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart size={20} />
                    <span>Place Order - Pay on Delivery</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right Side - Order Summary */}
        <div className="checkout-summary-section">
          <div className="checkout-order-summary-card">
            <div className="summary-card-header">
              <div className="header-icon-wrapper">
                <Package size={24} />
              </div>
              <div className="header-content-info">
                <h3>Order Summary</h3>
                <p>{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}</p>
              </div>
            </div>

            {cartItems.length === 0 ? (
              <div className="cart-empty-placeholder">
                <ShoppingCart size={48} />
                <p>Your cart is empty</p>
              </div>
            ) : (
              <>
                <div className="order-items-list-container">
                  {cartItems.map((item) => {
                    const itemTotal = item.productId.price * item.quantity +
                      (item.supplements?.reduce((sum, extra) => sum + extra.price * item.quantity, 0) || 0);

                    return (
                      <div key={item._id || item.productId._id} className="order-line-item">
                        <div className="line-item-header">
                          <div className="line-item-details">
                            <span className="product-name-text">{item.productId.name}</span>
                            <span className="product-quantity-badge">Qty: {item.quantity}</span>
                          </div>
                          <span className="line-item-total-price">{itemTotal.toFixed(2)} dt</span>
                        </div>

                        {item.supplements && item.supplements.length > 0 && (
                          <div className="product-supplements-list">
                            {item.supplements.map((extra, idx) => (
                              <div key={idx} className="supplement-line-row">
                                <span className="supplement-name-label">+ {extra.name}</span>
                                <span className="supplement-price-value">{extra.price.toFixed(2)} dt</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="order-summary-separator"></div>

                <div className="pricing-breakdown-section">
                  <div className="breakdown-line-item">
                    <span>Subtotal</span>
                    <span>{totalPrice.toFixed(2)} dt</span>
                  </div>
                  <div className="breakdown-line-item">
                    <span>Delivery Fee</span>
                    <span>{deliveryFee.toFixed(2)} dt</span>
                  </div>
                </div>

                <div className="order-summary-separator"></div>

                <div className="order-grand-total">
                  <span className="grand-total-label">Total Amount</span>
                  <span className="grand-total-value">{total.toFixed(2)} dt</span>
                </div>

                <div className="payment-method-notice">
                  <CreditCard size={20} />
                  <div>
                    <strong>Cash on Delivery</strong>
                    <p>Pay when you receive your order</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;