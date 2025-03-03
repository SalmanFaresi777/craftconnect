import React from 'react';
import { Link } from 'react-router-dom';


export default function PaymentFail() {
    return (
        <div className="container mt-5 text-center">
            <div className="alert alert-danger">
                <h2>Payment Failed</h2>
                <p>Unfortunately, your payment could not be processed.</p>
                <div className="mt-4">
                    <Link to="/myOrder" className="btn btn-primary me-3">View My Orders</Link>
                    <Link to="/" className="btn btn-success">Continue Shopping</Link>
                </div>
            </div>
        </div>
    );
}
