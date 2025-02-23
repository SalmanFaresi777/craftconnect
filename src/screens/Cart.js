import React from 'react';
import { useCart, useDispatchCart } from '../components/ComponentReducer';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

export default function Cart() {
    const data = useCart();
    const dispatch = useDispatchCart();
    const navigate = useNavigate();

    const handleNavigateHome = () => {
        navigate('/');
    };

    if (data.length === 0) {
        return (
            <div className="empty-cart-container">
                <div className="empty-cart">
                    <button 
                        className="close-btn"
                        onClick={handleNavigateHome}
                        aria-label="Close"
                    />
                    <img 
                        src="/empty-cart.png" 
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://cdn-icons-png.flaticon.com/512/2038/2038854.png";
                        }}
                        alt="Empty Cart" 
                        className="empty-cart-image"
                        style={{ animation: 'float 3s ease-in-out infinite' }}
                    />
                    <h2>Your Cart is Empty!</h2>
                    <p>Looks like you haven't added any workshops yet.</p>
                    <button 
                        className="browse-btn"
                        onClick={handleNavigateHome}
                    >
                        Browse CraftConnect
                    </button>
                </div>
            </div>
        );
    }

    const totalPrice = data.reduce((total, item) => total + item.price * item.qty, 0);
    const totalItems = data.reduce((total, item) => total + item.qty, 0);

    const handleCheckout = () => {
        // Implement checkout logic here
        alert('Checkout functionality will be implemented soon!');
    };

    const handleQuantityChange = (index, newQty) => {
        if (newQty > 0) {
            dispatch({
                type: "UPDATE_QTY",
                index: index,
                qty: newQty
            });
        }
    };

    return (
        <div className="cart-container">
            <button 
                className="close-btn"
                onClick={handleNavigateHome}
                aria-label="Close"
            />
            <div className="cart-header">
                <h1>Shopping Cart</h1>
                <span className="item-count">{totalItems} item{totalItems !== 1 ? 's' : ''}</span>
            </div>

            <div className="cart-content">
                <div className="cart-items">
                    {data.map((item, index) => (
                        <div key={index} className="cart-item">
                            <div className="item-image">
                                <img src={item.img || '/workshop-placeholder.png'} alt={item.name} />
                            </div>
                            <div className="item-details">
                                <h3>{item.name}</h3>
                                <p className="item-option">{item.size}</p>
                                <div className="quantity-controls">
                                    <button 
                                        className="qty-btn"
                                        onClick={() => handleQuantityChange(index, item.qty - 1)}
                                    >
                                        -
                                    </button>
                                    <span className="qty-display">{item.qty}</span>
                                    <button 
                                        className="qty-btn"
                                        onClick={() => handleQuantityChange(index, item.qty + 1)}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <div className="item-price">
                                ₹{item.price * item.qty}
                            </div>
                            <button 
                                className="remove-btn"
                                onClick={() => dispatch({ type: "REMOVE", index: index })}
                            >
                                <i className="bi bi-trash"></i>
                            </button>
                        </div>
                    ))}
                </div>

                <div className="cart-summary">
                    <h2>Order Summary</h2>
                    <div className="summary-item">
                        <span>Subtotal ({totalItems} items)</span>
                        <span>₹{totalPrice}</span>
                    </div>
                    <div className="summary-item">
                        <span>Discount</span>
                        <span className="discount">-₹0</span>
                    </div>
                    <div className="summary-item total">
                        <span>Total Amount</span>
                        <span>₹{totalPrice}</span>
                    </div>
                    <button 
                        className="checkout-btn"
                        onClick={handleCheckout}
                    >
                        Proceed to Checkout
                    </button>
                    <button 
                        className="continue-shopping"
                        onClick={handleNavigateHome}
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        </div>
    );
}
