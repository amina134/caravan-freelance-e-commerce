import React, { useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { FiShoppingCart, FiHeart
  
} from "react-icons/fi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoTrash } from "react-icons/go";
import "./cardProduct.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { addItemToCart, updateQuantityApi,removeItemFromCart } from "../../../api/cartApi";
import { addFavorites,removeFavorites } from "../../../api/userApi";

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = ROTATION_RANGE / 2;

const ProductCard = ({ _id, name, description, price, image,liked: initialLiked = false ,onUnlike }) => {
  const { currentUser } = useSelector((state) => state.userElement);
  const ref = useRef(null);

  const [liked, setLiked] = useState(initialLiked);
  const [quantity, setQuantity] = useState(0); 
  const x = useMotionValue(0);
  const y = useMotionValue(-5);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Add item to cart
  const handleAddToCart = async (e) => {
    e.stopPropagation();
    setQuantity(1); // 👈 set first quantity to 1
    await addItemToCart(currentUser._id, _id, 1);

    toast.success(`${name} added to cart!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
    });
  };

  // Increase qty
  const handleIncrease = async (e) => {
    e.stopPropagation();
    const newQty = quantity + 1;
    setQuantity(newQty);
    console.log("currentUser._id :",currentUser._id,"id product ",_id,"quantity ",newQty)
    await updateQuantityApi(currentUser._id, _id, newQty);
  };

  // Decrease qty or remove
  const handleDecrease = async (e) => {
    e.stopPropagation();
    if (quantity === 1) {
      setQuantity(0); // remove
      toast.info(`${name} removed from cart`, { autoClose: 2000 });
      await removeItemFromCart(currentUser._id, _id)
    } else {
      const newQty = quantity - 1;
      setQuantity(newQty);
      await addItemToCart(currentUser._id, _id, newQty);
    }
  };
  const handleToggleFavorite = async (e) => {
  e.stopPropagation();
  try {
      if (liked) {
        await removeFavorites(currentUser._id, _id);
        setLiked(false);

       
        if (onUnlike) {
          onUnlike(_id);
        }
      } else {
        await addFavorites(currentUser._id, _id);
        setLiked(true);
      } }catch (err) {
    console.error("Error updating favorites:", err);
    toast.error("Could not update favorites");
  }
};

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d", transform }}
      className="food-card"
    >
      <Link to={`/ProductInformation/${_id}`}>
        <div className="food-image-wrapper">
          <img src={`/${image}`} alt={name} className="food-image" />
          <span className="food-price">{price}dt</span>
        </div>
      </Link>

      <div className="food-content">

        <h3 className="food-title">{name}</h3>
        <p className="food-desc">{description}</p>

        <div className="food-icons">
          {/*  Like */}
          <button
            className={`heart-btn ${liked ? "liked" : ""}`}
            onClick={handleToggleFavorite}
          >
            <FiHeart size={20} />
          </button>

          {/* Carttttttttttttttttttttttttttttttttttttttttttttt*/}
          {quantity === 0 ? (
            // Initial "Add to cart"
            <button className="cart-btn" onClick={handleAddToCart}>
              <FiShoppingCart size={20} />
            </button>
          ) : (
            // Quantity controls
            <div className="cart-qty-controls">
              <button onClick={handleDecrease} className="qty-btn">
                {quantity === 1 ? <GoTrash    className="trash-icon" /> 
                : "-"}
              </button>
              <span className="qty-display">{quantity}</span>
              <button onClick={handleIncrease} className="qty-btn">
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
