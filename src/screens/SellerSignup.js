import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './SellerSignup.css';

export default function SellerSignup() {
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/seller/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error || 'Something went wrong');
      }

      alert('Successfully Submitted!');
      navigate('/');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="seller-page-container">
      <Navbar />
      
      <div className="seller-content">
        <div className="seller-signup-container">
          <div className="seller-signup-form">
            <h2>Signup To Share Your Skill</h2>
            <p className="form-subtitle">Join our community of skilled instructors and share your expertise with eager learners</p>
            
            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={credentials.name}
                  onChange={handleChange}
                  required
                  minLength={3}
                  placeholder="Enter your full name"
                />
                <small className="form-text text-muted">This will be displayed to your students</small>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={credentials.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                />
                <small className="form-text text-muted">We'll never share your email with anyone else</small>
              </div>

              <div className="form-group">
                <label htmlFor="description">About Your Expertise</label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  value={credentials.description}
                  onChange={handleChange}
                  required
                  minLength={20}
                  placeholder="Tell us about your skills, experience, and what you'd like to teach..."
                  rows={4}
                />
                <small className="form-text text-muted">Minimum 20 characters</small>
              </div>

              <button 
                type="submit" 
                className={`btn btn-primary w-100 ${loading ? 'loading' : ''}`}
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
