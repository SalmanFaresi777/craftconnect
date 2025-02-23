import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import MyOrders from './MyOrders';
import Carousel from '../components/Carausel';
import { Container, Row, Col, Form, Alert, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

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
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredItems = foodItem.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.CategoryName === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <Spinner animation="border" variant="success" />
      </div>
    );
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="flex-grow-1">
        <Carousel />
        
        <Container className="my-4">
          <Row className="g-4">
            <Col md={8}>
              <Form.Control
                type="search"
                placeholder="Search for crafts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
              />
            </Col>
            <Col md={4}>
              <Form.Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="category-select"
              >
                <option value="all">All Categories</option>
                {foodCat.map(category => (
                  <option key={category._id} value={category.CategoryName}>
                    {category.CategoryName}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>

          {error && (
            <Alert variant="danger" className="my-3">
              {error}
            </Alert>
          )}

          <Row className="mt-4">
            {filteredItems.length === 0 ? (
              <Col className="text-center">
                <h3>No items found</h3>
              </Col>
            ) : (
              filteredItems.map(item => (
                <Col key={item._id} xs={12} sm={6} lg={4} className="mb-4">
                  <Card 
                    foodItem={item}
                    options={item.options[0]}
                  />
                </Col>
              ))
            )}
          </Row>
        </Container>
      </div>
      <Footer />
    </div>
  );
}