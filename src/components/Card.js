import React, { useState, useEffect, useRef } from 'react';
import { useDispatchCart, useCart } from './ComponentReducer';
import './Card.css';

export default function CardComponent(props) {
    let dispatch = useDispatchCart();
    let data = useCart();
    const priceRef = useRef();
    let options = props.options;
    let priceOptions = Object.keys(options);

    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");
    const [isHovered, setIsHovered] = useState(false);

    const handleAddToCart = async () => {
        let existingFood = data.find(item => item.id === props.foodItem._id);
        
        if (existingFood) {
            if (existingFood.size === size) {
                await dispatch({ 
                    type: "UPDATE", 
                    id: props.foodItem._id, 
                    price: parseInt(options[size]), 
                    qty: qty 
                });
            } else {
                await dispatch({ 
                    type: "ADD", 
                    id: props.foodItem._id, 
                    name: props.foodItem.name, 
                    price: finalPrice, 
                    qty: qty, 
                    size: size,
                    img: props.foodItem.img 
                });
            }
        } else {
            await dispatch({ 
                type: "ADD", 
                id: props.foodItem._id, 
                name: props.foodItem.name, 
                price: finalPrice, 
                qty: qty, 
                size: size,
                img: props.foodItem.img 
            });
        }
    }

    let finalPrice = qty * parseInt(options[size]);
    
    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])

    return (
        <div className="card-wrapper">
            <div 
                className={`skill-card ${isHovered ? 'hovered' : ''}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="card-image-container">
                    <img 
                        src={props.foodItem.img} 
                        className="card-image" 
                        alt={props.foodItem.name} 
                    />
                    <div className="card-overlay">
                        <div className="skill-level">{size || 'Select Level'}</div>
                    </div>
                </div>

                <div className="card-content">
                    <h3 className="skill-title">{props.foodItem.name}</h3>
                    <p className="skill-description">
                        {props.foodItem.description || 'Learn this amazing skill from our community experts'}
                    </p>

                    <div className="card-controls">
                        <div className="control-group">
                            <label className="control-label">Sessions:</label>
                            <select 
                                className="session-select"
                                value={qty}
                                onChange={(e) => setQty(e.target.value)}
                            >
                                {Array.from(Array(6), (_, i) => (
                                    <option key={i + 1} value={i + 1}>
                                        {i + 1} {i === 0 ? 'Session' : 'Sessions'}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="control-group">
                            <label className="control-label">Level:</label>
                            <select 
                                className="level-select"
                                ref={priceRef}
                                value={size}
                                onChange={(e) => setSize(e.target.value)}
                            >
                                {priceOptions.map((data) => (
                                    <option key={data} value={data}>
                                        {data}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="card-footer">
                        <div className="price">₹{finalPrice}/-</div>
                        <button 
                            className="enroll-button"
                            onClick={handleAddToCart}
                        >
                            Enroll Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
