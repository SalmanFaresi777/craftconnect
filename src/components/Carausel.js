import React from 'react';
import './Carausel.css';

export default function Carousel() {
    const carouselImages = [
        {
            src: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b",
            alt: "Workshop Teaching",
            heading: "Learn New Skills",
            subheading: "Join workshops and tutorials from expert craftspeople"
        },
        {
            src: "https://images.unsplash.com/photo-1552664730-d307ca884978",
            alt: "Collaborative Learning",
            heading: "Share Your Knowledge",
            subheading: "Teach others and grow the crafting community"
        },
        {
            src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655",
            alt: "Creative Community",
            heading: "Connect & Create",
            subheading: "Join a community of passionate learners and creators"
        }
    ];

    return (
        <div className="carousel-container">
            <div 
                id="craftCarousel" 
                className="carousel slide carousel-fade" 
                data-bs-ride="carousel"
                data-bs-interval="5000"
            >
                <div className="carousel-indicators">
                    {carouselImages.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            data-bs-target="#craftCarousel"
                            data-bs-slide-to={index}
                            className={index === 0 ? "active" : ""}
                            aria-label={`Slide ${index + 1}`}
                        />
                    ))}
                </div>

                <div className="carousel-inner">
                    {carouselImages.map((image, index) => (
                        <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                            <img 
                                src={image.src} 
                                className="d-block w-100" 
                                alt={image.alt}
                            />
                            <div className="carousel-caption">
                                <h1 className="carousel-heading">{image.heading}</h1>
                                <p className="carousel-subheading">{image.subheading}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <button 
                    className="carousel-control-prev" 
                    type="button" 
                    data-bs-target="#craftCarousel" 
                    data-bs-slide="prev"
                >
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button 
                    className="carousel-control-next" 
                    type="button" 
                    data-bs-target="#craftCarousel" 
                    data-bs-slide="next"
                >
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
}