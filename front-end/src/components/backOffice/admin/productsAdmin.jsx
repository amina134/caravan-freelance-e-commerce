import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, X, DollarSign, Package, Tag, ImageIcon, SlidersHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import './productsAdmin.css';
import { deleteProduct, postProduct, updateProduct } from '../../../api/productApi';
import { v4 as uuidv4 } from "uuid";
const ProductsAdmin = () => {
  const productsRedux = useSelector(state => state.productElement || []);
  console.log("products admin",productsRedux)
  const [products, setProducts] = useState(productsRedux);
  const [isOpen, setIsOpen] = useState(false);
  const handleSelect = (value) => {
    setSortOption(value);
    setIsOpen(false);
  };
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
    isAvailable: true
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
      price: 0,
      category: 'Burger',
      image: '',
      isAvailable: true
    });
 
    setShowModal(true);
  };

  const handleEditProduct = (product) => {
    console.log("is is editing",product)
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.image,
      isAvailable: product.isAvailable
    });
    console.log("is show model",showModal)
    setShowModal(true);
    console.log("yes show model",showModal)
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const deleteProd= deleteProduct(id)
      setProducts(products.filter(p => p._id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProduct) {
      
      const updatedProd=updateProduct(editingProduct._id,{...formData})
      setProducts(products.map(p => p._id === editingProduct._id ? { ...formData, id: p._id } : p));
    } else {
      console.log("from dataaaa",formData)
      // const produiit={ ...formData}
      //  console.log("from produiit",produiit)
      postProduct({ ...formData})
      setProducts([...products, { ...formData, _id: uuidv4() }]);
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
      <div className="filter-sidebar">
        <div className="filter-header1">
          <h2><SlidersHorizontal size={18}/> Filters {activeFilters > 0 && <span className="filter-count1">{activeFilters}</span>}</h2>
          <button className="reset-btn1" onClick={resetFilters}>Reset All</button>
        </div>

        {/* Category Filter */}
        <div className="filter-section1">
          <h3>Category</h3>
          <div className="chip-container1">
            {categories.map(cat => (
              <div
                key={cat}
                className={`chip1 ${selectedCategory === cat ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </div>
            ))}
          </div>
        </div>

        {/* Price Filter */}
        <div className="filter-section1">
          <h3>Price Range: {priceRange[0]}dt - {priceRange[1]}dt</h3>
          <div className="price-range1">
            <div className="slider-container1">
              <div 
                className="slider-track1"
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
                className="slider-thumb1"
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
                className="slider-thumb1"
              />
            </div>
            
          </div>
        </div>

        {/* Sort Filter */}
       {/* Sort Filter */}
      <div className="filter-section1">
      <h3>Sort By</h3>

      <div className="custom-dropdown" onClick={() => setIsOpen(!isOpen)}>
        <div className="dropdown-selected">
          {sortOptions.find(option => option.value === sortOption)?.label || "Select option"}
          <span className={`arrow ${isOpen ? "open" : ""}`}>▼</span>
        </div>

        {isOpen && (
          <ul className="dropdown-list">
            {sortOptions.map(option => (
              <li
                key={option.value}
                className={`dropdown-item ${sortOption === option.value ? "active" : ""}`}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
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
          <button className="btn-add-product" onClick={handleAddProduct}>
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
            <div key={product._id } className="product-card">
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
                    <button className="action-btn delete-btn" onClick={() => handleDeleteProduct(product._id)}>
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


        {/* //// model */}
         {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                <X size={24} />
              </button>
            </div>
            <form className="product-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    <Tag size={16} />
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter product name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">
                    <DollarSign size={16} />
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="0.00"
                    step="0.01"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Package size={16} />
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="form-select"
                  required
                >
                  {categories.filter(c => c !== 'All').map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Package size={16} />
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="form-textarea"
                  placeholder="Enter product description"
                  rows="3"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <ImageIcon size={16} />
                  Image Path
                </label>
                <input
                 
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="productImages/imagename"
                  required
                />
              </div>

              <div className="form-group-checkbox">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="isAvailable"
                    checked={formData.isAvailable}
                    onChange={handleInputChange}
                    className="form-checkbox"
                  />
                  <span>Product is available</span>
                </label>
              </div>

              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      </div>
    </div>
  );
};

export default ProductsAdmin;
