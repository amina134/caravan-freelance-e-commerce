import { useEffect } from 'react';
import './cartPage.css';
import { useSelector, useDispatch } from 'react-redux';
import { setCart, updateCartItemQuantity, removeFromCart, clearCart } from '../../../redux/cartSlice';
import { getCartByUserId, updateQuantityApi, removeItemFromCart, clearCartApi } from '../../../api/cartApi';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.userElement);
  const itemsRedux = useSelector((state) => state.cartElement.items);

  useEffect(() => {
    console.log('current user ', currentUser);
    if (currentUser && currentUser._id) {
      const fetchCartItems = async () => {
        try {
          const response = await getCartByUserId(currentUser._id);
          console.log('response items', response.cart.items);
          dispatch(setCart(response.cart.items));
        } catch (error) {
          console.error(error);
        }
      };
      fetchCartItems();
    }
  }, [currentUser, dispatch]);

  const totalPrice = itemsRedux.reduce((acc, item) => {
    const itemPrice = item.productId.price * item.quantity;
    const extrasPrice = item.productId.supplements
      ? item.productId.supplements.reduce((sum, extra) => sum + extra.price * item.quantity, 0)
      : 0;
    return acc + itemPrice + extrasPrice;
  }, 0);

  // update quantity item
  const handleQuantityChange = async(item, newQuantity) => {
    const updatedQuantity = Math.max(1, Math.min(Number(newQuantity), item.productId.stock));
    // update backend 
    const updateItem = await updateQuantityApi(currentUser._id, item.productId._id, updatedQuantity);
    
    console.log("item id heeyy", item.productId);
    dispatch(updateCartItemQuantity({ itemId: item.productId, quantity: updatedQuantity }));
  };

  // delete single item from cart
  const handleDeleteItem = async (item) => {
    try {
      // Call API to remove item from backend
      await removeItemFromCart(currentUser._id, item.productId);
      
      // Update Redux store
      dispatch(removeFromCart({ itemId: item.productId._id }));
      
      console.log('Item removed from cart:', item.productId._id);
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  // clear entire cart
  const handleClearCart = async () => {
    // Show confirmation dialog
    const isConfirmed = window.confirm('Are you sure you want to clear your entire cart?');
    
    if (isConfirmed) {
      try {
        // Call API to clear cart from backend
        await clearCartApi(currentUser._id);
        
        // Update Redux store
        dispatch(clearCart());
        
        console.log('Cart cleared successfully');
      } catch (error) {
        console.error('Error clearing cart:', error);
      }
    }
  };

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2 className="cart-title">Your Cart</h2>
        {itemsRedux.length > 0 && (
          <button className="clear-cart-btn" onClick={handleClearCart}>
            Clear Cart
          </button>
        )}
      </div>
      
      {itemsRedux.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      ) : (
        <div className="cart-items">
          {itemsRedux.map((item) => (
            <div key={item._id} className="cart-item">
              <img
                src={`/${item.productId.image}`} 
                alt={item.productId.name}
                className="cart-item-img"
              />
              <div className="cart-item-info">
                <h3>{item.productId.name}</h3>
                <p>{item.productId.price.toFixed(2)} dt</p>
                {/* Display extras/supplements */}
                {item.productId.supplements && item.productId.supplements.length > 0 && (
                  <div className="cart-extras">
                    <p className="extras-label">Extras:</p>
                    {item.productId.supplements.map((extra, index) => (
                      <div key={index} className="extra-item">
                        <span>{extra.name}</span>
                        <span>+{extra.price.toFixed(2)} dt</span>
                      </div>
                    ))}
                  </div>
                )}
                <div className="quantity-controls">
                  <button
                    aria-label="Decrease quantity"
                    onClick={() => handleQuantityChange(item, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    aria-label="Increase quantity"
                    onClick={() => handleQuantityChange(item, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="cart-item-actions">
                <div className="cart-item-total">
                  {(item.productId.price * item.quantity +
                    (item.productId.supplements
                      ? item.productId.supplements.reduce((sum, extra) => sum + extra.price * item.quantity, 0)
                      : 0)).toFixed(2)} dt
                </div>
                <button 
                  className="delete-item-btn"
                  onClick={() => handleDeleteItem(item)}
                  aria-label={`Remove ${item.productId.name} from cart`}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {itemsRedux.length > 0 && (
        <div className="cart-summary">
          <h3>Total: {totalPrice.toFixed(2)} dt</h3>
          <button className="checkout-btn" onClick={() => navigate('/checkout')}>
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;