import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import Carausel from '../components/Carausel'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  // Sample skill data
  const skillCards = [
    {
      skill: "Piano",
      category: "Music",
      tutor: "John Smith",
      experience: "20+ years",
      rating: 4.9,
      reviews: 45,
      price: 50,
      image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0",
      level: "All Levels",
      schedule: "Flexible"
    },
    {
      skill: "Oil Painting",
      category: "Arts",
      tutor: "Maria Garcia",
      experience: "15+ years",
      rating: 4.8,
      reviews: 38,
      price: 45,
      image: "https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1",
      level: "Beginner",
      schedule: "Weekends"
    },
    {
      skill: "Guitar",
      category: "Music",
      tutor: "David Chen",
      experience: "12+ years",
      rating: 4.7,
      reviews: 29,
      price: 40,
      image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1",
      level: "Intermediate",
      schedule: "Evenings"
    },
    {
      skill: "Photography",
      category: "Photography",
      tutor: "Emma Wilson",
      experience: "10+ years",
      rating: 4.9,
      reviews: 42,
      price: 55,
      image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d",
      level: "All Levels",
      schedule: "Weekends"
    },
    {
      skill: "Pottery",
      category: "Crafts",
      tutor: "Michael Brown",
      experience: "18+ years",
      rating: 4.8,
      reviews: 35,
      price: 60,
      image: "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9",
      level: "All Levels",
      schedule: "Flexible"
    },
    {
      skill: "Digital Art",
      category: "Arts",
      tutor: "Sophie Lee",
      experience: "8+ years",
      rating: 4.7,
      reviews: 31,
      price: 45,
      image: "/designer_1.jpg",
      level: "Beginner",
      schedule: "Weekdays"
    },
    {
      skill: "Violin",
      category: "Music",
      tutor: "Robert Taylor",
      experience: "25+ years",
      rating: 4.9,
      reviews: 50,
      price: 65,
      image: "https://images.unsplash.com/photo-1612225330812-01a9c6b355ec",
      level: "All Levels",
      schedule: "Flexible"
    },
    {
      skill: "Cooking",
      category: "Cooking",
      tutor: "Lisa Martinez",
      experience: "14+ years",
      rating: 4.8,
      reviews: 44,
      price: 50,
      image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f",
      level: "Beginner",
      schedule: "Evenings"
    }
  ];

  const categoryIcons = {
    Music: 'bi-music-note',
    Arts: 'bi-palette',
    Crafts: 'bi-palette',
    Photography: 'bi-camera',
    Cooking: 'bi-utensils',
    Technology: 'bi-code',
    Fitness: 'bi-dumbbell',
    Languages: 'bi-translate'
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      <Navbar />
      <Carausel />

      {/* Featured Skills Section */}
      <div className="container-fluid bg-light py-5">
        <div className="container">
          <div className="row mb-4">
            <div className="col-lg-8">
              <h2 className="display-5 fw-bold mb-2">Featured Skills</h2>
              <p className="text-muted lead">Discover top-rated skills from expert instructors</p>
            </div>
            <div className="col-lg-4 d-flex align-items-center justify-content-lg-end">
              <button className="btn btn-primary rounded-pill px-4">
                <i className="bi bi-grid me-2"></i>
                View All Skills
              </button>
            </div>
          </div>

          <div className="row g-4">
            {skillCards.map((card, index) => (
              <div key={index} className="col-12 col-md-6 col-lg-3">
                <Card {...card} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="container-fluid py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">Browse by Category</h2>
            <p className="lead text-muted">Find the perfect skill that matches your interests</p>
          </div>
          <div className="row g-4 justify-content-center">
            {["Music", "Arts", "Crafts", "Photography", "Cooking", "Technology", "Fitness", "Languages"].map((category, index) => (
              <div key={index} className="col-6 col-md-3">
                <div className="card h-100 border-0 shadow-sm hover-lift"
                     style={{
                       transition: 'all 0.3s ease',
                       cursor: 'pointer',
                       borderRadius: '15px',
                       overflow: 'hidden'
                     }}
                     onMouseEnter={(e) => {
                       e.currentTarget.style.transform = 'translateY(-5px)';
                       e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
                     }}
                     onMouseLeave={(e) => {
                       e.currentTarget.style.transform = 'translateY(0)';
                       e.currentTarget.style.boxShadow = '';
                     }}>
                  <div className="card-body text-center p-4">
                    <div className="mb-4">
                      <i className={`bi ${categoryIcons[category] || 'bi-star'} fs-1 text-primary`}></i>
                    </div>
                    <h5 className="fw-bold mb-2">{category}</h5>
                    <p className="text-muted mb-0">Explore {category.toLowerCase()} classes</p>
                  </div>
                  <div className="card-footer bg-primary bg-opacity-10 border-0 py-3">
                    <small className="text-primary d-flex align-items-center justify-content-center">
                      Learn More <i className="bi bi-arrow-right ms-2"></i>
                    </small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
