import './menu.css';
import { useSelector } from 'react-redux';
import ProductCard from '../2-hero/cardProduct';
import { useState ,useEffect} from 'react';
import { useLocation } from "react-router-dom";
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css';
const Menu = () => {
  const products = useSelector(state => state.productElement || []);
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortOption, setSortOption] = useState("bestSellers");

  const [activeFilters, setActiveFilters] = useState(0);
  const location = useLocation();
  const categories = ["All", "Pizza", "Burger", "Hot Dog", "Poutine"];
  const sortOptions = [
    { value: "bestSellers", label: "Best Sellers" },
    { value: "priceAsc", label: "Price: Low to High" },
    { value: "priceDesc", label: "Price: High to Low" },
    { value: "newest", label: "Newest First" }
  ];

  // Calculate active filters count
  const updateActiveFiltersCount = () => {
    let count = 0;
    if (activeCategory !== "All") count++;
    if (priceRange[0] > 0 || priceRange[1] < 50) count++;

    setActiveFilters(count);
  };

  // Reset all filters
  const resetFilters = () => {
    setActiveCategory("All");
    setPriceRange([0, 50]);
    setSortOption("bestSellers");
  
    setActiveFilters(0);
  };

  // Filter products by category + price + rating
  const filteredProducts = products.filter(p => {
    const inCategory = activeCategory === "All" || p.category === activeCategory;
    const inPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
    
    return inCategory && inPrice ;
  });


  // Update active filters count when dependencies change
  useState(() => {
    updateActiveFiltersCount();
  }, [activeCategory, priceRange]);
  useEffect(() => {
    if (location.state?.category) {
      setActiveCategory(location.state.category);
    }
  }, [location.state]);
  return (
    <div className="menu-layout">

      {/* Filters Column */}
      <div className="filter-setup">
        <div className="filter-header">
          <h2>Filters {activeFilters > 0 && <span className="filter-count">{activeFilters}</span>}</h2>
          <button className="reset-btn" onClick={resetFilters}>
            Reset All
          </button>
        </div>

        {/* Category Filter */}
        <div className="filter-section">
          <h3>Category</h3>
          <div className="chip-container">
            {categories.map((cat, i) => (
              <div
                key={i}
                className={`chip ${activeCategory === cat ? "active" : ""}`}
                onClick={() => {
                  setActiveCategory(cat);
                  updateActiveFiltersCount();
                }}
              >
                {cat}
              </div>
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div className="filter-section">
          <h3>Price Range: {priceRange[0]}dt - {priceRange[1]}dt</h3>
          <div className="price-range">
            <div className="slider-container">
              <div 
                className="slider-track"
                style={{ 
                  left: `${(priceRange[0] / 50) * 100}%`, 
                  width: `${((priceRange[1] - priceRange[0]) / 50) * 100}%` 
                }}
              ></div>
              <input 
                type="range" 
                min="0" 
                max="50" 
                value={priceRange[0]} 
                onChange={e => {
                  const value = Math.min(+e.target.value, priceRange[1] - 5);
                  setPriceRange([value, priceRange[1]]);
                  updateActiveFiltersCount();
                }}
                className="slider-thumb"
              />
              <input 
                type="range" 
                min="0" 
                max="50" 
                value={priceRange[1]} 
                onChange={e => {
                  const value = Math.max(+e.target.value, priceRange[0] + 5);
                  setPriceRange([priceRange[0], value]);
                  updateActiveFiltersCount();
                }}
                className="slider-thumb"
              />
            </div>
            <div className="price-labels">
              <span>0 dt</span>
              <span>50 dt</span>
            </div>
          </div>
        </div>

        

        {/* Sort Options */}
        <div className="filter-section">
          <h3>Sort By</h3>
          <div className="sort-options">
            {sortOptions.map(option => (
              <div 
                key={option.value}
                className={`sort-option ${sortOption === option.value ? 'active' : ''}`}
                onClick={() => setSortOption(option.value)}
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>

        {/* Apply Button (for mobile) */}
        <button className="apply-filters">
          Apply Filters
        </button>
      </div>

      {/* Products Column */}
      <div className="products-column">
        {/* Category Navigation */}
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
      <ToastContainer
        position="top-right"
        className="my-toast-container"
        toastClassName="my-toast"
        bodyClassName="my-toast-body"
       
        autoClose={2000}

        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ marginTop: '100px' ,}} // Add some top margin to prevent overlap with header
      />
    </div>
  );
};

export default Menu;