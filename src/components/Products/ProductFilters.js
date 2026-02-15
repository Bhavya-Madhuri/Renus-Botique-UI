import React, { useState } from 'react';

const sortOptions = [
  { id: 'featured', label: 'Featured' },
  { id: 'best-seller', label: 'Best Sellers' },
  { id: 'price-low', label: 'Price: Low to High' },
  { id: 'price-high', label: 'Price: High to Low' },
  { id: 'newest', label: 'Newest First' },
  { id: 'oldest', label: 'Oldest First' },
  { id: 'rating', label: 'Highest Rated' }
];

const priceRanges = [
  { id: 'all', label: 'All Prices', min: 0, max: Infinity },
  { id: 'under-3000', label: 'Under ₹3,000', min: 0, max: 3000 },
  { id: '3000-5000', label: '₹3,000 - ₹5,000', min: 3000, max: 5000 },
  { id: '5000-10000', label: '₹5,000 - ₹10,000', min: 5000, max: 10000 },
  { id: '10000-25000', label: '₹10,000 - ₹25,000', min: 10000, max: 25000 },
  { id: 'above-25000', label: 'Above ₹25,000', min: 25000, max: Infinity }
];

const occasions = ['All', 'Wedding', 'Party', 'Festival', 'Casual', 'Daily', 'Work', 'Reception'];
const fabrics = ['All', 'Pure Silk', 'Banarasi Silk', 'Cotton', 'Georgette', 'Crepe', 'Net', 'Velvet'];

const ProductFilters = ({
  sortBy,
  onSortChange,
  priceRange,
  onPriceRangeChange,
  selectedOccasion,
  onOccasionChange,
  selectedFabric,
  onFabricChange,
  showFiltersOnly = false,
  totalProducts,
  filteredCount
}) => {
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  const currentSort = sortOptions.find(opt => opt.id === sortBy) || sortOptions[0];

  return (
    <div className="product-filters">
      {/* Results Count & View Options */}
      <div className="filters-header">
        <div className="results-info">
          <span className="results-count">
            Showing <strong>{filteredCount}</strong> of {totalProducts} sarees
          </span>
        </div>

        <div className="filters-actions">
          {/* Mobile Filter Toggle */}
          <button
            className="filter-toggle-btn"
            onClick={() => setShowFilterPanel(!showFilterPanel)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
            Filters
          </button>

          {/* Sort Dropdown */}
          <div className="sort-dropdown-container">
            <button
              className="sort-dropdown-btn"
              onClick={() => setShowSortDropdown(!showSortDropdown)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="4" y1="6" x2="16" y2="6" />
                <line x1="4" y1="12" x2="12" y2="12" />
                <line x1="4" y1="18" x2="8" y2="18" />
                <polyline points="15 15 18 18 21 15" />
                <line x1="18" y1="9" x2="18" y2="18" />
              </svg>
              Sort: {currentSort.label}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {showSortDropdown && (
              <div className="sort-dropdown">
                {sortOptions.map((option) => (
                  <button
                    key={option.id}
                    className={`sort-option ${sortBy === option.id ? 'active' : ''}`}
                    onClick={() => {
                      onSortChange(option.id);
                      setShowSortDropdown(false);
                    }}
                  >
                    {option.label}
                    {sortBy === option.id && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* View Toggle */}
          <div className="view-toggle">
            <button className="view-btn active" aria-label="Grid view">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
            </button>
            <button className="view-btn" aria-label="List view">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" />
                <line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Chips - Quick Filters */}
      <div className="filter-chips">
        {/* Price Range Chips */}
        <div className="chip-group">
          <span className="chip-label">Price:</span>
          {priceRanges.slice(0, 4).map((range) => (
            <button
              key={range.id}
              className={`filter-chip ${priceRange === range.id ? 'active' : ''}`}
              onClick={() => onPriceRangeChange(range.id)}
            >
              {range.label}
            </button>
          ))}
          <button
            className={`filter-chip ${['10000-25000', 'above-25000'].includes(priceRange) ? 'active' : ''}`}
            onClick={() => setShowFilterPanel(true)}
          >
            More
          </button>
        </div>

        {/* Occasion Chips */}
        <div className="chip-group">
          <span className="chip-label">Occasion:</span>
          {occasions.slice(0, 5).map((occasion) => (
            <button
              key={occasion}
              className={`filter-chip ${selectedOccasion === occasion ? 'active' : ''}`}
              onClick={() => onOccasionChange(occasion)}
            >
              {occasion}
            </button>
          ))}
        </div>
      </div>

      {/* Active Filters */}
      {(priceRange !== 'all' || selectedOccasion !== 'All' || selectedFabric !== 'All') && (
        <div className="active-filters">
          <span className="active-label">Active Filters:</span>
          {priceRange !== 'all' && (
            <span className="active-tag">
              {priceRanges.find(r => r.id === priceRange)?.label}
              <button onClick={() => onPriceRangeChange('all')}>×</button>
            </span>
          )}
          {selectedOccasion !== 'All' && (
            <span className="active-tag">
              {selectedOccasion}
              <button onClick={() => onOccasionChange('All')}>×</button>
            </span>
          )}
          {selectedFabric !== 'All' && (
            <span className="active-tag">
              {selectedFabric}
              <button onClick={() => onFabricChange('All')}>×</button>
            </span>
          )}
          <button
            className="clear-all-btn"
            onClick={() => {
              onPriceRangeChange('all');
              onOccasionChange('All');
              onFabricChange('All');
            }}
          >
            Clear All
          </button>
        </div>
      )}

      {/* Mobile Filter Panel */}
      {showFilterPanel && (
        <div className="filter-panel-overlay" onClick={() => setShowFilterPanel(false)}>
          <div className="filter-panel" onClick={(e) => e.stopPropagation()}>
            <div className="filter-panel-header">
              <h3>Filters</h3>
              <button className="close-panel-btn" onClick={() => setShowFilterPanel(false)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="filter-panel-content">
              {/* Price Range */}
              <div className="filter-section">
                <h4>Price Range</h4>
                <div className="filter-options">
                  {priceRanges.map((range) => (
                    <label key={range.id} className="filter-option">
                      <input
                        type="radio"
                        name="priceRange"
                        checked={priceRange === range.id}
                        onChange={() => onPriceRangeChange(range.id)}
                      />
                      <span className="option-label">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Occasion */}
              <div className="filter-section">
                <h4>Occasion</h4>
                <div className="filter-options">
                  {occasions.map((occasion) => (
                    <label key={occasion} className="filter-option">
                      <input
                        type="radio"
                        name="occasion"
                        checked={selectedOccasion === occasion}
                        onChange={() => onOccasionChange(occasion)}
                      />
                      <span className="option-label">{occasion}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Fabric */}
              <div className="filter-section">
                <h4>Fabric</h4>
                <div className="filter-options">
                  {fabrics.map((fabric) => (
                    <label key={fabric} className="filter-option">
                      <input
                        type="radio"
                        name="fabric"
                        checked={selectedFabric === fabric}
                        onChange={() => onFabricChange(fabric)}
                      />
                      <span className="option-label">{fabric}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="filter-panel-footer">
              <button
                className="btn btn-secondary"
                onClick={() => {
                  onPriceRangeChange('all');
                  onOccasionChange('All');
                  onFabricChange('All');
                }}
              >
                Clear All
              </button>
              <button
                className="btn btn-primary"
                onClick={() => setShowFilterPanel(false)}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductFilters;

export { sortOptions, priceRanges };
