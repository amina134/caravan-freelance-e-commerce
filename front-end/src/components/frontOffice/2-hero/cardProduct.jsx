import React, { useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { FiShoppingCart, FiHeart } from "react-icons/fi";
import "./cardProduct.css";

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = ROTATION_RANGE /2 ;

const ProductCard = ({ name, description, price, image }) => {
  const ref = useRef(null);

  const [liked, setLiked] = useState(false);

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

  return (
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
      <div className="food-image-wrapper">
        <img src={image} alt={name} className="food-image" />
        <span className="food-price">{price}dt</span>
      </div>

      {/* Content section clickable */}
      <div
        className="food-content"
        onClick={() => alert(`Clicked on ${name}`)} // You can replace this with navigation or details modal
      >
        <h3 className="food-title">{name}</h3>
        <p className="food-desc">{description}</p>

        {/* Icons container */}
        <div className="food-icons">
          <button
            className={`heart-btn ${liked ? "liked" : ""}`}
            onClick={(e) => {
              e.stopPropagation(); // prevent triggering content click
              setLiked(!liked);
            }}
          >
            <FiHeart size={20} />
          </button>
          <button
            className="cart-btn"
            onClick={(e) => {
              e.stopPropagation();
              alert(`Added ${name} to cart!`);
            }}
          >
            <FiShoppingCart size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
