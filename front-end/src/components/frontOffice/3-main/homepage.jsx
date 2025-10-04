import Navbar from '../1-header/navbar';
import ProductCard from '../2-hero/cardProduct';
import CarouselPage from '../2-hero/carousel';



<<<<<<< HEAD
import CarouselBurger from '../2-hero/test';
=======

>>>>>>> 47cb3df (correct corrupted git files)
import Footer from '../5-footer/footer';
import ProductCarousel from './carouselProducts';
import ChefSection from './chef';

import './homepage.css';
import Welcome from './welcome';
const Homepage=()=>{
   return(
    <div className="home-overall">
      
       <CarouselPage/>
    
    
       <ProductCarousel/>
       <ChefSection/>
       <Welcome/>
   
       
      
   
    </div>
   ) 
}
export default Homepage;