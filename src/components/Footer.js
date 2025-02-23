import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
    const developers = [
        {
            name: "Developer 1",
            github: "dev1-github",
            role: "Frontend Developer",
            id: "ID: 12345678"
        },
        {
            name: "Developer 2",
            github: "dev2-github",
            role: "Backend Developer",
            id: "ID: 23456789"
        },
        {
            name: "Developer 3",
            github: "dev3-github",
            role: "Full Stack Developer",
            id: "ID: 34567890"
        }
    ];

    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section brand-section">
                    <Link to="/" className="footer-brand">
                        CraftConnect
                    </Link>
                    <p className="footer-tagline">Connecting Artisans, Sharing Skills</p>
                </div>

                <div className="footer-section developers-section">
                    <h5 className="footer-heading">Development Team</h5>
                    <div className="developers-grid">
                        {developers.map((dev, index) => (
                            <div key={index} className="developer-card">
                                <h6 className="developer-name">{dev.name}</h6>
                                <p className="developer-role">{dev.role}</p>
                                <p className="developer-id">{dev.id}</p>
                                <a 
                                    href={`https://github.com/${dev.github}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="github-link"
                                >
                                    <i className="bi bi-github"></i> @{dev.github}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="footer-section links-section">
                    <h5 className="footer-heading">Quick Links</h5>
                    <ul className="footer-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container">
                    <p className="copyright">
                        {currentYear} CraftConnect. All rights reserved.
                    </p>
                    <p className="attribution">
                        Made with <span className="heart">♥</span> by the CraftConnect Team
                    </p>
                </div>
            </div>
        </footer>
    );
}
