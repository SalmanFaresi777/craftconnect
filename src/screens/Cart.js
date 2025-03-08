import React, { useState } from 'react';
import { useCart, useDispatchCart } from '../components/ComponentReducer';
import './Cart.css';
import { FaTrash, FaShoppingBag, FaCreditCard } from 'react-icons/fa';

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  const [loading, setLoading] = useState(false);

  if (data.length === 0) {
    return (
      <div className="cart-empty">
        <div className="empty-cart-content">
          <FaShoppingBag className="empty-cart-icon" />
          <h2>Your Cart is Empty!</h2>
          <p>Add some delicious items to your cart and come back here to checkout.</p>
        </div>
      </div>
    )
  }

  const handleCheckOut = async () => {
    try {
      setLoading(true);
      let userEmail = localStorage.getItem("userEmail");
      
      // First create the order
      let orderResponse = await fetch("http://localhost:5000/api/orderData", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          order_data: data,
          email: userEmail,
          order_date: new Date().toDateString()
        })
      });

      if (orderResponse.status === 200) {
        // Initialize SSLCommerz payment
        const paymentResponse = await fetch("http://localhost:5000/api/payment/create", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            total_amount: data.reduce((total, food) => total + food.price, 0),
            cus_email: userEmail,
            order_items: data.map(item => ({
              name: item.name,
              price: item.price,
              quantity: item.qty
            }))
          })
        });

        const paymentData = await paymentResponse.json();
        
        if (paymentData.paymentUrl) {
          // Redirect to SSLCommerz payment gateway
          window.location.href = paymentData.paymentUrl;
        } else {
          alert("Payment initialization failed!");
        }
      }
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment process failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div className="cart-container">
      <div className="cart-content">
        <h1 className="cart-title">Shopping Cart</h1>
        
        <div className="cart-items">
          {data.map((food, index) => (
            <div key={index} className="cart-item">
              <div className="item-image">
                <img src={food.img} alt={food.name} />
              </div>
              <div className="item-details">
                <h3 className="item-name">{food.name}</h3>
                <div className="item-meta">
                  <span className="item-size">Course Type: {food.size}</span>
                  <span className="item-quantity">Sessions: {food.qty}</span>
                </div>
              </div>
              <div className="item-price">
                ₹{food.price}/-
              </div>
              <button 
                className="remove-item-btn"
                onClick={() => { 
                  dispatch({ type: "REMOVE", index: index });
                }}
                aria-label="Remove item"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>₹{totalPrice}/-</span>
          </div>
          <div className="summary-row">
            <span>Delivery Fee:</span>
            <span>₹0/-</span>
          </div>
          <div className="summary-row total">
            <span>Total:</span>
            <span>₹{totalPrice}/-</span>
          </div>
          
          <button 
            className={`checkout-btn ${loading ? 'loading' : ''}`}
            onClick={handleCheckOut} 
            disabled={loading}
          >
            <FaCreditCard className="btn-icon" />
            <span>{loading ? 'Processing...' : 'Proceed to Payment'}</span>
          </button>
          
          <div className="payment-info">
            <p>Secure payment powered by SSLCommerz</p>
            <p>Your order details will be sent to {localStorage.getItem("userEmail")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
