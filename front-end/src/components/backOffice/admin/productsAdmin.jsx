import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Search,
  X,
  DollarSign,
  Package,
  Tag,
  ImageIcon,
  SlidersHorizontal,
} from "lucide-react";
import { useSelector } from "react-redux";
import styles from "./productsAdmin.module.css";
import { deleteProduct, postProduct, updateProduct } from "../../../api/productApi";
import { v4 as uuidv4 } from "uuid";

const ProductsAdmin = () => {
  const productsRedux = useSelector((state) => state.productElement || []);
  const [products, setProducts] = useState(productsRedux);
  const [isOpen, setIsOpen] = useState(false);
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
    price: "",
    category: "Main Course",
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

  const handleSelect = (value) => {
    setSortOption(value);
    setIsOpen(false);
  };

  useEffect(() => {
    setProducts(productsRedux);
  }, [productsRedux]);

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
        case "priceAsc":
          return a.price - b.price;
        case "priceDesc":
          return b.price - a.price;
        case "newest":
          return b.id - a.id;
        default:
          return 0;
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
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.image,
      isAvailable: product.isAvailable,
    });
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
      updateProduct(editingProduct._id, { ...formData });
      setProducts(
        products.map((p) =>
          p._id === editingProduct._id ? { ...formData, _id: p._id } : p
        )
      );
    } else {
      postProduct({ ...formData });
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
    <div className={styles.productsAdmin__layout}>
      {/* Sidebar Filters */}
      <aside className={styles.productsAdmin__filters}>
        <div className={styles.filters__header}>
          <h2>
            <SlidersHorizontal size={18} /> Filters{" "}
            {activeFilters > 0 && (
              <span className={styles.filters__count}>{activeFilters}</span>
            )}
          </h2>
          <button
            className={styles.filters__resetBtn}
            onClick={resetFilters}
          >
            Reset All
          </button>
        </div>

        {/* Category Filter */}
        <div className={styles.filters__section}>
          <h3>Category</h3>
          <div className={styles.filters__chips}>
            {categories.map((cat) => (
              <div
                key={cat}
                className={`${styles.filters__chip} ${
                  selectedCategory === cat ? styles.active : ""
                }`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </div>
            ))}
          </div>
        </div>

        {/* Price Filter */}
        <div className={styles.filters__section}>
          <h3>Price Range: {priceRange[0]}dt - {priceRange[1]}dt</h3>
          <div className={styles.filters__sliderContainer}>
            <div
              className={styles.filters__sliderTrack}
              style={{
                left: `${(priceRange[0] / 50) * 100}%`,
                width: `${((priceRange[1] - priceRange[0]) / 50) * 100}%`,
              }}
            ></div>
            <input
              type="range"
              min="0"
              max="50"
              value={priceRange[0]}
              onChange={(e) =>
                setPriceRange([+e.target.value, priceRange[1]])
              }
              className={styles.filters__sliderThumb}
            />
            <input
              type="range"
              min="0"
              max="50"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], +e.target.value])
              }
              className={styles.filters__sliderThumb}
            />
          </div>
        </div>

        {/* Sort Filter */}
        <div className={styles.filters__section}>
          <h3>Sort By</h3>
          <div
            className={styles.filters__dropdown}
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className={styles.filters__dropdownSelected}>
              {sortOptions.find((opt) => opt.value === sortOption)?.label}
              <span className={`${styles.arrow} ${isOpen ? styles.open : ""}`}>
                ▼
              </span>
            </div>
            {isOpen && (
              <ul className={styles.filters__dropdownList}>
                {sortOptions.map((option) => (
                  <li
                    key={option.value}
                    className={`${styles.filters__dropdownItem} ${
                      sortOption === option.value ? styles.active : ""
                    }`}
                    onClick={() => handleSelect(option.value)}
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </aside>

      {/* Main Section */}
      <main className={styles.productsAdmin__main}>
        <header className={styles.productsAdmin__header}>
          <div>
            <h1 className={styles.productsAdmin__title}>Products Management</h1>
            <p className={styles.productsAdmin__subtitle}>
              Manage your restaurant menu items
            </p>
          </div>
          <button
            className={styles.productsAdmin__addBtn}
            onClick={handleAddProduct}
          >
            <Plus size={20} /> Add Product
          </button>
        </header>

        <div className={styles.productsAdmin__search}>
          <Search className={styles.search__icon} size={20} />
          <input
            type="text"
            placeholder="Search products..."
            className={styles.search__input}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className={styles.productsAdmin__grid}>
          {filteredProducts.map((product) => (
            <div key={product._id} className={styles.productCard}>
              <div className={styles.productCard__imageWrapper}>
                <img
                  src={product.image}
                  alt={product.name}
                  className={styles.productCard__image}
                />
                <div
                  className={`${styles.productCard__badge} ${
                    product.isAvailable
                      ? styles.available
                      : styles.unavailable
                  }`}
                >
                  {product.isAvailable ? "Available" : "Unavailable"}
                </div>
              </div>
              <div className={styles.productCard__content}>
                <div className={styles.productCard__header}>
                  <h3 className={styles.productCard__name}>{product.name}</h3>
                  <span className={styles.productCard__category}>
                    {product.category}
                  </span>
                </div>
                <p className={styles.productCard__description}>
                  {product.description}
                </p>
                <div className={styles.productCard__footer}>
                  <span className={styles.productCard__price}>
                    {product.price}dt
                  </span>
                  <div className={styles.productCard__actions}>
                    <button
                      className={styles.action__edit}
                      onClick={() => handleEditProduct(product)}
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      className={styles.action__delete}
                      onClick={() => handleDeleteProduct(product._id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className={styles.productsAdmin__empty}>
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
