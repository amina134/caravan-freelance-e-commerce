import './navbar.css'
import { BsSearch } from "react-icons/bs";
import { RiPokerHeartsLine } from "react-icons/ri";
import { BsCart3 } from "react-icons/bs";
import { FiUser } from "react-icons/fi";

const Navbar=()=>{
    return(
        <div>
            <div>
               <img src="/logo.png" alt="Caravan"/>
               
            </div>
            <div>
               <ul>
                <li>Home</li>
                <li>Menu</li>
                <li>Contact</li>
                <li>About</li>
               </ul>
            </div>
            <div className="search-container">
                
                <input
                    type="text"
                    className="search-input"
                    placeholder="What are you looking for ?"
                />
                <span className="search-icon"><BsSearch /></span>
            </div>
            <div>
               <RiPokerHeartsLine/>
               <BsCart3/>
               <FiUser/>

            </div>
        </div>
    )
}
export default Navbar