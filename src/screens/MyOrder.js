import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import MyOrderDetails from '../components/MyOrderDetails';
import './MyOrder.css';
import { FaShoppingBag, FaCalendarAlt, FaCreditCard, FaCheckCircle, FaTimesCircle, FaSpinner, FaInfoCircle } from 'react-icons/fa';

export default function MyOrder() {
    const [orderData, setorderData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeFilter, setActiveFilter] = useState('all');
    const [selectedOrder, setSelectedOrder] = useState(null);

    const fetchMyOrder = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch("http://localhost:5000/api/auth/myOrderData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: localStorage.getItem('userEmail')
                })
            });
            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }
            const data = await response.json();
            setorderData(data.orderData || []);
        } catch (error) {
            console.error('Error fetching orders:', error);
            setError('Failed to load your orders. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchMyOrder();
    }, []);

    const formatDate = (dateString) => {
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric'
        };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    const getStatusIcon = (status) => {
        switch(status?.toLowerCase()) {
            case 'completed':
                return <FaCheckCircle className="status-icon completed" />;
            case 'failed':
                return <FaTimesCircle className="status-icon failed" />;
            case 'pending':
                return <FaSpinner className="status-icon pending spin" />;
            default:
                return null;
        }
    }

    const calculateOrderTotal = (items) => {
        return items.reduce((total, item) => {
            if (!item.Order_date) {
                return total + (item.price * item.qty);
            }
            return total;
        }, 0);
    }

    const filterOrders = (orders, filter) => {
        if (filter === 'all') return orders;
        return orders.filter(orderGroup => {
            const status = orderGroup[0]?.status?.toLowerCase();
            return status === filter;
        });
    }

    if (error) {
        return (
            <div>
                <Navbar />
                <div className="error-container">
                    <div className="error-message">
                        <FaTimesCircle className="error-icon" />
                        <p>{error}</p>
                        <button className="retry-button" onClick={fetchMyOrder}>
                            Try Again
                        </button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="my-orders-page">
            <Navbar />
            
            <div className='container my-5'>
                <div className="orders-header">
                    <div className="d-flex align-items-center">
                        <FaShoppingBag className="orders-icon me-2" />
                        <h2 className="mb-0">My Orders</h2>
                    </div>
                    <div className="order-filters">
                        <button 
                            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                            onClick={() => setActiveFilter('all')}
                        >
                            All
                        </button>
                        
                    </div>
                </div>

                {isLoading ? (
                    <div className="loading-container">
                        <div className="loading-spinner"></div>
                        <p>Loading your orders...</p>
                    </div>
                ) : (
                    <>
                        {orderData.length === 0 ? (
                            <div className="empty-orders">
                                <FaShoppingBag className="empty-icon" />
                                <h3>No Orders Yet</h3>
                                <p>Your order history will appear here</p>
                            </div>
                        ) : (
                            <div className="orders-list">
                                {filterOrders(orderData, activeFilter).map((item, index) => (
                                    <div key={index} className="order-group">
                                        <div className="order-header">
                                            <div className="d-flex align-items-center">
                                                <FaCalendarAlt className="calendar-icon me-2" />
                                                <h3 className="mb-0">{formatDate(item[0]?.Order_date)}</h3>
                                            </div>
                                            {item[0]?.status && (
                                                <div className="order-status">
                                                    {getStatusIcon(item[0].status)}
                                                    <span className={`status-text ${item[0].status.toLowerCase()}`}>
                                                        {item[0].status}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div className="order-items">
                                            {item.map((arrayData, dataIndex) => (
                                                !arrayData.Order_date && (
                                                    <div key={dataIndex} className="order-item">
                                                        <div className="order-card">
                                                            <div className="order-details">
                                                                <h4>{arrayData.name}</h4>
                                                                <div className="order-info">
                                                                    <span>Sessions: {arrayData.qty}</span>
                                                                    <span>Course Type: {arrayData.size}</span>
                                                                    <span className="price">₹{arrayData.price}/-</span>
                                                                </div>
                                                                <button 
                                                                    className="details-btn mt-2"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        setSelectedOrder({
                                                                            foodItem: {
                                                                                name: arrayData.name,
                                                                                img: arrayData.img,
                                                                                description: arrayData.description,
                                                                                category: arrayData.CategoryName,
                                                                                calories: arrayData.calories,
                                                                                protein: arrayData.protein,
                                                                                carbs: arrayData.carbs,
                                                                                fat: arrayData.fat
                                                                            },
                                                                            options: { [arrayData.size]: arrayData.price }
                                                                        });
                                                                    }}
                                                                >
                                                                    <FaInfoCircle className="me-1" />
                                                                    View Details
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            ))}
                                        </div>

                                        <div className="order-footer">
                                            <div className="order-total">
                                                <FaCreditCard className="payment-icon" />
                                                <span>Order Total: </span>
                                                <strong>₹{calculateOrderTotal(item)}/-</strong>
                                            </div>
                                            {item[0]?.transaction_id && (
                                                <div className="transaction-info">
                                                    <small>Transaction ID: {item[0].transaction_id}</small>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
            {selectedOrder && (
                <MyOrderDetails 
                    foodItem={selectedOrder.foodItem}
                    options={selectedOrder.options}
                    onClose={() => setSelectedOrder(null)}
                    onAddToCart={({ qty, size }) => {
                        // Handle adding to cart
                        // dispatch({
                        //     type: "ADD",
                        //     id: selectedOrder.foodItem._id,
                        //     name: selectedOrder.foodItem.name,
                        //     price: parseInt(selectedOrder.options[size]),
                        //     qty: qty,
                        //     size: size,
                        //     img: selectedOrder.foodItem.img
                        // });
                        setSelectedOrder(null);
                    }}
                />
            )}
            <Footer />
        </div>
    );
}