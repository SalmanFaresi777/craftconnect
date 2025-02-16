import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const location = useLocation();

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <i className="bi bi-boxes me-2 text-primary fs-3"></i>
          <span className="fw-bold fs-4">CraftConnect</span>
        </Link>

        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded={!isNavCollapsed} 
          aria-label="Toggle navigation"
          onClick={handleNavCollapse}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link 
                className={`nav-link px-3 ${location.pathname === '/' ? 'active fw-bold' : ''}`} 
                to="/"
              >
                <i className="bi bi-house-door me-1"></i>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link px-3 ${location.pathname === '/explore' ? 'active fw-bold' : ''}`} 
                to="/explore"
              >
                <i className="bi bi-compass me-1"></i>
                Explore
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link px-3 ${location.pathname === '/categories' ? 'active fw-bold' : ''}`} 
                to="/categories"
              >
                <i className="bi bi-grid me-1"></i>
                Categories
              </Link>
            </li>
          </ul>

          <div className="d-flex gap-2">
            <form className="d-flex me-3">
              <div className="input-group">
                <input 
                  className="form-control border-end-0" 
                  type="search" 
                  placeholder="Search crafts..." 
                  aria-label="Search"
                />
                <span className="input-group-text bg-white border-start-0">
                  <i className="bi bi-search text-muted"></i>
                </span>
              </div>
            </form>

            <div className="d-flex gap-2">
              <Link 
                to="/login" 
                className={`btn ${location.pathname === '/login' ? 'btn-primary' : 'btn-outline-primary'}`}
              >
                Sign In
              </Link>
              <Link 
                to="/creatuser" 
                className={`btn ${location.pathname === '/auth/createuser' ? 'btn-primary' : 'btn-outline-primary'}`}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
