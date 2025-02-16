import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Login() {

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let [address, setAddress] = useState("");
  let navigate = useNavigate()

  const handleClick = async (e) => {
    e.preventDefault();
    let navLocation = () => {
      return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej);
      });
    }
    let latlong = await navLocation().then(res => {
      let latitude = res.coords.latitude;
      let longitude = res.coords.longitude;
      return [latitude, longitude]
    })
    // console.log(latlong)
    let [lat, long] = latlong
    console.log(lat, long)
    const response = await fetch("http://localhost:5000/api/auth/getlocation", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ latlong: { lat, long } })

    });
    const { location } = await response.json()
    console.log(location);
    setAddress(location);
    setCredentials({ ...credentials, [e.target.name]: location })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/loginuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errors ? errorData.errors[0].msg : "Registration failed");
      }

      const json = await response.json();
      if (json.success) {
        navigate("/");
        alert("Successfully Logged In!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(error.message || "An error occurred while logging in. Please try again.");
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }


  return (
    <div style={{ backgroundColor: '#f8f9fa' }}>
      <Navbar />
      <div className="min-vh-100 d-flex align-items-center py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card border-0 shadow-lg"
                style={{
                  borderRadius: '1rem',
                  transition: 'transform 0.3s ease-in-out',
                  transform: 'translateY(0)'
                }}>
                <div className="card-body p-5">
                  <div className="text-center mb-4">
                    <i className="bi bi-person-circle display-1 text-primary mb-3"></i>
                    <h2 className="fw-bold mb-2">Welcome Back!</h2>
                    <p className="text-muted">Access your creative journey</p>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="form-floating mb-3">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="name@example.com"
                        value={credentials.email}
                        onChange={onChange}
                        required
                      />
                      <label htmlFor="email">Email address</label>
                    </div>

                    <div className="form-floating mb-4">
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        placeholder="Password"
                        value={credentials.password}
                        onChange={onChange}
                        required
                      />
                      <label htmlFor="password">Password</label>
                    </div>

                    <div className="d-grid mb-4">
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg"
                        style={{
                          borderRadius: '0.5rem',
                          padding: '0.75rem 1rem',
                          transition: 'all 0.3s ease'
                        }}>
                        Sign In
                      </button>
                    </div>

                    <div className="text-center">
                      <p className="text-muted mb-0">
                        Don't have an account?{' '}
                        <Link to="/creatuser" className="text-primary text-decoration-none fw-bold">
                          Create Account
                        </Link>
                      </p>
                    </div>
                  </form>
                </div>
              </div>

              <div className="text-center mt-4">
                <p className="text-muted small mb-0">
                  By signing in, you agree to our{' '}
                  <a href="#" className="text-primary text-decoration-none">Terms</a>
                  {' '}and{' '}
                  <a href="#" className="text-primary text-decoration-none">Privacy Policy</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
