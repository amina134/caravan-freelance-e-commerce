import Navbar from '../1-header/navbar';
import ProductCard from '../2-hero/cardProduct';
import CarouselPage from '../2-hero/carousel';



import CarouselBurger from '../2-hero/test';
import ProductCarousel from './carouselProducts';

import './homepage.css';
const Homepage=()=>{
   return(
    <div className="home-overall">
        <Navbar/>
       <CarouselPage/>
    
    
       <ProductCarousel/>
      
   
    </div>
   ) 
}
export default Homepage;