import React, { useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { FiShoppingCart, FiHeart, FiCheck } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "./cardProduct.css";
import { Link } from "react-router-dom";

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = ROTATION_RANGE / 2;

const ProductCard = ({ _id, name, description, price, image }) => {
  const ref = useRef(null);
  const [liked, setLiked] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(-5);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return [0, 0];

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

  const handleAddToCart = (e) => {
    e.stopPropagation();
    setAddedToCart(true);

    
    // Reset the tick icon after 2 seconds
    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };

  return (
     <>
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform,
      }}
      className="food-card"
    >
      <Link to={`/ProductInformation/${_id}`}>
        <div className="food-image-wrapper">
          <img src={`/${image}`} alt={name} className="food-image" />
          <span className="food-price">{price}dt</span>
        </div>
         </Link>
        <div
          className="food-content"
          onClick={() => alert(`Clicked on ${name}`)}
        >
          <h3 className="food-title">{name}</h3>
          <p className="food-desc">{description}</p>

          <div className="food-icons">
            <button
              className={`heart-btn ${liked ? "liked" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                setLiked(!liked);
              }}
            >
              <FiHeart size={20} />
            </button>
            <button
              className={`cart-btn ${addedToCart ? "added" : ""}`}
              onClick={handleAddToCart}
            >
              {addedToCart ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  <FiCheck size={20} />
                </motion.div>
              ) : (
                <FiShoppingCart size={20} />
              )}
            </button>
          </div>
        </div>
   
    </motion.div>
     

     </>
  );
};

export default ProductCard;