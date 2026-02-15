import React from 'react';
import SareeCard from './SareeCard';

const ProductGrid = ({ sarees, loading }) => {
  if (loading) {
    return (
      <div className="product-grid loading">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="saree-card-skeleton">
            <div className="skeleton-image"></div>
            <div className="skeleton-content">
              <div className="skeleton-line short"></div>
              <div className="skeleton-line"></div>
              <div className="skeleton-line medium"></div>
              <div className="skeleton-line short"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (sarees.length === 0) {
    return (
      <div className="no-results">
        <div className="no-results-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
            <path d="M8 8l6 6M14 8l-6 6" />
          </svg>
        </div>
        <h3>No sarees found</h3>
        <p>Try adjusting your filters or browse our other collections</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {sarees.map((saree) => (
        <SareeCard key={saree.id} saree={saree} />
      ))}
    </div>
  );
};

export default ProductGrid;
