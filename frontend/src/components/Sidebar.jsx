import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { logout, currentUser } = useAuth();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'sidebar-item active' : 'sidebar-item';
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>CRM Dashboard</h2>
      </div>
      
      <div className="sidebar-user">
        <div className="user-avatar">
          {currentUser?.name?.charAt(0)?.toUpperCase() || 'U'}
        </div>
        <div className="user-info">
          <div className="user-name">{currentUser?.name}</div>
          <div className="user-email">{currentUser?.email}</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <Link to="/dashboard" className={isActive('/dashboard')}>
          <span className="icon">📊</span>
          <span className="text">Dashboard</span>
        </Link>
        
        <Link to="/customers" className={isActive('/customers')}>
          <span className="icon">👥</span>
          <span className="text">Customers</span>
        </Link>
      </nav>

      <div className="sidebar-footer">
        <button onClick={logout} className="logout-btn">
          <span className="icon">🚪</span>
          <span className="text">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;