import Navbar from '../1-header/navbar';
import CarouselPage from '../2-hero/carousel';

import './homepage.css';
const Homepage=()=>{
   return(
    <div className="home-overall">
       <Navbar/>
       <CarouselPage/>
    </div>
   ) 
}
export default Homepage;