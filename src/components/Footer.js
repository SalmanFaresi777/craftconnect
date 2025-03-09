import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaGithub } from 'react-icons/fa';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h4>About CraftConnect</h4>
                    <p>
                    CraftConnect is your gateway to professional crafting excellence.
                    Learn from the experts through immersive, hands-on courses designed to refine your skills and unleash your creativity.
                    Whether you're a beginner or an experienced artisan, 
                    our comprehensive lessons empower you to master your craft, turn passion into expertise,
                    and create with confidence.
                    Wishing you a happy & successful learning journey.
                    </p>
                </div>
                

                <div className="footer-section">
                    <h4>Developers</h4>
                    <ul className="dev-links">
                        <li>
                            <a href="https://github.com/SalmanFaresi777" target="_blank" rel="noopener noreferrer">
                                <FaGithub /> Salman Faresi
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/maishamomtaz" target="_blank" rel="noopener noreferrer">
                                <FaGithub /> Maisha Momtaz
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/jarin7383" target="_blank" rel="noopener noreferrer">
                                <FaGithub /> Jarin Tasnim
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Connect With Us</h4>
                    <div className="social-links">
                        <a href="#"><FaFacebook /> CraftConnect</a>
                        <a href="#"><FaTwitter /> CraftConnect</a>
                        <a href="#"><FaLinkedin /> CraftConnect</a>
                        <a href="#"><FaInstagram /> CraftConnect</a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <span> {new Date().getFullYear()} CraftConnect, Inc. All rights reserved.</span>
            </div>
        </footer>
    );
}
