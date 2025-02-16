import React from 'react';

export default function CardComponent({ 
    skill = "Watercolor Painting", 
    category = "Arts",
    tutor = "Sarah Anderson", 
    experience = "15+ years",
    rating = 4.8,
    reviews = 32,
    price = 45,
    image = "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b",
    level = "All Levels",
    schedule = "Flexible"
}) {
    // Map categories to icons
    const categoryIcons = {
        "Arts": "bi-palette",
        "Music": "bi-music-note-beamed",
        "Dance": "bi-music-player",
        "Crafts": "bi-tools",
        "Photography": "bi-camera",
        "Cooking": "bi-cup-hot",
        "Languages": "bi-translate",
        "Technology": "bi-laptop",
        "Fitness": "bi-heart-pulse"
    };

    return (
        <div className="card h-100 border-0 shadow-sm hover-shadow-lg transition-all">
            <div className="position-relative">
                <img 
                    src={image}
                    className="card-img-top" 
                    alt={skill}
                    style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="position-absolute top-0 start-0 m-2">
                    <span className="badge bg-primary rounded-pill px-3 py-2">
                        <i className={`bi ${categoryIcons[category] || 'bi-star'} me-1`}></i>
                        {category}
                    </span>
                </div>
                <div className="position-absolute top-0 end-0 m-2">
                    <span className="badge bg-light text-dark rounded-pill px-3 py-2">
                        <i className="bi bi-bar-chart me-1"></i>
                        {level}
                    </span>
                </div>
            </div>

            <div className="card-body d-flex flex-column">
                {/* Tutor Info */}
                <div className="d-flex align-items-center mb-3">
                    <div className="rounded-circle bg-primary bg-opacity-10 p-2 me-2">
                        <i className="bi bi-person-circle fs-4 text-primary"></i>
                    </div>
                    <div>
                        <h6 className="mb-0 fw-bold">{tutor}</h6>
                        <small className="text-muted">{experience} experience</small>
                    </div>
                </div>

                {/* Skill Title and Description */}
                <h5 className="card-title">{skill}</h5>
                <p className="card-text text-muted">
                    Learn {skill.toLowerCase()} from an expert instructor. 
                    Classes designed for {level.toLowerCase()} with {schedule.toLowerCase()} scheduling.
                </p>

                {/* Rating and Price */}
                <div className="mt-auto">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div className="d-flex align-items-center">
                            <div className="text-warning me-1">
                                <i className="bi bi-star-fill"></i>
                            </div>
                            <span className="fw-bold me-1">{rating}</span>
                            <span className="text-muted">({reviews} reviews)</span>
                        </div>
                        <div className="fs-5 fw-bold text-primary">${price}/hr</div>
                    </div>

                    {/* Class Options */}
                    <div className="d-flex gap-2 mb-3">
                        <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2">
                            <i className="bi bi-camera-video me-1"></i>
                            Online
                        </span>
                        <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2">
                            <i className="bi bi-calendar me-1"></i>
                            {schedule}
                        </span>
                    </div>

                    {/* Action Button */}
                    <button className="btn btn-primary w-100">
                        <i className="bi bi-calendar-check me-2"></i>
                        Book First Class
                    </button>
                </div>
            </div>
        </div>
    );
}
