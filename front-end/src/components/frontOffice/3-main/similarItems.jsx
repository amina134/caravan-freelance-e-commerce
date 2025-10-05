import { useSelector } from 'react-redux';
import './similarItems.css';
import ProductCard from '../2-hero/cardProduct';

const SimilarItems = ({ foodCat ,foodId }) => {
  const products = useSelector((state) => state.productElement || []);
  
  const similarProducts = products.filter(
    (element) => element.category === foodCat && element._id !=foodId
  );
  console.log("products images noooot",similarProducts)
  if (!similarProducts.length) return null; 

  return (
    <div className="similar-items-container">
      <h3>Similar Dishes</h3>
      <div className="similar-items-grid">
        {similarProducts.map((item) => (
          <ProductCard key={item._id} {...item} />
        ))}
      </div>
    </div>
  );
};


export default SimilarItems;

