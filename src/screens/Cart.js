import React, { useState } from 'react';
import { useCart, useDispatchCart } from '../components/ComponentReducer';
import './Cart.css';
import { FaTrash, FaShoppingBag, FaCreditCard, FaGraduationCap } from 'react-icons/fa';

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  const [loading, setLoading] = useState(false);

  if (data.length === 0) {
    return (
      <div className="cart-empty">
        <div className="empty-cart-content">
          <FaGraduationCap className="empty-cart-icon" />
          <h2>Your Learning Cart is Empty!</h2>
          <p>Start your learning journey by adding some courses to your cart.</p>
        </div>
      </div>
    )
  }

  const handleCheckOut = async () => {
    try {
      setLoading(true);
      let userEmail = localStorage.getItem("userEmail");
      
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
        const paymentResponse = await fetch("http://localhost:5000/api/payment/create", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            total_amount: data.reduce((total, course) => total + course.price, 0),
            cus_email: userEmail,
            order_items: data.map(course => ({
              name: course.name,
              price: course.price,
              quantity: course.qty,
              type: course.size // Course type (Beginner/Intermediate)
            }))
          })
        });

        const paymentData = await paymentResponse.json();
        
        if (paymentData.paymentUrl) {
          window.location.href = paymentData.paymentUrl;
        } else {
          alert("Payment initialization failed. Please try again.");
        }
      }
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment process failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  let totalPrice = data.reduce((total, course) => total + course.price, 0);

  return (
    <div className="cart-container">
      <div className="cart-content">
        <h1 className="cart-title">
          <FaGraduationCap className="cart-title-icon" />
          Your Learning Cart
        </h1>
        
        <div className="cart-items">
          {data.map((course, index) => (
            <div key={index} className={`cart-item ${course.size.toLowerCase()}-course`}>
              <div className="item-image">
                <img src={course.img} alt={course.name} />
                <span className="course-type-badge">{course.size}</span>
              </div>
              <div className="item-details">
                <h3 className="item-name">{course.name}</h3>
                <div className="item-meta">
                  <span className="item-level">
                    Level: {course.size}
                    {course.size === 'Beginner' ? ' (₹499)' : ' (₹799)'}
                  </span>
                  <span className="item-sessions">Sessions: {course.qty}</span>
                </div>
              </div>
              <div className="item-price">
                ₹{course.price}/-
              </div>
              <button 
                className="remove-item-btn"
                onClick={() => { dispatch({ type: "REMOVE", index: index }); }}
                aria-label="Remove course"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div className="summary-row">
            <span>Course Total:</span>
            <span>₹{totalPrice}/-</span>
          </div>
          <div className="summary-row">
            <span>Platform Fee:</span>
            <span>₹0/-</span>
          </div>
          <div className="summary-row total">
            <span>Total Amount:</span>
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
            <p>Course access details will be sent to {localStorage.getItem("userEmail")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
