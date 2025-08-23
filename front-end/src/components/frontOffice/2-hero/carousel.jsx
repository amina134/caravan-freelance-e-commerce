
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
      <div className='slide1'>
      
          <div className='part1-slide'>
            <h3 className='text1-title'>THE ULTIMATE</h3>
            <h2 className='text2-title'>Burger Club</h2>
            <h6 className='text3-title'>Fast. Flavorful. Unforgettable. </h6>
         
          </div>
            <div className='part2-slide'>
        
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
         <div      className="img-burger1">   <img src="/bur.webp"/></div>
            </div>
      </div>
        
      <div className='slide2'>
         <div className='car hot1'>
             <div className='hot-dog-carousel'>
                <img src='productImages/Subject 15.png'/>
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
        <div className='part1-slide'>

        </div>
        <div className='part2-slide'>
          
        </div>
      </div>
    </Carousel>
    
      
  );
};

export default CarouselPage;
