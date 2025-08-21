import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './carousel.css';

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

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
