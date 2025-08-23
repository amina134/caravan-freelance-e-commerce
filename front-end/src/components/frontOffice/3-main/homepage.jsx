import Navbar from '../1-header/navbar';
import ProductCard from '../2-hero/cardProduct';
import CarouselPage from '../2-hero/carousel';



import CarouselBurger from '../2-hero/test';
import Footer from '../5-footer/footer';
import ProductCarousel from './carouselProducts';
import ChefSection from './chef';

import './homepage.css';
const Homepage=()=>{
   return(
    <div className="home-overall">
        <Navbar/>
       <CarouselPage/>
    
    
       <ProductCarousel/>
       <ChefSection/>
       <Footer/>
      
   
    </div>
   ) 
}
export default Homepage;