
  import { Carousel } from 'react-responsive-carousel';
  import 'react-responsive-carousel/lib/styles/carousel.min.css';
  import './carousel.css';
  import { gsap } from "gsap";
  import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
  import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

  import * as motion from "motion/react-client"
  const CarouselPage = () => {
       const products = useSelector(state => state.productElement || []); // get the products 
       const [burger,setBurger]=useState({})
       const [hotDog,setHotDog]=useState({})
       const [poutine,setPoutine]=useState({})
       




    return (
    
      <Carousel
        className='carousel-homepage'
        renderArrowPrev={(onClickHandler, hasPrev, label) => (
          <button
            type="button"
            onClick={onClickHandler}
            title={label}
            className="custom-arrow prev"
          >
            <IoIosArrowBack />
          </button>
        )}
        renderArrowNext={(onClickHandler, hasNext, label) => (
          <button
            type="button"
            onClick={onClickHandler}
            title={label}
             showStatus={false} 
            className="custom-arrow next"
          >
            <IoIosArrowForward />
          </button>
        )}
        showIndicators={true}
        infiniteLoop={true}
        showThumbs={false}
        autoPlay={false}
        showStatus={false} 
      >
      <div className="slide1">
    <div className="part1-slide">
      <div className='part1-slide1'>
      <h3 className="text1-title">THE ULTIMATE</h3>
      <h2 className="text2-title">Burger Club</h2>
      <h6 className="text3-title">Fast. Flavorful. Unforgettable.</h6>
      <div className="slide1-buttons">
        
       <Link to='/Menu'> <button className="btn-secondary">See Menu</button></Link>
        <button className="btn-primary">Order Now</button>
      </div>
      </div>
      <div className='categories-slide1'>
        <Link to="/Menu" state={{ category: "Pizza" }}>
        <div className="category-slide">
          <img className="category-img" src="productImages/pizza1.png" />
          <h4>Pizza</h4>
          <h6>Delicious and cheesy</h6>
        </div>
        </Link>
        <div className='category-slide'>
          <img className='category-img ' src='productImages/Subject 14.png'/>
          <h4>Hot Dog</h4>
          <h6>Delicous and cheesy</h6>
        </div>
        <div className='category-slide'>
          <img  className='category-img 'src='bur.webp'/>
          <h4>Poutine</h4>
          <h6>Delicous and cheesy</h6>
        </div>
      </div>

    
      
    
      </div>
      <div className="part2-slide">
      
      <div>
        <div className="img-burger1">
        <img className="img-bur1" src="/bur.webp" alt="Delicious Burger" />
      </div>
      
    </div>
    </div>
    </div>



          {/* <motion.div
            
              className="img-burger1"
              
              whileHover={{
                
                  scale: [null, 1.1, 1.3],
                  transition: {
                      duration: 0.5,
                      times: [0, 0.6, 1],
                      ease: ["easeInOut", "easeOut"],
                  },
              }}
              transition={{
                  duration: 0.3,
                  ease: "easeOut",
              }}
          >
  
              <img className="img-bur1" src="/bur.webp" alt="burger" />
          </motion.div>
  */}
        
        
        <div className='slide2'>
          <div className='car hot1'>
              <div className='hot-dog-carousel'>
                  <img src='productImages/pizza1.png'/>
              </div>
          </div>
          <div className='car hot2'>
              <div className='hot-dog-carousel'>
                  <img src='productImages/Subject 13.png'/>
              </div>
          </div>
          <div className='car hot3'>
                <div className='hot-dog-carousel'>
                  <img src='productImages/Subject 14.png'/>
              </div>
          </div>
        
            
        
          <div>
            
          </div>
        </div>
        <div className='slide3'>
          <div className='text-slide3'>
             <h1 className='title-slide2'>Your Favourite Pizzas, just a click away</h1> 
             <h6 className='des-slide3'>Hot & frech Pizza. Delivered Fast</h6>
              <div className=" slide3-but">
        
        <button className="btn-secondary">See Menu</button>
        <button className="btn-primary">Order Now</button>
      </div>
          </div>
          <div></div>
          <div className='slid3-des'>
            <img  className='slid-img'src='/pizza3.png'/>
          </div>
          <div>hello</div>
        
      
   

        
        </div>
      </Carousel>
      
        
    );
  };

  export default CarouselPage;
