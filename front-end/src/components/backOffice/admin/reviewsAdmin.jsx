import './reviewsAdmin.css';
import { useState } from 'react';
import { Star, Trash2, Eye, EyeOff, Search } from 'lucide-react';

const ReviewsAdmin = () => {
  // Mock data - replace with actual API calls
  const [reviews, setReviews] = useState([
    {
      id: 1,
      productName: 'Wireless Headphones',
      productImage: '🎧',
      userName: 'john_doe',
      rating: 5,
      comment: 'Excellent sound quality and very comfortable!',
      createdAt: '2025-10-16',
      hidden: false
    },
    {
      id: 2,
      productName: 'USB-C Cable',
      productImage: '🔌',
      userName: 'jane_smith',
      rating: 2,
      comment: 'Stopped working after 2 months',
      createdAt: '2025-10-15',
      hidden: false
    },
    {
      id: 3,
      productName: 'Wireless Mouse',
      productImage: '🖱️',
      userName: 'mike_john',
      rating: 4,
      comment: 'Great mouse, battery life is impressive',
      createdAt: '2025-10-14',
      hidden: false
    },
    {
      id: 4,
      productName: 'Keyboard RGB',
      productImage: '⌨️',
      userName: 'sarah_west',
      rating: 5,
      comment: 'Perfect for gaming, amazing lighting effects',
      createdAt: '2025-10-13',
      hidden: false
    },
    {
      id: 5,
      productName: 'Monitor Stand',
      productImage: '🖥️',
      userName: 'alex_blue',
      rating: 3,
      comment: 'Decent quality, a bit wobbly',
      createdAt: '2025-10-12',
      hidden: false
    },
    {
      id: 6,
      productName: 'Wireless Headphones',
      productImage: '🎧',
      userName: 'emma_green',
      rating: 4,
      comment: 'Good value for money',
      createdAt: '2025-10-11',
      hidden: false
    },
    {
      id: 7,
      productName: 'USB-C Cable',
      productImage: '🔌',
      userName: 'david_red',
      rating: 1,
      comment: 'Does not work at all',
      createdAt: '2025-10-10',
      hidden: false
    }
  ]);

  const [filters, setFilters] = useState({
    productName: '',
    rating: '',
    dateFrom: '',
    dateTo: ''
  });

  const [searchTerm, setSearchTerm] = useState('');

  // Calculate stats
  const totalReviews = reviews.length;
  const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1);
  
  const products = [...new Map(reviews.map(r => [r.productName, { name: r.productName, rating: r.rating }])).values()];
  const highestRated = products.reduce((max, p) => p.rating > max.rating ? p : max);
  const lowestRated = products.reduce((min, p) => p.rating < min.rating ? p : min);
  
  const recentReviews = [...reviews].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

  // Filter reviews
  const filteredReviews = reviews.filter(review => {
    const matchesProduct = review.productName.toLowerCase().includes(filters.productName.toLowerCase());
    const matchesRating = filters.rating === '' || review.rating === parseInt(filters.rating);
    const matchesSearch = review.comment.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          review.userName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDateFrom = filters.dateFrom === '' || new Date(review.createdAt) >= new Date(filters.dateFrom);
    const matchesDateTo = filters.dateTo === '' || new Date(review.createdAt) <= new Date(filters.dateTo);
    
    return matchesProduct && matchesRating && matchesSearch && matchesDateFrom && matchesDateTo;
  });

  const deleteReview = (id) => {
    setReviews(reviews.filter(r => r.id !== id));
  };

  const toggleHidden = (id) => {
    setReviews(reviews.map(r => r.id === id ? { ...r, hidden: !r.hidden } : r));
  };

  const renderStars = (rating) => {
    return (
      <div className="stars">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < rating ? 'star-filled' : 'star-empty'}
          />
        ))}
      </div>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="reviews-admin">
      <h1 className="page-title">Reviews Management</h1>

      {/* Summary Stats */}
      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-label">Total Reviews</div>
          <div className="stat-value">{totalReviews}</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Average Rating</div>
          <div className="stat-value">{avgRating}</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Highest Rated</div>
          <div className="stat-value-text">{highestRated.name}</div>
          <div className="stat-rating">{renderStars(highestRated.rating)}</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Lowest Rated</div>
          <div className="stat-value-text">{lowestRated.name}</div>
          <div className="stat-rating">{renderStars(lowestRated.rating)}</div>
        </div>
      </div>

      {/* Recent Reviews Section */}
      <div className="recent-reviews-section">
        <h2>Recent Reviews (Last 5)</h2>
        <div className="recent-reviews-grid">
          {recentReviews.map(review => (
            <div key={review.id} className="recent-review-card">
              <div className="recent-header">
                <span className="product-emoji">{review.productImage}</span>
                <span className="product-name">{review.productName}</span>
              </div>
              <div className="recent-user">@{review.userName}</div>
              <div className="recent-rating">{renderStars(review.rating)}</div>
              <p className="recent-comment">{review.comment}</p>
              <div className="recent-date">{formatDate(review.createdAt)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters Section */}
      <div className="filters-section">
        <h2>Filters & Search</h2>
        <div className="filters-grid">
          <div className="filter-group">
            <label>Search</label>
            <div className="search-input-wrapper">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search by comment or username..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="filter-group">
            <label>Product Name</label>
            <input
              type="text"
              placeholder="Filter by product..."
              value={filters.productName}
              onChange={(e) => setFilters({ ...filters, productName: e.target.value })}
            />
          </div>

          <div className="filter-group">
            <label>Rating</label>
            <select
              value={filters.rating}
              onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
            >
              <option value="">All Ratings</option>
              <option value="5">⭐⭐⭐⭐⭐ (5 Stars)</option>
              <option value="4">⭐⭐⭐⭐ (4 Stars)</option>
              <option value="3">⭐⭐⭐ (3 Stars)</option>
              <option value="2">⭐⭐ (2 Stars)</option>
              <option value="1">⭐ (1 Star)</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Date From</label>
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
            />
          </div>

          <div className="filter-group">
            <label>Date To</label>
            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
            />
          </div>

          <button
            className="reset-btn"
            onClick={() => {
              setFilters({ productName: '', rating: '', dateFrom: '', dateTo: '' });
              setSearchTerm('');
            }}
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Reviews Table */}
      <div className="reviews-table-section">
        <h2>All Reviews ({filteredReviews.length})</h2>
        <div className="table-wrapper">
          <table className="reviews-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>User</th>
                <th>Rating</th>
                <th>Comment</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReviews.map(review => (
                <tr key={review.id} className={review.hidden ? 'row-hidden' : ''}>
                  <td>
                    <div className="product-cell">
                      <span className="product-emoji">{review.productImage}</span>
                      <span>{review.productName}</span>
                    </div>
                  </td>
                  <td className="user-cell">
                    <div className="username">@{review.userName}</div>
                  </td>
                  <td className="rating-cell">
                    {renderStars(review.rating)}
                  </td>
                  <td className="comment-cell">
                    <div className="comment-text">{review.comment}</div>
                  </td>
                  <td className="date-cell">
                    {formatDate(review.createdAt)}
                  </td>
                  <td className="actions-cell">
                    <button
                      className="action-btn hide-btn"
                      title={review.hidden ? 'Show' : 'Hide'}
                      onClick={() => toggleHidden(review.id)}
                    >
                      {review.hidden ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>
                    <button
                      className="action-btn delete-btn"
                      title="Delete"
                      onClick={() => deleteReview(review.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredReviews.length === 0 && (
          <div className="no-results">
            <p>No reviews found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsAdmin;