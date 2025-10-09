import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, X, DollarSign, Package, Tag, ImageIcon, SlidersHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import './productsAdmin.css';

const ProductsAdmin = () => {
  const productsRedux = useSelector(state => state.productElement || []);
  const [products, setProducts] = useState(productsRedux);

  useEffect(() => {
    setProducts(productsRedux);
  }, [productsRedux]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOption, setSortOption] = useState('bestSellers');
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [activeFilters, setActiveFilters] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Main Course',
    image: '',
    available: true
  });

  const categories = ['All', 'Pizza', 'Burger', 'Hot Dog', 'Poutine'];
  const sortOptions = [
    { value: "bestSellers", label: "Best Sellers" },
    { value: "priceAsc", label: "Price: Low to High" },
    { value: "priceDesc", label: "Price: High to Low" },
    { value: "newest", label: "Newest First" }
  ];

  // Update active filter count
  useEffect(() => {
    let count = 0;
    if (selectedCategory !== 'All') count++;
    if (priceRange[0] > 0 || priceRange[1] < 50) count++;
    if (sortOption !== 'bestSellers') count++;
    setActiveFilters(count);
  }, [selectedCategory, priceRange, sortOption]);

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategory('All');
    setPriceRange([0, 50]);
    setSortOption('bestSellers');
    setSearchTerm('');
  };

  // Apply filtering logic
  const filteredProducts = products
    .filter(p => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase());
      const inCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const inPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      return matchesSearch && inCategory && inPrice;
    })
    .sort((a, b) => {
      switch (sortOption) {
        case 'priceAsc': return a.price - b.price;
        case 'priceDesc': return b.price - a.price;
        case 'newest': return b.id - a.id;
        default: return 0;
      }
    });

  // Form functions
  const handleAddProduct = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      category: 'Main Course',
      image: '',
      available: true
    });
    setShowModal(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.image,
      available: product.isAvailable
    });
    setShowModal(true);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? { ...formData, id: p.id } : p));
    } else {
      setProducts([...products, { ...formData, id: Date.now() }]);
    }
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="products-admin-layout">
      {/* Sidebar Filters */}
      <div className="filter-sidebar1">
        <div className="filter-header">
          <h2><SlidersHorizontal size={18}/> Filters {activeFilters > 0 && <span className="filter-count">{activeFilters}</span>}</h2>
          <button className="reset-btn" onClick={resetFilters}>Reset All</button>
        </div>

        {/* Category Filter */}
        <div className="filter-section">
          <h3>Category</h3>
          <div className="chip-container">
            {categories.map(cat => (
              <div
                key={cat}
                className={`chip ${selectedCategory === cat ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </div>
            ))}
          </div>
        </div>

        {/* Price Filter */}
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
            
          </div>
        </div>

        {/* Sort Filter */}
       {/* Sort Filter */}
        <div className="filter-section">
          <h3>Sort By</h3>
          <select
            className="sort-dropdown"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Main Admin Section */}
      <div className="products-admin">
        {/* Header */}
        <div className="admin-header">
          <div className="header-content">
            <h1 className="page-title">Products Management</h1>
            <p className="page-subtitle">Manage your restaurant menu items</p>
          </div>
          <button className="btn-add" onClick={handleAddProduct}>
            <Plus size={20} />
            Add Product
          </button>
        </div>

        {/* Search */}
        <div className="search-wrapper">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Search products..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image-wrapper">
                <img src={product.image} alt={product.name} className="product-image" />
                <div className={`availability-badge ${product.isAvailable ? 'available' : 'unavailable'}`}>
                  {product.isAvailable ? 'Available' : 'Unavailable'}
                </div>
              </div>
              <div className="product-content">
                <div className="product-header">
                  <h3 className="product-name">{product.name}</h3>
                  <span className="product-category">{product.category}</span>
                </div>
                <p className="product-description">{product.description}</p>
                <div className="product-footer">
                  <span className="product-price">{product.price}dt</span>
                  <div className="product-actions">
                    <button className="action-btn edit-btn" onClick={() => handleEditProduct(product)}>
                      <Edit2 size={16} />
                    </button>
                    <button className="action-btn delete-btn" onClick={() => handleDeleteProduct(product.id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="empty-state">
            <Package size={64} />
            <h3>No products found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsAdmin;
