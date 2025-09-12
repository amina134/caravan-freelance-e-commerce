import { useEffect } from 'react';
import './cartPage.css';
import { useSelector, useDispatch } from 'react-redux';
import { setCart } from '../../../redux/cartSlice'; // make sure you import setCart action
import { getCartByUserId } from '../../../api/cartApi';
const CartPage = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.userElement);
  const itemsRedux = useSelector((state) => state.cartElement.items);
  
  useEffect(() => {
     console.log('current user ',currentUser)
    if (currentUser && currentUser._id) {
     
      const fetchCartItems = async () => {
        try {
          const response = await getCartByUserId(currentUser._id);
          console.log("response items", response.cart.items);
          dispatch(setCart(response.cart.items));
        } catch (error) {
          console.error(error);
        }
      };
      fetchCartItems();
    }
  }, [currentUser, dispatch]);

//   const totalPrice = itemsRedux.reduce(
//     (acc, item) => acc + item.productId.price * item.quantity,
//     0
//   );

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
                src={`http://localhost:5000/${item.productId.image}`}
                alt={item.productId.name}
                className="cart-item-img"
              />
              <div className="cart-item-info">
                <h3>{item.productId.name}</h3>
                <p>${item.productId.price.toFixed(2)}</p>
                <div className="quantity-controls">
                  <button>-</button>
                  <span>{item.quantity}</span>
                  <button>+</button>
                </div>
              </div>
              <div className="cart-item-total">
                ${(item.productId.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      )}
      {/* {itemsRedux.length > 0 && (
        <div className="cart-summary">
          <h3>Total: ${totalPrice.toFixed(2)}</h3>
          <button className="checkout-btn">Proceed to Checkout</button>
        </div>
      )} */}
    </div>
  );
};

export default CartPage;
