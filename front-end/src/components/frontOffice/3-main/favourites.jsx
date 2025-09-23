import { useEffect, useState } from 'react'
import './favourites.css'
import { fetchFavorites } from '../../../api/userApi'
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../2-hero/cardProduct';
const Favourites = () => {
  const [favourites, setFavourites] = useState([])
const { currentUser } = useSelector((state) => state.userElement);
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        console.log("userid ,",currentUser._id)
        const data = await fetchFavorites(currentUser._id);
        console.log("data favourites",data)
        setFavourites(data || []); // update state
      } catch (err) {
        console.error("Error loading favourites:", err);
      }
    };

    loadFavorites();
  }, []);

  return (
    <div className="favourites-container">
      <h2>My Favourites</h2>
      {favourites.length === 0 ? (
        <p>No favourites yet ❤️</p>
      ) : (
        <ul>
          {favourites.map((fav) => (
            <ProductCard key={fav._id}  liked={true}  {...fav}/>
        
          ))}
        </ul>
      )}
    </div>
  )
}

export default Favourites
