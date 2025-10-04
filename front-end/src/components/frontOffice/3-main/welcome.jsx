import './welcome.css';
const Welcome=()=>{
    return(
        <div className="welcome-comp">
            <div className="welcome-img-container">
                <img className='welcome-img' src='/productImages/Subject 14.png'/>
            </div>
            <div className="welcome-side-container">
               <h2>Wecome to Our Restaurant</h2>
               <p>We believe every meal should be more than just food—it should be an experience. From fresh ingredients to warm hospitality, we strive to create moments that delight your taste buds and make you feel right at home.</p>
               <div className='welcome-buttons'>
<<<<<<< HEAD
                  <button className='menu-but-welcome'>Menu</button>
                  <button className='book-but-welcome'>Book A Table</button>
=======
                  <button className='menu-but-welcome'>See Menu</button>
                  <button className='book-but-welcome'>Order Now</button>
>>>>>>> 47cb3df (correct corrupted git files)
               </div>
            </div>
        </div>
    )
}
export default Welcome;