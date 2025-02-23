import React from 'react';
import Navbar from '../components/Navbar';
import './MyOrders.css';

export default function MyOrders() {
    // Sample static order data
    const orders = [
        {
            id: "ORD001",
            date: "Feb 22, 2025",
            status: "Completed",
            items: [
                {
                    name: "Pottery Workshop",
                    instructor: "Sarah Chen",
                    date: "Feb 20, 2025",
                    price: 1200
                }
            ],
            totalAmount: 1200
        },
        {
            id: "ORD002",
            date: "Feb 15, 2025",
            status: "Upcoming",
            items: [
                {
                    name: "Woodworking Basics",
                    instructor: "John Smith",
                    date: "Mar 01, 2025",
                    price: 1500
                }
            ],
            totalAmount: 1500
        }
    ];

    return (
        <div className="orders-page">
            <Navbar />
            <div className="orders-container">
                <div className="orders-header">
                    <h1>My Workshops</h1>
                    <p>Track and manage your workshop bookings</p>
                </div>

                <div className="orders-content">
                    {orders.map((order) => (
                        <div key={order.id} className="order-card">
                            <div className="order-header">
                                <div className="order-info">
                                    <h3>Order #{order.id}</h3>
                                    <span className="order-date">{order.date}</span>
                                </div>
                                <span className={`order-status ${order.status.toLowerCase()}`}>
                                    {order.status}
                                </span>
                            </div>

                            <div className="order-items">
                                {order.items.map((item, index) => (
                                    <div key={index} className="workshop-item">
                                        <div className="workshop-details">
                                            <h4>{item.name}</h4>
                                            <p>Instructor: {item.instructor}</p>
                                            <p>Workshop Date: {item.date}</p>
                                        </div>
                                        <div className="workshop-price">
                                            ₹{item.price}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="order-footer">
                                <div className="order-total">
                                    <span>Total Amount:</span>
                                    <span className="total-amount">₹{order.totalAmount}</span>
                                </div>
                                <div className="order-actions">
                                    <button className="action-btn view-details">
                                        View Details
                                    </button>
                                    {order.status === "Upcoming" && (
                                        <button className="action-btn cancel-workshop">
                                            Cancel Workshop
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {orders.length === 0 && (
                    <div className="no-orders">
                        <img 
                            src="/no-orders.png" 
                            alt="No Orders"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://cdn-icons-png.flaticon.com/512/4076/4076503.png";
                            }}
                        />
                        <h2>No Workshops Yet</h2>
                        <p>You haven't booked any workshops yet. Explore our available workshops and start your creative journey!</p>
                        <button className="browse-workshops-btn">Browse Workshops</button>
                    </div>
                )}
            </div>
        </div>
    );
}
