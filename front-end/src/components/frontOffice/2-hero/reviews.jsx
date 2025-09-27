import { useEffect, useState } from "react";
import "./reviews.css";
import { fetchReviews, addReview, deleteReview } from "../../../api/productApi";

const Reviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hoverRating, setHoverRating] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadReviews();
  }, [productId]);

  const loadReviews = async () => {
    try {
      const data = await fetchReviews(productId);
      setReviews(data.reviews || []);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!rating || !comment.trim()) return;

    setLoading(true);
    try {
      await addReview(productId, { rating, comment });
      setRating(0);
      setComment("");
      setHoverRating(0);
      loadReviews();
    } catch (err) {
      console.error("Error adding review:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReview(productId, reviewId);
      loadReviews();
    } catch (err) {
      console.error("Error deleting review:", err);
    }
  };

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <div className="reviews-container">
      <div className="reviews-header">
        <h2 className="reviews-title">Customer Reviews</h2>
        {reviews.length > 0 && (
          <div className="average-rating">
            <div className="average-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${star <= Math.round(averageRating) ? 'filled' : ''}`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="average-score">{averageRating}</span>
            <span className="review-count">
              ({reviews.length} review{reviews.length !== 1 ? 's' : ''})
            </span>
          </div>
        )}
      </div>

      {/* Review Form */}
      <div className="review-form-card">
        <form onSubmit={handleAddReview} className="review-form">
          <div className="form-group">
            <label className="form-label">Your Rating</label>
            <div className="rating-input">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star interactive ${
                    star <= (hoverRating || rating) ? 'filled' : ''
                  }`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Your Review</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your thoughts about this product..."
              className="review-textarea"
              disabled={loading}
            />
          </div>
          
          <button 
            type="submit" 
            className={`review-btn ${loading ? 'loading' : ''}`}
            disabled={!rating || !comment.trim() || loading}
          >
            {loading ? (
              <>
                <div className="spinner"></div>
                Submitting...
              </>
            ) : (
              'Submit Review'
            )}
          </button>
        </form>
      </div>

      {/* Review List */}
      <div className="review-list">
        {reviews.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">💬</div>
            <h3 className="empty-title">No reviews yet</h3>
            <p className="empty-text">Be the first to share your thoughts!</p>
          </div>
        ) : (
          reviews.map((r) => (
            <div key={r._id} className="review-card">
              <div className="review-header">
                <div className="reviewer-info">
                  <div className="avatar">
                    {r.comment.charAt(0).toUpperCase()}
                  </div>
                  <div className="rating-date">
                    <div className="review-rating">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={`star ${star <= r.rating ? 'filled' : ''}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="review-date">
                      {new Date(r.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
               
              </div>
              <p className="review-comment">{r.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Reviews;