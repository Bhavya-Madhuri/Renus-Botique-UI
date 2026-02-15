import React, { useState, useMemo } from 'react';
import MainLayout from '../components/Layout/MainLayout';
import ProductFilters, { priceRanges } from '../components/Products/ProductFilters';
import ProductGrid from '../components/Products/ProductGrid';
import { sarees } from '../data/sarees';
import './HomePage.css';

const HomePage = () => {
  // State for filters and sorting
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState('all');
  const [selectedOccasion, setSelectedOccasion] = useState('All');
  const [selectedFabric, setSelectedFabric] = useState('All');

  // Filter and sort sarees
  const filteredSarees = useMemo(() => {
    let filtered = [...sarees];

    // Filter by category
    if (selectedCategory !== 'all') {
      // Check for subcategory filter (e.g., 'silk-kanchipuram')
      if (selectedCategory.includes('-')) {
        const [cat, subcat] = selectedCategory.split('-');
        filtered = filtered.filter(
          saree => saree.category === cat &&
          saree.subcategory?.toLowerCase().replace(' ', '-') === subcat
        );
      } else {
        filtered = filtered.filter(saree => saree.category === selectedCategory);
      }
    }

    // Filter by price range
    if (priceRange !== 'all') {
      const range = priceRanges.find(r => r.id === priceRange);
      if (range) {
        filtered = filtered.filter(
          saree => saree.price >= range.min && saree.price <= range.max
        );
      }
    }

    // Filter by occasion
    if (selectedOccasion !== 'All') {
      filtered = filtered.filter(
        saree => saree.occasion.toLowerCase() === selectedOccasion.toLowerCase()
      );
    }

    // Filter by fabric
    if (selectedFabric !== 'All') {
      filtered = filtered.filter(
        saree => saree.fabric.toLowerCase().includes(selectedFabric.toLowerCase())
      );
    }

    // Sort
    switch (sortBy) {
      case 'best-seller':
        filtered = filtered.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0) || b.reviews - a.reviews);
        break;
      case 'price-low':
        filtered = filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered = filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered = filtered.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
        break;
      case 'oldest':
        filtered = filtered.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded));
        break;
      case 'rating':
        filtered = filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
      default:
        // Featured: best sellers first, then by rating
        filtered = filtered.sort((a, b) => {
          if (a.isBestSeller && !b.isBestSeller) return -1;
          if (!a.isBestSeller && b.isBestSeller) return 1;
          if (a.isNew && !b.isNew) return -1;
          if (!a.isNew && b.isNew) return 1;
          return b.rating - a.rating;
        });
        break;
    }

    return filtered;
  }, [selectedCategory, sortBy, priceRange, selectedOccasion, selectedFabric]);

  // Get category display name
  const getCategoryTitle = () => {
    if (selectedCategory === 'all') return 'All Sarees';
    if (selectedCategory.includes('-')) {
      const [, subcat] = selectedCategory.split('-');
      return subcat.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') + ' Collection';
    }
    return selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1) + ' Collection';
  };

  return (
    <MainLayout
      selectedCategory={selectedCategory}
      onCategoryChange={setSelectedCategory}
    >
      <div className="home-page">
        {/* Hero Banner */}
        <section className="hero-banner">
          <div className="hero-content">
            <span className="hero-badge">New Season</span>
            <h1 className="hero-title">{getCategoryTitle()}</h1>
            <p className="hero-subtitle">
              Discover our exquisite collection of handcrafted sarees, where every thread weaves a story of elegance and tradition.
            </p>
            <div className="hero-ornament">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div className="hero-pattern"></div>
        </section>

        {/* Filters Section */}
        <section className="filters-section">
          <ProductFilters
            sortBy={sortBy}
            onSortChange={setSortBy}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            selectedOccasion={selectedOccasion}
            onOccasionChange={setSelectedOccasion}
            selectedFabric={selectedFabric}
            onFabricChange={setSelectedFabric}
            totalProducts={sarees.length}
            filteredCount={filteredSarees.length}
          />
        </section>

        {/* Products Grid */}
        <section className="products-section">
          <ProductGrid sarees={filteredSarees} />
        </section>

        {/* Load More */}
        {filteredSarees.length > 0 && (
          <div className="load-more-section">
            <button className="btn btn-secondary">
              Load More Sarees
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default HomePage;
