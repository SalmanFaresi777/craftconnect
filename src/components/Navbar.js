import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart, useDispatchCart } from '../components/ComponentReducer';
import { FaShoppingCart, FaSignOutAlt, FaUser, FaHistory } from 'react-icons/fa';
import './Navbar.css';

export default function Navbar() {
  const [cartView, setCartView] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  let data = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  }

  return (
    <nav className={`navbar navbar-expand-lg navbar-dark ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container">
        <Link className="navbar-brand" to="/">
          <span className="brand-text">CraftConnect</span>
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {localStorage.getItem("authToken") && (
              <li className="nav-item">
                <Link 
                  className={`nav-link ${location.pathname === '/myorder' ? 'active' : ''}`}
                  to="/myorder"
                >
                  <FaHistory className="nav-icon" />
                  <span>My Orders</span>
                </Link>
              </li>
            )}
          </ul>

          <div className="nav-buttons">
            {!localStorage.getItem("authToken") ? (
              <div className="auth-buttons">
                <Link 
                  className="nav-btn login-btn" 
                  to="/login"
                >
                  <FaUser className="btn-icon" />
                  <span>Login</span>
                </Link>
                <Link 
                  className="nav-btn signup-btn" 
                  to="/creatuser"
                >
                  <span>Sign Up</span>
                </Link>
              </div>
            ) : (
              <div className="user-buttons">
                <button 
                  className="nav-btn cart-btn" 
                  onClick={() => setCartView(true)}
                >
                  <FaShoppingCart className="btn-icon" />
                  <span>Cart</span>
                  {data.length > 0 && (
                    <Badge className="cart-badge" pill>
                      {data.length}
                    </Badge>
                  )}
                </button>

                <button 
                  className="nav-btn logout-btn" 
                  onClick={handleLogout}
                >
                  <FaSignOutAlt className="btn-icon" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {cartView && (
        <Modal onClose={() => setCartView(false)}>
          <Cart />
        </Modal>
      )}
    </nav>
  );
}
