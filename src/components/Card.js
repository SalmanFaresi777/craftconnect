import React, { useState, useEffect, useRef } from 'react';
import { useDispatchCart, useCart } from './ComponentReducer'
import './Card.css';
import { FaShoppingCart, FaInfoCircle } from 'react-icons/fa';
import CardDetails from './CardDetails';

export default function CardComponent(props) {
    let dispatch = useDispatchCart();
    let data = useCart();
    const priceRef = useRef();
    let options = props.options;
    let priceOptions = Object.keys(options);

    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");
    const [isAdding, setIsAdding] = useState(false);
    const [showDetails, setShowDetails] = useState(false);

    const handleAddToCart = async () => {
        setIsAdding(true);
        let existingFood = data.find(item => item.id === props.foodItem._id);
        
        try {
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
            
            // Show success feedback
            const button = document.getElementById(`add-to-cart-${props.foodItem._id}`);
            button.classList.add('success');
            setTimeout(() => {
                button.classList.remove('success');
                setIsAdding(false);
            }, 1500);

        } catch (error) {
            console.error("Error adding to cart:", error);
            setIsAdding(false);
        }
    }

    const handleDetailsAddToCart = ({ qty: detailsQty, size: detailsSize }) => {
        setQty(detailsQty);
        setSize(detailsSize);
        handleAddToCart();
    };

    let finalPrice = qty * parseInt(options[size]);
    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])

    return (
        <>
            <div className="food-card" onClick={() => setShowDetails(true)}>
                <div className="card-image-container">
                    <img src={props.foodItem.img} className="card-img-top" alt={props.foodItem.name} />
                    {props.foodItem.category && (
                        <span className="category-badge">{props.foodItem.category}</span>
                    )}
                </div>
                <div className="card-body">
                    <h5 className="card-title">{props.foodItem.name}</h5>
                    <p className="card-description">{props.foodItem.description}</p>
                    
                    <div className="options-container">
                        <div className="quantity-select">
                            <label>Qty:</label>
                            <select 
                                className="form-select"
                                value={qty}
                                onChange={(e) => setQty(e.target.value)}
                                onClick={(e) => e.stopPropagation()}
                            >
                                {Array.from(Array(6), (_, i) => (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                ))}
                            </select>
                        </div>

                        <div className="size-select">
                            <label>Size:</label>
                            <select 
                                className="form-select"
                                ref={priceRef}
                                value={size}
                                onChange={(e) => setSize(e.target.value)}
                                onClick={(e) => e.stopPropagation()}
                            >
                                {priceOptions.map((data) => (
                                    <option key={data} value={data}>{data}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="price-action-container">
                        <div className="price-tag">
                            ₹{finalPrice}/-
                        </div>
                        <div className="button-group">
                            <button 
                                className="details-btn"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowDetails(true);
                                }}
                            >
                                <FaInfoCircle />
                            </button>
                            <button 
                                id={`add-to-cart-${props.foodItem._id}`}
                                className={`add-to-cart-btn ${isAdding ? 'adding' : ''}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleAddToCart();
                                }}
                                disabled={isAdding}
                            >
                                <FaShoppingCart className="cart-icon" />
                                {isAdding ? 'Adding...' : 'Add to Cart'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {showDetails && (
                <CardDetails 
                    foodItem={props.foodItem}
                    options={options}
                    onClose={() => setShowDetails(false)}
                    onAddToCart={handleDetailsAddToCart}
                />
            )}
        </>
    );
}
