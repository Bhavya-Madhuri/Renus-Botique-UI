import React from 'react';

// Saree Categories Data
const sareeCategories = [
  {
    id: 'all',
    name: 'All Sarees',
    icon: '✨',
    count: 156
  },
  {
    id: 'silk',
    name: 'Silk Sarees',
    icon: '🌟',
    count: 42,
    subcategories: ['Kanchipuram', 'Banarasi', 'Mysore', 'Tussar']
  },
  {
    id: 'cotton',
    name: 'Cotton Sarees',
    icon: '🌿',
    count: 38,
    subcategories: ['Khadi', 'Tant', 'Chettinad', 'Mangalgiri']
  },
  {
    id: 'designer',
    name: 'Designer Sarees',
    icon: '💎',
    count: 28,
    subcategories: ['Contemporary', 'Fusion', 'Indo-Western']
  },
  {
    id: 'wedding',
    name: 'Wedding Collection',
    icon: '💒',
    count: 24,
    subcategories: ['Bridal', 'Reception', 'Sangeet']
  },
  {
    id: 'casual',
    name: 'Casual Wear',
    icon: '🌸',
    count: 35,
    subcategories: ['Daily Wear', 'Office Wear', 'Party Wear']
  },
  {
    id: 'handloom',
    name: 'Handloom Sarees',
    icon: '🧵',
    count: 31,
    subcategories: ['Pochampally', 'Chanderi', 'Paithani', 'Sambalpuri']
  },
  {
    id: 'embroidered',
    name: 'Embroidered',
    icon: '🪡',
    count: 22,
    subcategories: ['Chikankari', 'Zardozi', 'Mirror Work', 'Kantha']
  },
  {
    id: 'printed',
    name: 'Printed Sarees',
    icon: '🎨',
    count: 26,
    subcategories: ['Kalamkari', 'Block Print', 'Digital Print', 'Batik']
  }
];

const Sidebar = ({ isOpen, selectedCategory, onCategoryChange, onToggle }) => {
  const [expandedCategory, setExpandedCategory] = React.useState(null);

  const handleCategoryClick = (categoryId) => {
    onCategoryChange(categoryId);
    if (expandedCategory === categoryId) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryId);
    }
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <span className="brand-mark">R</span>
          {isOpen && (
            <div className="brand-text">
              <span className="brand-name">Renu's</span>
              <span className="brand-sub">Boutique</span>
            </div>
          )}
        </div>
        <button className="sidebar-toggle" onClick={onToggle} aria-label="Toggle sidebar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {isOpen ? (
              <path d="M15 18l-6-6 6-6" />
            ) : (
              <path d="M9 18l6-6-6-6" />
            )}
          </svg>
        </button>
      </div>

      {/* Categories Section */}
      <div className="sidebar-section">
        {isOpen && <h3 className="section-title">Collections</h3>}

        <nav className="category-nav">
          {sareeCategories.map((category) => (
            <div key={category.id} className="category-item">
              <button
                className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => handleCategoryClick(category.id)}
                title={!isOpen ? category.name : undefined}
              >
                <span className="category-icon">{category.icon}</span>
                {isOpen && (
                  <>
                    <span className="category-name">{category.name}</span>
                    <span className="category-count">{category.count}</span>
                    {category.subcategories && (
                      <span className={`expand-icon ${expandedCategory === category.id ? 'expanded' : ''}`}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </span>
                    )}
                  </>
                )}
              </button>

              {/* Subcategories */}
              {isOpen && category.subcategories && expandedCategory === category.id && (
                <div className="subcategories">
                  {category.subcategories.map((sub) => (
                    <button
                      key={sub}
                      className="subcategory-btn"
                      onClick={() => onCategoryChange(`${category.id}-${sub.toLowerCase().replace(' ', '-')}`)}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Bottom Section */}
      {isOpen && (
        <div className="sidebar-footer">
          <div className="promo-card">
            <span className="promo-badge">New Arrivals</span>
            <p className="promo-text">Exclusive Diwali Collection 2024</p>
            <button className="promo-btn">Explore Now</button>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
