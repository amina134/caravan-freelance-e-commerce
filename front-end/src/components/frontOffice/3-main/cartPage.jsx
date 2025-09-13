
import { useEffect } from 'react';
import './cartPage.css';
import { useSelector, useDispatch } from 'react-redux';
import { setCart} from '../../../redux/cartSlice';
import { getCartByUserId, updateQuantityApi } from '../../../api/cartApi';
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
     // updateee backend 
     console.log("item infooous " ,item)
     const updateItem=await updateQuantityApi(currentUser._id, item.productId._id,updatedQuantity)
      console.log("UPDATED ITEM" ,updatedItem)
      dispatch(updateCartItemQuantity({ itemId: item.productId, quantity: updatedQuantity }));
    
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Cart</h2>
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
              <div className="cart-item-total">
                {(item.productId.price * item.quantity +
                  (item.productId.supplements
                    ? item.productId.supplements.reduce((sum, extra) => sum + extra.price * item.quantity, 0)
                    : 0)).toFixed(2)} dt
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
