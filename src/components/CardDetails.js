import React from 'react';
import './CardDetails.css';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaTimes } from 'react-icons/fa';

export default function CardDetails({ foodItem, options, onClose, onAddToCart }) {
    const navigate = useNavigate();
    const [qty, setQty] = React.useState(1);
    const [size, setSize] = React.useState(Object.keys(options)[0]);

    const finalPrice = qty * parseInt(options[size]);

    const handleAddToCart = () => {
        onAddToCart({ qty, size });
        onClose();
    };

    if (!foodItem) return null;

    return (
        <div className="card-details-overlay">
            <div className="card-details-modal">
                <button className="close-button" onClick={onClose}>
                    <FaTimes />
                </button>
                
                <div className="modal-content">
                    <div className="image-section">
                        <img src={foodItem.img} alt={foodItem.name} />
                        {foodItem.category && (
                            <span className="category-badge">{foodItem.category}</span>
                        )}
                    </div>
                    
                    <div className="details-section">
                        <h2>{foodItem.name}</h2>
                        <p className="description">{foodItem.description}</p>
                        
                        <div className="options-container">
                            <div className="quantity-select">
                                <label>Sessions:</label>
                                <select 
                                    className="form-select"
                                    value={qty}
                                    onChange={(e) => setQty(parseInt(e.target.value))}
                                >
                                    {Array.from(Array(6), (_, i) => (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="size-select">
                                <label>Course Type:</label>
                                <select 
                                    className="form-select"
                                    value={size}
                                    onChange={(e) => setSize(e.target.value)}
                                >
                                    {Object.keys(options).map((size) => (
                                        <option key={size} value={size}>{size}</option>
                                    ))}
                                </select>
                            </div>
                        </div>


                        {foodItem.name === "Chicken Fried Rice" && (
                            <div className="video-links">
                                <h3>Tutorial Videos</h3>
                                <div className="video-grid">
                                    <a href="https://drive.google.com/file/d/1IibHarfvL5zo5iQwbM2FXuHtMkS1U389/view?usp=drive_link" 
                                       target="_blank" 
                                       rel="noopener noreferrer"
                                       className="video-link">
                                        Tutorial 1
                                    </a>
                                    <a href="https://drive.google.com/file/d/1wR5Gb4mG-YsDTxIZ_zIG_45tbg0ObKec/view?usp=drive_link" 
                                       target="_blank" 
                                       rel="noopener noreferrer"
                                       className="video-link">
                                        Tutorial 2
                                    </a>
                                </div>
                                <h3>Order For More Tutorials...</h3>
                            </div>
                        )}

                        {foodItem.name === "Chicken Biryani" && (
                            <div className="video-links">
                                <h3>Tutorial Videos</h3>
                                <div className="video-grid">
                                    <a href="https://drive.google.com/file/d/1IibHarfvL5zo5iQwbM2FXuHtMkS1U389/view?usp=drive_link" 
                                       target="_blank" 
                                       rel="noopener noreferrer"
                                       className="video-link">
                                        Tutorial 1
                                    </a>
                                    <a href="https://drive.google.com/file/d/1wR5Gb4mG-YsDTxIZ_zIG_45tbg0ObKec/view?usp=drive_link" 
                                       target="_blank" 
                                       rel="noopener noreferrer"
                                       className="video-link">
                                        Tutorial 2
                                    </a>
                                </div>
                                <h3>Order For More Tutorials...</h3>
                            </div>
                        )}

                        {foodItem.name === "Beef Biryani" && (
                            <div className="video-links">
                                <h3>Tutorial Videos</h3>
                                <div className="video-grid">
                                    <a href="https://drive.google.com/file/d/1IibHarfvL5zo5iQwbM2FXuHtMkS1U389/view?usp=drive_link" 
                                       target="_blank" 
                                       rel="noopener noreferrer"
                                       className="video-link">
                                        Tutorial 1
                                    </a>
                                    <a href="https://drive.google.com/file/d/1wR5Gb4mG-YsDTxIZ_zIG_45tbg0ObKec/view?usp=drive_link" 
                                       target="_blank" 
                                       rel="noopener noreferrer"
                                       className="video-link">
                                        Tutorial 2
                                    </a>
                                </div>
                                <h3>Order For More Tutorials...</h3>
                            </div>
                        )}

                        {foodItem.name === "Prawn Fried Rice" && (
                            <div className="video-links">
                                <h3>Tutorial Videos</h3>
                                <div className="video-grid">
                                    <a href="https://drive.google.com/file/d/1IibHarfvL5zo5iQwbM2FXuHtMkS1U389/view?usp=drive_link" 
                                       target="_blank" 
                                       rel="noopener noreferrer"
                                       className="video-link">
                                        Tutorial 1
                                    </a>
                                    <a href="https://drive.google.com/file/d/1wR5Gb4mG-YsDTxIZ_zIG_45tbg0ObKec/view?usp=drive_link" 
                                       target="_blank" 
                                       rel="noopener noreferrer"
                                       className="video-link">
                                        Tutorial 2
                                    </a>
                                </div>
                                <h3>Order For More Tutorials...</h3>
                            </div>
                        )}  

                        {foodItem.name === "Chilli Paneer" && (
                            <div className="video-links">
                                <h3>Tutorial Videos</h3>
                                <div className="video-grid">
                                    <a href="https://drive.google.com/file/d/1IibHarfvL5zo5iQwbM2FXuHtMkS1U389/view?usp=drive_link" 
                                       target="_blank" 
                                       rel="noopener noreferrer"
                                       className="video-link">
                                        Tutorial 1
                                    </a>
                                    <a href="https://drive.google.com/file/d/1wR5Gb4mG-YsDTxIZ_zIG_45tbg0ObKec/view?usp=drive_link" 
                                       target="_blank" 
                                       rel="noopener noreferrer"
                                       className="video-link">
                                        Tutorial 2
                                    </a>
                                </div>
                                <h3>Order For More Tutorials...</h3>
                            </div>
                        )} 

                        {foodItem.name === "Chicken Tikka" && (
                            <div className="video-links">
                                <h3>Tutorial Videos</h3>
                                <div className="video-grid">
                                    <a href="https://drive.google.com/file/d/1IibHarfvL5zo5iQwbM2FXuHtMkS1U389/view?usp=drive_link" 
                                       target="_blank" 
                                       rel="noopener noreferrer"
                                       className="video-link">
                                        Tutorial 1
                                    </a>
                                    <a href="https://drive.google.com/file/d/1wR5Gb4mG-YsDTxIZ_zIG_45tbg0ObKec/view?usp=drive_link" 
                                       target="_blank" 
                                       rel="noopener noreferrer"
                                       className="video-link">
                                        Tutorial 2
                                    </a>
                                </div>
                                <h3>Order For More Tutorials...</h3>
                            </div>
                        )}

                        {foodItem.name === "Chicken Cheese Pizza" && (
                            <div className="video-links">
                                <h3>Tutorial Videos</h3>
                                <div className="video-grid">
                                    <a href="https://drive.google.com/file/d/1IibHarfvL5zo5iQwbM2FXuHtMkS1U389/view?usp=drive_link" 
                                       target="_blank" 
                                       rel="noopener noreferrer"
                                       className="video-link">
                                        Tutorial 1
                                    </a>
                                    <a href="https://drive.google.com/file/d/1wR5Gb4mG-YsDTxIZ_zIG_45tbg0ObKec/view?usp=drive_link" 
                                       target="_blank" 
                                       rel="noopener noreferrer"
                                       className="video-link">
                                        Tutorial 2
                                    </a>
                                </div>
                                <h3>Order For More Tutorials...</h3>
                            </div>
                        )}

                        {foodItem.name === "Mix Veg Pizza" && (
                            <div className="video-links">
                                <h3>Tutorial Videos</h3>
                                <div className="video-grid">
                                    <a href="https://drive.google.com/file/d/1IibHarfvL5zo5iQwbM2FXuHtMkS1U389/view?usp=drive_link" 
                                       target="_blank" 
                                       rel="noopener noreferrer"
                                       className="video-link">
                                        Tutorial 1
                                    </a>
                                    <a href="https://drive.google.com/file/d/1wR5Gb4mG-YsDTxIZ_zIG_45tbg0ObKec/view?usp=drive_link" 
                                       target="_blank" 
                                       rel="noopener noreferrer"
                                       className="video-link">
                                        Tutorial 2
                                    </a>
                                </div>
                                <h3>Order For More Tutorials...</h3>
                            </div>
                        )}

                        {foodItem.name === "C++" && (
                            <div className="video-links">
                                <h3>Tutorial Videos</h3>
                                <div className="video-grid">
                                    <a href="https://drive.google.com/file/d/1pT6ffOcv5MSDaTRA-n2GY9PnY_YMEw_2/view?usp=sharing" 
                                       target="_blank" 
                                       rel="noopener noreferrer"
                                       className="video-link">
                                        Tutorial 1
                                    </a>
                                    <a href="https://drive.google.com/file/d/1pT6ffOcv5MSDaTRA-n2GY9PnY_YMEw_2/view?usp=sharing" 
                                       target="_blank" 
                                       rel="noopener noreferrer"
                                       className="video-link">
                                        Tutorial 2
                                    </a>
                                </div>
                                <h3>Order For More Tutorials...</h3>
                            </div>
                        )}

{foodItem.name === "Java" && (
                            <div className="video-links">
                                <h3>Tutorial Videos</h3>
                                <div className="video-grid">
                                    <a href="https://drive.google.com/file/d/1pT6ffOcv5MSDaTRA-n2GY9PnY_YMEw_2/view?usp=sharing" 
                                       target="_blank" 
                                       rel="noopener noreferrer"
                                       className="video-link">
                                        Tutorial 1
                                    </a>
                                    <a href="https://drive.google.com/file/d/1pT6ffOcv5MSDaTRA-n2GY9PnY_YMEw_2/view?usp=sharing" 
                                       target="_blank" 
                                       rel="noopener noreferrer"
                                       className="video-link">
                                        Tutorial 2
                                    </a>
                                </div>
                                <h3>Order For More Tutorials...</h3>
                            </div>
                        )}

{foodItem.name === "Python" && (
                            <div className="video-links">
                                <h3>Tutorial Videos</h3>
                                <div className="video-grid">
                                    <a href="https://drive.google.com/file/d/1pT6ffOcv5MSDaTRA-n2GY9PnY_YMEw_2/view?usp=sharing" 
                                       target="_blank" 
                                       rel="noopener noreferrer"
                                       className="video-link">
                                        Tutorial 1
                                    </a>
                                    <a href="https://drive.google.com/file/d/1pT6ffOcv5MSDaTRA-n2GY9PnY_YMEw_2/view?usp=sharing" 
                                       target="_blank" 
                                       rel="noopener noreferrer"
                                       className="video-link">
                                        Tutorial 2
                                    </a>
                                </div>
                                <h3>Order For More Tutorials...</h3>
                            </div>
                        )}

{foodItem.name === "Guitar" && (
                            <div className="video-links">
                                <h3>Tutorial Videos</h3>
                                <div className="video-grid">
                                    <a href="https://drive.google.com/file/d/1pT6ffOcv5MSDaTRA-n2GY9PnY_YMEw_2/view?usp=sharing" 
                                       target="_blank" 
                                       rel="noopener noreferrer"
                                       className="video-link">
                                        Tutorial 1
                                    </a>
                                    <a href="https://drive.google.com/file/d/1pT6ffOcv5MSDaTRA-n2GY9PnY_YMEw_2/view?usp=sharing" 
                                       target="_blank" 
                                       rel="noopener noreferrer"
                                       className="video-link">
                                        Tutorial 2
                                    </a>
                                </div>
                                <h3>Order For More Tutorials...</h3>
                            </div>
                        )}

{foodItem.name === "Flute" && (
                            <div className="video-links">
                                <h3>Tutorial Videos</h3>
                                <div className="video-grid">
                                    <a href="https://drive.google.com/file/d/1pT6ffOcv5MSDaTRA-n2GY9PnY_YMEw_2/view?usp=sharing" 
                                       target="_blank" 
                                       rel="noopener noreferrer"
                                       className="video-link">
                                        Tutorial 1
                                    </a>
                                    <a href="https://drive.google.com/file/d/1pT6ffOcv5MSDaTRA-n2GY9PnY_YMEw_2/view?usp=sharing" 
                                       target="_blank" 
                                       rel="noopener noreferrer"
                                       className="video-link">
                                        Tutorial 2
                                    </a>
                                </div>
                                <h3>Order For More Tutorials...</h3>
                            </div>
                        )}

{foodItem.name === "Piano" && (
                            <div className="video-links">
                                <h3>Tutorial Videos</h3>
                                <div className="video-grid">
                                    <a href="https://drive.google.com/file/d/1pT6ffOcv5MSDaTRA-n2GY9PnY_YMEw_2/view?usp=sharing" 
                                       target="_blank" 
                                       rel="noopener noreferrer"
                                       className="video-link">
                                        Tutorial 1
                                    </a>
                                    <a href="https://drive.google.com/file/d/1pT6ffOcv5MSDaTRA-n2GY9PnY_YMEw_2/view?usp=sharing" 
                                       target="_blank" 
                                       rel="noopener noreferrer"
                                       className="video-link">
                                        Tutorial 2
                                    </a>
                                </div>
                                <h3>Order For More Tutorials...</h3>
                            </div>
                        )}



                        

                        <div className="price-action-container">
                            <div className="price-tag">₹{finalPrice}/-</div>
                            <button 
                                className="add-to-cart-btn"
                                onClick={handleAddToCart}
                            >
                                <FaShoppingCart className="cart-icon" />
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
