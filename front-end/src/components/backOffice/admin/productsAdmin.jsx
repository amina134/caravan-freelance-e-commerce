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
    <div className="ProductsAdmin-layout">
      {/* Sidebar Filters */}
      <aside className="ProductsAdmin-sidebar">
        <div className="ProductsAdmin-filterHeader">
          <h2>
            <SlidersHorizontal size={18} /> Filters{" "}
            {activeFilters > 0 && <span className="ProductsAdmin-filterCount">{activeFilters}</span>}
          </h2>
          <button className="ProductsAdmin-resetBtn" onClick={resetFilters}>
            Reset All
          </button>
        </div>

        <div className="ProductsAdmin-filterSection">
          <h3>Category</h3>
          <div className="ProductsAdmin-chipContainer">
            {categories.map((cat) => (
              <div
                key={cat}
                className={`ProductsAdmin-chip ${selectedCategory === cat ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </div>
            ))}
          </div>
        </div>

        <div className="ProductsAdmin-filterSection">
          <h3>Price: {priceRange[0]}dt - {priceRange[1]}dt</h3>
          <div className="ProductsAdmin-sliderContainer">
            <input
              type="range" min="0" max="50" value={priceRange[0]}
              onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
              className="ProductsAdmin-sliderThumb"
            />
            <input
              type="range" min="0" max="50" value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
              className="ProductsAdmin-sliderThumb"
            />
          </div>
        </div>

        <div className="ProductsAdmin-filterSection">
          <h3>Sort By</h3>
          <div className="ProductsAdmin-dropdown" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <div className="ProductsAdmin-dropdownSelected">
              {sortOptions.find((opt) => opt.value === sortOption)?.label} ▼
            </div>
            {isDropdownOpen && (
              <ul className="ProductsAdmin-dropdownList">
                {sortOptions.map((opt) => (
                  <li
                    key={opt.value}
                    className={`ProductsAdmin-dropdownItem ${sortOption === opt.value ? "active" : ""}`}
                    onClick={() => { setSortOption(opt.value); setIsDropdownOpen(false); }}
                  >
                    {opt.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="ProductsAdmin-searchWrapper">
          <Search className="ProductsAdmin-searchIcon" size={20} />
          <input
            type="text"
            placeholder="Search products..."
            className="ProductsAdmin-searchInput"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </aside>

      {/* Main Section */}
      <main className="ProductsAdmin-main">
        <header className="ProductsAdmin-header">
          <div className="ProductsAdmin-headerContent">
            <h1 className="ProductsAdmin-pageTitle">Products Management</h1>
            <p className="ProductsAdmin-pageSubtitle">Manage your restaurant menu items</p>
          </div>
          <button className="ProductsAdmin-addBtn" onClick={handleAddProduct}>
            <Plus size={20} /> Add Product
          </button>
        </header>

        <div className="ProductsAdmin-grid">
          {filteredProducts.map((product) => (
            <div key={product._id} className="ProductsAdmin-card">
              <div className="ProductsAdmin-imageWrapper">
                <img src={product.image} alt={product.name} className="ProductsAdmin-image" />
                <div className={`ProductsAdmin-availability ${product.isAvailable ? "available" : "unavailable"}`}>
                  {product.isAvailable ? "Available" : "Unavailable"}
                </div>
              </div>
              <div className="ProductsAdmin-cardContent">
                <div className="ProductsAdmin-cardHeader">
                  <h3 className="ProductsAdmin-name">{product.name}</h3>
                  <span className="ProductsAdmin-category">{product.category}</span>
                </div>
                <p className="ProductsAdmin-description">{product.description}</p>
                <div className="ProductsAdmin-cardFooter">
                  <span className="ProductsAdmin-price">{product.price}dt</span>
                  <div className="ProductsAdmin-actions">
                    <button className="ProductsAdmin-editBtn" onClick={() => handleEditProduct(product)}><Edit2 size={16} /></button>
                    <button className="ProductsAdmin-deleteBtn" onClick={() => handleDeleteProduct(product._id)}><Trash2 size={16} /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="ProductsAdmin-emptyState">
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
