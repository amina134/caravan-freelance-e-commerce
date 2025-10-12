import './reviewsAdmin.css';
import { useState } from 'react';

const ReviewsAdmin = () => {
  // Fake data
  const products = [
    {
      id: 1,
      name: 'Wireless Headphones',
      reviews: [
        { user: 'Alice', rating: 5, comment: 'Amazing sound quality!' },
        { user: 'Bob', rating: 4, comment: 'Very comfortable, but a bit pricey.' },
      ],
    },
    {
      id: 2,
      name: 'Smart Watch',
      reviews: [
        { user: 'Charlie', rating: 3, comment: 'Battery life could be better.' },
        { user: 'Diana', rating: 5, comment: 'Love the fitness features!' },
        { user: 'Eve', rating: 4, comment: 'Looks stylish and works well.' },
      ],
    },
    {
      id: 3,
      name: 'Portable Speaker',
      reviews: [
        { user: 'Frank', rating: 5, comment: 'Perfect for outdoor parties!' },
      ],
    },
  ];

  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="reviews-admin">
      <h1>Admin Dashboard</h1>
      <h2>Product Reviews</h2>

      {/* Product List */}
      <div className="product-list">
        {products.map((product) => (
          <div
            key={product.id}
            className={`product-item ${selectedProduct?.id === product.id ? 'active' : ''}`}
            onClick={() => setSelectedProduct(product)}
          >
            <h3>{product.name}</h3>
            <p>{product.reviews.length} review{product.reviews.length > 1 ? 's' : ''}</p>
          </div>
        ))}
      </div>

      {/* Selected Product Reviews */}
      {selectedProduct && (
        <div className="reviews-section">
          <h3>Reviews for: {selectedProduct.name}</h3>
          {selectedProduct.reviews.length === 0 ? (
            <p>No reviews yet.</p>
          ) : (
            <ul className="reviews-list">
              {selectedProduct.reviews.map((review, index) => (
                <li key={index} className="review-item">
                  <strong>{review.user}</strong> - Rating: {review.rating}/5
                  <p>{review.comment}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default ReviewsAdmin;
