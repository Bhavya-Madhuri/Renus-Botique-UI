import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Sidebar from './Sidebar';
import Header from './Header';
import './MainLayout.css';

const MainLayout = ({ children, selectedCategory, onCategoryChange }) => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={`main-layout ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <Sidebar
        isOpen={sidebarOpen}
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
        onToggle={toggleSidebar}
      />

      <div className="main-content">
        <Header
          user={user}
          onLogout={logout}
          onToggleSidebar={toggleSidebar}
          sidebarOpen={sidebarOpen}
        />

        <main className="content-area">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
