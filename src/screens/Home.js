import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import MyOrder from './MyOrder';
import Carausel from '../components/Carausel'
import { FaFilter, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';

export default function Home() {
  const [search, setSearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("http://localhost:5000/api/foodData", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Failed to load data');
      }

      setFoodItem(result.data[0] || []);
      setFoodCat(result.data[1] || []);
    } catch (error) {
      console.error("Loading data failed:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const filteredItems = foodItem.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.CategoryName === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderFilteredItems = () => {
    if (selectedCategory === 'all') {
      return foodCat.map((category) => {
        const itemsInCategory = filteredItems.filter(item => item.CategoryName === category.CategoryName);
        if (itemsInCategory.length === 0) return null;

        return (
          <div key={category._id} className="row mb-3">
            <div className="fs-3 m-3">
              {category.CategoryName}
            </div>
            <hr />
            <div className="row">
              {itemsInCategory.map(item => (
                <div key={item._id} className="col-12 col-md-6 col-lg-3 mb-4">
                  <Card foodItem={item} options={item.options[0]} />
                </div>
              ))}
            </div>
          </div>
        );
      }).filter(Boolean);
    } else {
      return (
        <div className="row mb-3">
          <div className="fs-3 m-3">
            {selectedCategory}
          </div>
          <hr />
          <div className="row">
            {filteredItems.map(item => (
              <div key={item._id} className="col-12 col-md-6 col-lg-3 mb-4">
                <Card foodItem={item} options={item.options[0]} />
              </div>
            ))}
          </div>
        </div>
      );
    }
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="container mt-5 text-center">
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <div className="container mt-5 text-center text-danger">
          <h3>Error loading data</h3>
          <p>{error}</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <div><Navbar /></div>

      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
          <div className="carousel-inner" id='carousel'>
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div className="search-filter-container">
                <h1 className="search-title">Discover Amazing Skills</h1>
                <p className="search-subtitle">Find the perfect course to enhance your abilities</p>
                <div className="d-flex flex-column align-items-center">
                  <div className="search-box mb-3">
                    <input 
                      className="form-control search-input" 
                      type="search" 
                      placeholder="What would you like to learn today?" 
                      value={search} 
                      onChange={(e) => setSearch(e.target.value)} 
                    />
                  </div>
                  <div className="category-filter mb-3">
                    <FaFilter className="filter-icon" />
                    <select 
                      className="form-select category-select" 
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      <option value="all">All Categories</option>
                      {foodCat.map(category => (
                        <option key={category._id} value={category.CategoryName}>
                          {category.CategoryName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <Link 
                    to="/seller-signup" 
                    className="seller-link"
                  >
                    Want to share your skill? Click Here!
                  </Link>
                </div>
              </div>
            </div>
            <div className="carousel-item active">
              <img src="/learn_7.jpg" className="carousel-img d-block w-100" alt="Local iStock Image" />
            </div>
            <div className="carousel-item">
              <img src="/learn_5.jpg" className="carousel-img d-block w-100" alt="Local iStock Image" />
            </div>
            <div className="carousel-item">
              <img src="/learn_3.jpg" className="carousel-img d-block w-100" alt="Local iStock Image" />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div className='container'>
        {filteredItems.length === 0 ? (
          <div className="no-results">
            <h3>No items found</h3>
            <p>Try adjusting your search or category filter</p>
          </div>
        ) : (
          renderFilteredItems()
        )}
      </div>

      <div><Footer /></div>
    </div>
  );
}
