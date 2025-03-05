import React from 'react';
import './MyOrderDetails.css';
import { FaTimes, FaCalendarAlt, FaCreditCard } from 'react-icons/fa';

export default function MyOrderDetails({ orderData, onClose }) {
    if (!orderData) return null;

    const formatDate = (dateString) => {
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const calculateOrderTotal = (items) => {
        return items.reduce((total, item) => {
            if (!item.Order_date) {
                return total + (item.price * item.qty);
            }
            return total;
        }, 0);
    };

    return (
        <div className="order-details-overlay">
            <div className="order-details-modal">
                <button className="close-button" onClick={onClose}>
                    <FaTimes />
                </button>
                
                <div className="modal-content">
                    <div className="order-header">
                        <div className="date-section">
                            <FaCalendarAlt className="calendar-icon" />
                            <h3>Order Date</h3>
                            <p>{formatDate(orderData[0]?.Order_date)}</p>
                        </div>

                        <div className="status-section">
                            <h3>Order Status</h3>
                            <span className={`status-badge ${orderData[0]?.status?.toLowerCase()}`}>
                                {orderData[0]?.status}
                            </span>
                        </div>
                    </div>

                    <div className="items-section">
                        <h3>Order Items</h3>
                        <div className="items-list">
                            {orderData.map((item, index) => (
                                !item.Order_date && (
                                    <div key={index} className="order-item">
                                        <div className="item-image">
                                            <img src={item.img} alt={item.name} />
                                        </div>
                                        <div className="item-details">
                                            <h4>{item.name}</h4>
                                            <div className="item-specs">
                                                <span>Quantity: {item.qty}</span>
                                                <span>Size: {item.size}</span>
                                                <span className="item-price">₹{item.price}/-</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            ))}
                        </div>
                    </div>

                    <div className="payment-section">
                        <div className="total-amount">
                            <FaCreditCard className="payment-icon" />
                            <h3>Total Amount</h3>
                            <p className="amount">₹{calculateOrderTotal(orderData)}/-</p>
                        </div>
                        
                        {orderData[0]?.transaction_id && (
                            <div className="transaction-details">
                                <h3>Transaction Details</h3>
                                <p className="transaction-id">
                                    Transaction ID: {orderData[0].transaction_id}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
