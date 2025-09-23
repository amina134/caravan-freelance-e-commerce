import { useParams } from 'react-router-dom';
import './productInformation.css';

import { useState, useEffect } from 'react';
import { getUniqueProduct } from '../../../api/productApi';
import SimilarItems from './similarItems';
import { addItemToCart, getCartByUserId } from '../../../api/cartApi';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { addToCart,setCart } from '../../../redux/cartSlice';
const ProductInformation = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSupplements, setSelectedSupplements] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const { currentUser } = useSelector((state) => state.userElement);
  const dispatch = useDispatch();
  useEffect(() => {

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getUniqueProduct(id);
        setProduct(data.product);
        console.log("prduct infooooo",data.product)
       
      } catch (err) {
        setError('Failed to load product information');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };


    if (id) {
      fetchProduct();
    }
  }, [id]);

  const toggleSupplement = (supplement) => {
    if (selectedSupplements.some(s => s.name === supplement.name)) {
      setSelectedSupplements(selectedSupplements.filter(s => s.name !== supplement.name));
    } else {
      setSelectedSupplements([...selectedSupplements, supplement]);
    }
  };

  const calculateTotalPrice = () => {
    if (!product) return 0;
    
    const supplementsPrice = selectedSupplements.reduce(
      (total, supplement) => total + supplement.price, 0
    );
    
    return (product.price + supplementsPrice) * quantity;
  };

  const handleAddToCart = async() => {
    console.log("prosucrrrr",product)
    
       await addItemToCart(currentUser._id, product._id, quantity, selectedSupplements);
       console.log("the prod to add in redux is :",product,"qty:",quantity,"supplements",selectedSupplements)
       const updatedCart=await getCartByUserId(currentUser._id);
      dispatch(setCart(updatedCart.cart.items));
    // Add to cart logic here
    // console.log('Adding to cart:', {
    //   product: product.name,
    //   quantity,
    //   supplements: selectedSupplements,
      
    // });
  
    
    
  };

  if (loading) {
    return (
      <div className="info-layout">
        <div className="loading-spinner">Loading product information...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="info-layout">
        <div className="error-message">
          {error || 'Product not found'}
        </div>
      </div>
    );
  }

  return (
    <div className="info-layout">
      <div className="product-container">
        {/* Product Image */}
        <div className="product-image">
          {product.image ? (
            <img src={`/${product.image}`} alt={product.name} />
          ) : (
            <div className="image-placeholder">
              <i className="fas fa-image"></i>
              <p>No image available</p>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="product-details">
          <div className="category-badge">{product.category}</div>
          
          <h1 className="product-name">{product.name}</h1>
          
          <p className="product-description">{product.description}</p>
          
          <div className="popularity">
            <span className="sold-count">{product.soldCount || 0} sold</span>
            {product.soldCount > 50 && (
              <span className="popular-badge">
                <i className="fas fa-fire"></i> Popular
              </span>
            )}
          </div>

          {/* Supplements Section */}
          {product.supplements && product.supplements.length > 0 && (
            <div className="supplements-section">
              <h3>Add Extras</h3>
              <div className="supplements-list">
                {product.supplements.map((supplement, index) => (
                  <div 
                    key={index} 
                    className={`supplement-item ${selectedSupplements.some(s => s.name === supplement.name) ? 'selected' : ''}`}
                    onClick={() => toggleSupplement(supplement)}
                  >
                    <div className="supplement-info">
                      <span className="supplement-name">{supplement.name}</span>
                      <span className="supplement-price">+{supplement.price}dt</span>
                    </div>
                    {!supplement.isAvailable && (
                      <span className="out-of-stock">Out of stock</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="quantity-selector">
            <label htmlFor="quantity">Quantity:</label>
            <div className="quantity-controls">
              <button 
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(prev => prev + 1)}>+</button>
            </div>
          </div>

          {/* Price and Add to Cart */}
          <div className="price-section">
            <div className="total-price">
              <span className="label">Total:</span>
              <span className="amount">{calculateTotalPrice().toFixed(2)}dt</span>
            </div>
            
             <Link  to="/userZone/cart"> <button 
              className="add-to-cart-btn"
              onClick={handleAddToCart}
              disabled={!product.isAvailable}
            >
              {product.isAvailable ? (
                <>
              <i className="fas fa-shopping-cart"></i>
                  Add to Cart
                </>
              ) : (
                'Out of Stock'
              )}
            </button></Link> 
          </div>
        </div>
      </div>
      <div>
        <SimilarItems foodCat={product.category} foodId={id}/>
      </div>
    </div>
  );
};

export default ProductInformation;