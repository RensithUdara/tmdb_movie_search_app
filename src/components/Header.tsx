import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);
  
  // Check if the link is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
          <Link to="/">
            <h1>CinemaHub</h1>
          </Link>
        </div>
        <button 
          className="mobile-menu-btn" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
        <nav className={`header-nav ${isMenuOpen ? 'open' : ''}`}>
          <ul>
            <li>
              <Link to="/" className={isActive('/') ? 'active' : ''}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/search" className={isActive('/search') ? 'active' : ''}>
                Search
              </Link>
            </li>
            <li>
              <Link to="/popular" className={isActive('/popular') ? 'active' : ''}>
                Popular
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
