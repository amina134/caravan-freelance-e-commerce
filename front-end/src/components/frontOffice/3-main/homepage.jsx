import Navbar from '../1-header/navbar';
import CarouselPage from '../2-hero/carousel';
import Favourites from '../2-hero/favourites';

import CarouselBurger from '../2-hero/test';

import './homepage.css';
const Homepage=()=>{
   return(
    <div className="home-overall">
        <Navbar/>
       <CarouselPage/>
       <Favourites/>
      
   
    </div>
   ) 
}
export default Homepage;