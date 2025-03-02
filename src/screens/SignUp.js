import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';
import Navbar from '../components/Navbar';

export default function SignUp() {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" })
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
          const response = await fetch("http://localhost:5000/api/auth/creatuser", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
              name: credentials.name,
              email: credentials.email,
              password: credentials.password,
              location: address || credentials.geolocation || "Not specified"
            })
          });
          
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.errors ? errorData.errors[0].msg : "Registration failed");
          }
          
          const json = await response.json();
          if (json.success) {
            navigate("/login");
            alert("Successfully registered!");
          }
        } catch (error) {
          console.error("Error:", error);
          alert(error.message || "An error occurred while registering. Please try again.");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <>
            <Navbar />
            <div className="signup-container">
                <div className="signup-card">
                    <h2 className="signup-title">Create Account</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address" className="form-label">Address</label>
                            <div className="address-input-group">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name='address' 
                                    placeholder='Click below to fetch address'
                                    value={address} 
                                    onChange={(e) => setAddress(e.target.value)} 
                                />
                                <button 
                                    type="button" 
                                    onClick={handleClick} 
                                    name="geolocation" 
                                    className="location-btn"
                                >
                                    Get Location
                                </button>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" value={credentials.password} onChange={onChange} name='password' />
                        </div>
                        <button type="submit" className="signup-btn">Create Account</button>
                        <div className="login-link">
                            Already have an account? <Link to="/login">Login</Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
