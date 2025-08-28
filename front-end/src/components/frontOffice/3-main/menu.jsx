import './menu.css';
import { useSelector } from 'react-redux';
import ProductCard from '../2-hero/cardProduct';
import { useState } from 'react';

const Menu = () => {
  const products = useSelector(state => state.productElement || []);
  const [priceRange, setPriceRange] = useState([0, 30]);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Pizza", "Burger", "Hot Dog", "Poutine"];

  // Filter products by category + price
  const filteredProducts = products.filter(p => {
    const inCategory = activeCategory === "All" || p.category === activeCategory;
    const inPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
    return inCategory && inPrice;
  });

  return (
    <div className="menu-layout">

      {/* Filters Column */}
      <div className="filter-setup">
        <h2>Filter Menu</h2>

        {/* Price Filter with Range */}
        <div className="filter-section">
          <h3>Price Range</h3>
          <div className="price-range">
            <input 
              type="range" 
              min="0" 
              max="50" 
              value={priceRange[0]} 
              onChange={e => setPriceRange([+e.target.value, priceRange[1]])}
            />
            <input 
              type="range" 
              min="0" 
              max="50" 
              value={priceRange[1]} 
              onChange={e => setPriceRange([priceRange[0], +e.target.value])}
            />
            <div className="price-display">
              ${priceRange[0]} - ${priceRange[1]}
            </div>
          </div>
        </div>

        {/* Sort By */}
        <div className="filter-section">
          <h3>Sort By</h3>
          <select className="sort-select">
            <option>Best Sellers</option>
            <option>Price Ascending</option>
            <option>Price Descending</option>
          </select>
        </div>
      </div>

      {/* Products Column */}
      <div className="products-column">
        {/* Category Slider/Navbar */}
        <div className="category-slider">
          {categories.map((cat, i) => (
            <button
              key={i}
              className={`category-btn ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Cards */}
        <div className="food-menu">
          {filteredProducts.map(element => (
            <ProductCard key={element._id} {...element} />
          ))}
        </div>
      </div>

    </div>
  );
};

export default Menu;
