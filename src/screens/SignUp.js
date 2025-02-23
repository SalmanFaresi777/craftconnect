import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Auth.css';

export default function SignUp() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  let navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    setLocationLoading(true);
    try {
      let navLocation = () => {
        return new Promise((res, rej) => {
          navigator.geolocation.getCurrentPosition(res, rej);
        });
      }
      let latlong = await navLocation().then(res => {
        let latitude = res.coords.latitude;
        let longitude = res.coords.longitude;
        return [latitude, longitude]
      });
      let [lat, long] = latlong;
      const response = await fetch("http://localhost:5000/api/auth/getlocation", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ latlong: { lat, long } })
      });
      const { location } = await response.json();
      setCredentials({ ...credentials, geolocation: location });
    } catch (error) {
      console.error("Error getting location:", error);
      alert("Could not get your location. Please enter it manually.");
    } finally {
      setLocationLoading(false);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          location: credentials.geolocation
        })
      });
      const json = await response.json();
      if (json.success) {
        navigate("/login");
      } else {
        alert("Enter Valid Credentials");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  return (
    <div className="auth-wrapper">
      <Navbar />
      <div className="auth-container">
        <div className="auth-box signup-box">
          <div className="auth-header">
            <h2>Join CraftConnect</h2>
            <p>Start your creative journey today</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <div className="input-group">
                <i className="bi bi-person input-icon"></i>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={credentials.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-group">
                <i className="bi bi-envelope input-icon"></i>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={credentials.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-group">
                <i className="bi bi-lock input-icon"></i>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i className={`bi bi-eye${showPassword ? '-slash' : ''}`}></i>
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="geolocation">Location</label>
              <div className="input-group">
                <i className="bi bi-geo-alt input-icon"></i>
                <input
                  type="text"
                  className="form-control"
                  id="geolocation"
                  name="geolocation"
                  value={credentials.geolocation}
                  onChange={handleChange}
                  placeholder="Your location"
                  required
                />
                <button
                  type="button"
                  className="location-btn"
                  onClick={handleClick}
                  disabled={locationLoading}
                >
                  {locationLoading ? (
                    <span className="loading-spinner small"></span>
                  ) : (
                    <i className="bi bi-crosshair"></i>
                  )}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              className="auth-button"
              disabled={loading}
            >
              {loading ? (
                <span className="loading-spinner"></span>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="auth-footer">
            <p>Already have an account? <Link to="/login" className="auth-link">Sign In</Link></p>
          </div>
        </div>

        <div className="auth-features signup-features">
          <h3>Get Started in 3 Easy Steps</h3>
          <div className="steps-grid">
            <div className="step-item">
              <div className="step-number">1</div>
              <h4>Create Account</h4>
              <p>Sign up with your email</p>
            </div>
            <div className="step-item">
              <div className="step-number">2</div>
              <h4>Complete Profile</h4>
              <p>Add your skills and interests</p>
            </div>
            <div className="step-item">
              <div className="step-number">3</div>
              <h4>Start Learning</h4>
              <p>Join workshops and connect</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
