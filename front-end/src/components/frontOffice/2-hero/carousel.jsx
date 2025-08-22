
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
            <h2 className='hey'>heyyyyyyy</h2>
          </div>
            <div className='part2-slide'>
              <div   className="img-burger1"></div>
        {/* <motion.div
          
             className="img-burger1"
            style={{ zIndex: 10000 }}  
            whileHover={{
               
                scale: [null, 1.1, 1.6],
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
        </motion.div> */}
 <img className="img-bur1" src="/bur.webp" alt="burger" />
            </div>
      </div>
        
      <div className='slide2'>
        <div className='part1-slide'>

        </div>
        <div className='part2-slide'>
          
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
