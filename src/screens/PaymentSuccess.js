import React from 'react';
import { Link } from 'react-router-dom';
import './PaymentSuccess.css';

export default function PaymentSuccess() {
    return (
        <div className="container mt-5 text-center">
            <div className="alert alert-success">
                <h2>Payment Successful!</h2>
                <p>Your order has been successfully placed.</p>
                <div className="mt-4">
                    <Link to="/myOrder" className="btn btn-primary me-3">View My Orders</Link>
                    <Link to="/" className="btn btn-success">Continue Shopping</Link>
                </div>
            </div>
        </div>
    );
}
