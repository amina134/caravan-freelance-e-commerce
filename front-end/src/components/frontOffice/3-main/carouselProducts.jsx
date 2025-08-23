// ProductCarousel.jsx
import React from "react";
import Slider from "react-slick";
import './carouselProducts.css'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from 'react-redux';
import ProductCard from "../2-hero/cardProduct";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

// Custom arrow components
const NextArrow = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="custom-arrow next"
      aria-label="Next products"
    >
      <IoIosArrowForward />
    </button>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="custom-arrow prev previous"
      aria-label="Previous products"
    >
      <IoIosArrowBack />
    </button>
  );
};

const ProductCarousel = () => {
  const products = useSelector(state => state.productElement || [])
  
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    cssEase: "ease-in-out",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      
      { 
        breakpoint: 1280, 
        settings: { 
          slidesToShow: 3,
        } 
      },
       { 
        breakpoint: 1024, 
        settings: { 
          slidesToShow: 2,
        } 
      },
      { 
        breakpoint: 768, 
        settings: { 
          slidesToShow: 2,
          arrows: false,
          dots: true
        } 
      },
      { 
        breakpoint: 640, 
        settings: { 
          slidesToShow: 1,
          arrows: false,
          dots: true,
          centerMode: true,
          centerPadding: '20px'
        } 
      },
      { 
        breakpoint: 480, 
        settings: { 
          slidesToShow: 1,
          arrows: false,
          dots: true,
          centerMode: true,
          centerPadding: '10px'
        } 
      }
    ]
  };

  return (
    <section className="part2-hompage">  
      <div className="text-section">
        <h1 className="special">Our Special Dishes</h1>
        <p className="special-para">
          Savor the flavors that make our menu unforgettable! Each dish is crafted with the finest ingredients, bursting with taste and made to delight every bite.
        </p>
      </div>
      
      <div className="carousel-container">
        <Slider {...settings} className="carousel-products">
          {products.map(element => (
            <div key={element._id} className="prod">
              <ProductCard key={element._id} {...element} className='single-prod'/>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default ProductCarousel;