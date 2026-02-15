import React, { useState } from 'react';

const SareeCard = ({ saree }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const discount = Math.round(((saree.originalPrice - saree.price) / saree.originalPrice) * 100);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <article className="saree-card">
      {/* Image Container */}
      <div className="card-image-container">
        <div className={`image-wrapper ${imageLoaded ? 'loaded' : ''}`}>
          <img
            src={saree.image}
            alt={saree.name}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
          />
          <div className="image-overlay">
            <button className="quick-view-btn">Quick View</button>
          </div>
        </div>

        {/* Badges */}
        <div className="card-badges">
          {saree.isNew && <span className="badge badge-new">New</span>}
          {saree.isBestSeller && <span className="badge badge-bestseller">Best Seller</span>}
          {discount > 0 && <span className="badge badge-discount">-{discount}%</span>}
        </div>

        {/* Wishlist Button */}
        <button
          className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
          onClick={() => setIsWishlisted(!isWishlisted)}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill={isWishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      {/* Card Content */}
      <div className="card-content">
        {/* Category */}
        <span className="card-category">{saree.subcategory || saree.category}</span>

        {/* Title */}
        <h3 className="card-title">{saree.name}</h3>

        {/* Rating */}
        <div className="card-rating">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill={i < Math.floor(saree.rating) ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth="2"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            ))}
          </div>
          <span className="rating-text">{saree.rating} ({saree.reviews})</span>
        </div>

        {/* Colors */}
        <div className="card-colors">
          {saree.colors.slice(0, 3).map((color, index) => (
            <span key={index} className="color-tag">{color}</span>
          ))}
          {saree.colors.length > 3 && (
            <span className="color-more">+{saree.colors.length - 3}</span>
          )}
        </div>

        {/* Price */}
        <div className="card-price">
          <span className="current-price">{formatPrice(saree.price)}</span>
          {saree.originalPrice > saree.price && (
            <span className="original-price">{formatPrice(saree.originalPrice)}</span>
          )}
        </div>

        {/* Add to Cart */}
        <button className="add-to-cart-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          Add to Cart
        </button>
      </div>
    </article>
  );
};

export default SareeCard;
