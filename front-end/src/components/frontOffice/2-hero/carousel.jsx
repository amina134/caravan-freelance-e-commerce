
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './carousel.css';
import { gsap } from "gsap";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import React, { useEffect, useRef } from "react";

import * as motion from "motion/react-client"
const CarouselPage = () => {




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
          className="custom-arrow next"
        >
          <IoIosArrowForward />
        </button>
      )}
      showIndicators={true}
      infiniteLoop={true}
      showThumbs={false}
      autoPlay={false}
    >
     <div className="slide1">
  <div className="part1-slide">
    <div className='part1-slide1'>
    <h3 className="text1-title">THE ULTIMATE</h3>
    <h2 className="text2-title">Burger Club</h2>
    <h6 className="text3-title">Fast. Flavorful. Unforgettable.</h6>
     <div className="slide1-buttons">
      
      <button className="btn-secondary">See Menu</button>
      <button className="btn-primary">Order Now</button>
    </div>
    </div>
     <div className='categories-slide1'>
      <div className='category-slide'>
        <img className='category-img ' src='productImages/pizza1.png'/>
        <h4>Pizza</h4>
        <h6>Delicous and cheesy</h6>
      </div>
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
      
        <div className='slid3-des'>
           <img  className='slid-img'src='/pizza3.png'/>
        </div>
       {/* <div>
       <h1 className='pizza-catch'>Your Favorite Pizza .Just a click away</h1>
       </div> */}
     
    <svg
  viewBox="0 0 40 10"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    id="circlePath"
    d="
      M 10, 50
      a 40,40 0 1,1 80,0
      40,40 0 1,1 -80,0
    "
  />
  <text>
    <textPath href="#circlePath">
      Your text here!
    </textPath>
  </text>
</svg>

       
      </div>
    </Carousel>
    
      
  );
};

export default CarouselPage;
