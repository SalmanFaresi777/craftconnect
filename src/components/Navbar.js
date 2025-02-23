import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart, useDispatchCart } from '../components/ComponentReducer';
import './Navbar.css';

export default function Navbar() {
  const [cartView, setCartView] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const data = useCart();
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
  };

  return (
    <div>
      <nav className={`navbar navbar-expand-lg navbar-dark ${isScrolled ? 'bg-success-scrolled' : 'bg-success'} fixed-top transition-all`}>
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic brand-hover" to="/">
            CraftConnect
            <span className="brand-subtitle"></span>
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
            <ul className="navbar-nav me-auto mb-2">
              {localStorage.getItem("authToken") && (
                <li className="nav-item">
                  <Link 
                    className={`nav-link fs-5 nav-link-hover ${location.pathname === '/myorders' ? 'active' : ''}`} 
                    to="/myorders"
                  >
                    My Orders
                  </Link>
                </li>
              )}
            </ul>

            {!localStorage.getItem("authToken") ? (
              <div className='d-flex gap-2'>
                <Link 
                  className="btn btn-outline-light hover-effect" 
                  to="/login"
                >
                  Login
                </Link>
                <Link 
                  className="btn btn-light hover-effect" 
                  to="/creatuser"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="d-flex align-items-center">
                <button 
                  className="btn btn-light hover-effect position-relative me-3" 
                  onClick={() => setCartView(true)}
                >
                  <i className="bi bi-cart3"></i> Cart
                  {data.length > 0 && (
                    <Badge 
                      pill 
                      bg="danger" 
                      className="position-absolute top-0 start-100 translate-middle"
                    >
                      {data.length}
                    </Badge>
                  )}
                </button>
                <button 
                  className="btn btn-outline-light hover-effect" 
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {cartView && (
        <Modal onClose={() => setCartView(false)}>
          <Cart />
        </Modal>
      )}
    </div>
  );
}
