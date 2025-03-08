import React from 'react';
import { Link } from 'react-router-dom';


export default function PaymentCancel() {
    return (
        <div className="container mt-5 text-center">
            <div className="alert alert-warning">
                <h2>Payment Cancelled</h2>
                <p>You have cancelled the payment process.</p>
                <div className="mt-4">
                    <Link to="/cart" className="btn btn-primary me-3">Return to Cart</Link>
                    <Link to="/" className="btn btn-success">Continue Shopping</Link>
                </div>
            </div>
        </div>
    );
}
