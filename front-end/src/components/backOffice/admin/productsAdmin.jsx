import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Search,
  Package,
  SlidersHorizontal,
} from "lucide-react";
import { useSelector } from "react-redux";
import { deleteProduct, postProduct, updateProduct } from "../../../api/productApi";
import { v4 as uuidv4 } from "uuid";
import "./productsAdmin.css";

const ProductsAdmin = () => {
  const productsRedux = useSelector((state) => state.productElement || []);
  const [products, setProducts] = useState(productsRedux);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("bestSellers");
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [activeFilters, setActiveFilters] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    category: "Burger",
    image: "",
    isAvailable: true,
  });

  const categories = ["All", "Pizza", "Burger", "Hot Dog", "Poutine"];
  const sortOptions = [
    { value: "bestSellers", label: "Best Sellers" },
    { value: "priceAsc", label: "Price: Low to High" },
    { value: "priceDesc", label: "Price: High to Low" },
    { value: "newest", label: "Newest First" },
  ];

  useEffect(() => setProducts(productsRedux), [productsRedux]);

  useEffect(() => {
    let count = 0;
    if (selectedCategory !== "All") count++;
    if (priceRange[0] > 0 || priceRange[1] < 50) count++;
    if (sortOption !== "bestSellers") count++;
    setActiveFilters(count);
  }, [selectedCategory, priceRange, sortOption]);

  const resetFilters = () => {
    setSelectedCategory("All");
    setPriceRange([0, 50]);
    setSortOption("bestSellers");
    setSearchTerm("");
  };

  const filteredProducts = products
    .filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase());
      const inCategory = selectedCategory === "All" || p.category === selectedCategory;
      const inPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      return matchesSearch && inCategory && inPrice;
    })
    .sort((a, b) => {
      switch (sortOption) {
        case "priceAsc": return a.price - b.price;
        case "priceDesc": return b.price - a.price;
        case "newest": return b.id - a.id;
        default: return 0;
      }
    });

  const handleAddProduct = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      description: "",
      price: 0,
      category: "Burger",
      image: "",
      isAvailable: true,
    });
    setShowModal(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setFormData({ ...product });
    setShowModal(true);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(id);
      setProducts(products.filter((p) => p._id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProduct) {
      updateProduct(editingProduct._id, formData);
      setProducts(products.map((p) =>
        p._id === editingProduct._id ? { ...formData, _id: p._id } : p
      ));
    } else {
      postProduct(formData);
      setProducts([...products, { ...formData, _id: uuidv4() }]);
    }
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="Products-admin-layout">
      {/* Sidebar Filters */}
      <aside className="Filter-sidebar">
        <div className="Filter-header1">
          <h2>
            <SlidersHorizontal size={18} /> Filters{" "}
            {activeFilters > 0 && <span className="Filter-count1">{activeFilters}</span>}
          </h2>
          <button className="Reset-btn1" onClick={resetFilters}>
            Reset All
          </button>
        </div>

        <div className="Filter-section1">
          <h3>Category</h3>
          <div className="Chip-container1">
            {categories.map((cat) => (
              <div
                key={cat}
                className={`Chip1 ${selectedCategory === cat ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </div>
            ))}
          </div>
        </div>

        <div className="Filter-section1">
          <h3>Price: {priceRange[0]}dt - {priceRange[1]}dt</h3>
          <div className="Slider-container1">
            <input
              type="range" min="0" max="50" value={priceRange[0]}
              onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
              className="Slider-thumb1"
            />
            <input
              type="range" min="0" max="50" value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
              className="Slider-thumb1"
            />
          </div>
        </div>

        <div className="Filter-section1">
          <h3>Sort By</h3>
          <div className="Custom-dropdown" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <div className="Dropdown-selected">
              {sortOptions.find((opt) => opt.value === sortOption)?.label} ▼
            </div>
            {isDropdownOpen && (
              <ul className="Dropdown-list">
                {sortOptions.map((opt) => (
                  <li
                    key={opt.value}
                    className={`Dropdown-item ${sortOption === opt.value ? "active" : ""}`}
                    onClick={() => { setSortOption(opt.value); setIsDropdownOpen(false); }}
                  >
                    {opt.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
          <div className="Search-wrapper">
          <Search className="Search-icon" size={20} />
          <input
            type="text"
            placeholder="Search products..."
            className="Search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </aside>

      {/* Main Section */}
      <main className="Products-admin">
        <header className="Admin-header">
          <div className="Header-content">
            <h1 className="Page-title">Products Management</h1>
            <p className="Page-subtitle">Manage your restaurant menu items</p>
          </div>
          <button className="Btn-add-product" onClick={handleAddProduct}>
            <Plus size={20} /> Add Product
          </button>
        </header>

      

        <div className="Products-grid">
          {filteredProducts.map((product) => (
            <div key={product._id} className="Product-card">
              <div className="Product-image-wrapper">
                <img src={product.image} alt={product.name} className="Product-image" />
                <div className={`Availability-badge ${product.isAvailable ? "available" : "unavailable"}`}>
                  {product.isAvailable ? "Available" : "Unavailable"}
                </div>
              </div>
              <div className="Product-content">
                <div className="Product-header">
                  <h3 className="Product-name">{product.name}</h3>
                  <span className="Product-category">{product.category}</span>
                </div>
                <p className="Product-description">{product.description}</p>
                <div className="Product-footer">
                  <span className="Product-price">{product.price}dt</span>
                  <div className="Product-actions">
                    <button className="Action-btn edit-btn" onClick={() => handleEditProduct(product)}><Edit2 size={16} /></button>
                    <button className="Action-btn delete-btn" onClick={() => handleDeleteProduct(product._id)}><Trash2 size={16} /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="Empty-state">
            <Package size={64} />
            <h3>No products found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductsAdmin;
