import { useEffect, useState } from 'react';
import './favourites.css';
import { fetchFavorites,removeFavorites } from '../../../api/userApi';
import { useSelector } from 'react-redux';
import ProductCard from '../2-hero/cardProduct';

const Favourites = () => {
  const [favourites, setFavourites] = useState([]);
  const { currentUser } = useSelector((state) => state.userElement);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const data = await fetchFavorites(currentUser._id);
        setFavourites(data || []);
      } catch (err) {
        console.error("Error loading favourites:", err);
      }
    };

    loadFavorites();
  }, [currentUser._id]);
 //// rempove product from favorites
    const handleUnlike = async (productId) => {
    try {
      await removeFavorites(currentUser._id, productId);
      setFavourites((prev) => prev.filter((fav) => fav._id !== productId));
    } catch (err) {
      console.error("Error removing favourite:", err);
    }
  };

  return (
    <div className="favourites-container">
      <h2 className="fav-title">My Favourites </h2>

      {favourites.length === 0 ? (
        <p className="no-fav">No favourites yet</p>
      ) : (
        <div className="fav-grid">
          {favourites.map((fav) => (
            <ProductCard key={fav._id} liked={true}  onUnlike={handleUnlike} {...fav} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favourites;
