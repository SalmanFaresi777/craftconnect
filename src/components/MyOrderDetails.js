import React from 'react';
import './MyOrderDetails.css';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaTimes, FaFacebook, FaWhatsapp, FaInstagram, FaPhone } from 'react-icons/fa';

export default function MyOrderDetails({ foodItem, options, onClose, onAddToCart }) {
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
        <div className="order-details-overlay">
            <div className="order-details-modal dark-theme">
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
                        


                        {foodItem.name === "Chicken Fried Rice" && (
                            <>
                                <div className="contact-info">
                                    <h3>Contact Information</h3>
                                    <div className="social-links">
                                        <a href="tel:+8801712345678" className="contact-link" aria-label="Phone">
                                            <FaPhone className="contact-icon" /> <span>+880 171-234-5678</span>
                                        </a>
                                        <a href="https://facebook.com/craftconnect.friedrice" target="_blank" rel="noopener noreferrer" className="contact-link" aria-label="Facebook">
                                            <FaFacebook className="contact-icon" /> <span>CraftConnect Fried Rice</span>
                                        </a>
                                        <a href="https://wa.me/8801712345678" target="_blank" rel="noopener noreferrer" className="contact-link" aria-label="WhatsApp">
                                            <FaWhatsapp className="contact-icon" /> <span>WhatsApp Chat</span>
                                        </a>
                                        <a href="https://instagram.com/craftconnect.friedrice" target="_blank" rel="noopener noreferrer" className="contact-link" aria-label="Instagram">
                                            <FaInstagram className="contact-icon" /> <span>@craftconnect.friedrice</span>
                                        </a>
                                    </div>
                                </div>
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
                                        <a href="https://drive.google.com/file/d/1kxJDJcrvqsmh5Q9_T_jmJA3CnZln038Y/view?usp=sharing" 
                                           target="_blank" 
                                           rel="noopener noreferrer"
                                           className="video-link">
                                            Tutorial 3
                                        </a>
                                        <a href="https://drive.google.com/file/d/1kxJDJcrvqsmh5Q9_T_jmJA3CnZln038Y/view?usp=sharing" 
                                           target="_blank" 
                                           rel="noopener noreferrer"
                                           className="video-link">
                                            Tutorial 4
                                        </a>
                                        <a href="https://drive.google.com/file/d/1kxJDJcrvqsmh5Q9_T_jmJA3CnZln038Y/view?usp=sharing" 
                                           target="_blank" 
                                           rel="noopener noreferrer"
                                           className="video-link">
                                            Tutorial 5
                                        </a>
                                    </div>
                                </div>
                            </>
                        )}

                        {foodItem.name === "Chicken Biryani" && (
                            <>
                                <div className="contact-info">
                                    <h3>Contact Information</h3>
                                    <div className="social-links">
                                        <a href="tel:+8801787654321" className="contact-link" aria-label="Phone">
                                            <FaPhone className="contact-icon" /> <span>+880 178-765-4321</span>
                                        </a>
                                        <a href="https://facebook.com/craftconnect.biryani" target="_blank" rel="noopener noreferrer" className="contact-link" aria-label="Facebook">
                                            <FaFacebook className="contact-icon" /> <span>CraftConnect Biryani</span>
                                        </a>
                                        <a href="https://wa.me/8801787654321" target="_blank" rel="noopener noreferrer" className="contact-link" aria-label="WhatsApp">
                                            <FaWhatsapp className="contact-icon" /> <span>WhatsApp Chat</span>
                                        </a>
                                        <a href="https://instagram.com/craftconnect.biryani" target="_blank" rel="noopener noreferrer" className="contact-link" aria-label="Instagram">
                                            <FaInstagram className="contact-icon" /> <span>@craftconnect.biryani</span>
                                        </a>
                                    </div>
                                </div>
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
                                        <a href="https://drive.google.com/file/d/1kxJDJcrvqsmh5Q9_T_jmJA3CnZln038Y/view?usp=sharing" 
                                           target="_blank" 
                                           rel="noopener noreferrer"
                                           className="video-link">
                                            Tutorial 3
                                        </a>
                                        <a href="https://drive.google.com/file/d/1kxJDJcrvqsmh5Q9_T_jmJA3CnZln038Y/view?usp=sharing" 
                                           target="_blank" 
                                           rel="noopener noreferrer"
                                           className="video-link">
                                            Tutorial 4
                                        </a>
                                        <a href="https://drive.google.com/file/d/1kxJDJcrvqsmh5Q9_T_jmJA3CnZln038Y/view?usp=sharing" 
                                           target="_blank" 
                                           rel="noopener noreferrer"
                                           className="video-link">
                                            Tutorial 5
                                        </a>
                                    </div>
                                </div>
                            </>
                        )}

                        {foodItem.name === "Chilli Paneer" && (
                            <>
                                <div className="contact-info">
                                    <h3>Contact Information</h3>
                                    <div className="social-links">
                                        <a href="tel:+8801698765432" className="contact-link" aria-label="Phone">
                                            <FaPhone className="contact-icon" /> <span>+880 169-876-5432</span>
                                        </a>
                                        <a href="https://facebook.com/craftconnect.paneer" target="_blank" rel="noopener noreferrer" className="contact-link" aria-label="Facebook">
                                            <FaFacebook className="contact-icon" /> <span>CraftConnect Paneer</span>
                                        </a>
                                        <a href="https://wa.me/8801698765432" target="_blank" rel="noopener noreferrer" className="contact-link" aria-label="WhatsApp">
                                            <FaWhatsapp className="contact-icon" /> <span>WhatsApp Chat</span>
                                        </a>
                                        <a href="https://instagram.com/craftconnect.paneer" target="_blank" rel="noopener noreferrer" className="contact-link" aria-label="Instagram">
                                            <FaInstagram className="contact-icon" /> <span>@craftconnect.paneer</span>
                                        </a>
                                    </div>
                                </div>
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
                                        <a href="https://drive.google.com/file/d/1kxJDJcrvqsmh5Q9_T_jmJA3CnZln038Y/view?usp=sharing" 
                                           target="_blank" 
                                           rel="noopener noreferrer"
                                           className="video-link">
                                            Tutorial 3
                                        </a>
                                        <a href="https://drive.google.com/file/d/1kxJDJcrvqsmh5Q9_T_jmJA3CnZln038Y/view?usp=sharing" 
                                           target="_blank" 
                                           rel="noopener noreferrer"
                                           className="video-link">
                                            Tutorial 4
                                        </a>
                                        <a href="https://drive.google.com/file/d/1kxJDJcrvqsmh5Q9_T_jmJA3CnZln038Y/view?usp=sharing" 
                                           target="_blank" 
                                           rel="noopener noreferrer"
                                           className="video-link">
                                            Tutorial 5
                                        </a>
                                    </div>
                                </div>
                            </>
                        )}

                        {foodItem.name === "Chicken Tikka" && (
                            <>
                                <div className="contact-info">
                                    <h3>Contact Information</h3>
                                    <div className="social-links">
                                        <a href="tel:+8801612345678" className="contact-link" aria-label="Phone">
                                            <FaPhone className="contact-icon" /> <span>+880 161-234-5678</span>
                                        </a>
                                        <a href="https://facebook.com/craftconnect.tikka" target="_blank" rel="noopener noreferrer" className="contact-link" aria-label="Facebook">
                                            <FaFacebook className="contact-icon" /> <span>CraftConnect Tikka</span>
                                        </a>
                                        <a href="https://wa.me/8801612345678" target="_blank" rel="noopener noreferrer" className="contact-link" aria-label="WhatsApp">
                                            <FaWhatsapp className="contact-icon" /> <span>WhatsApp Chat</span>
                                        </a>
                                        <a href="https://instagram.com/craftconnect.tikka" target="_blank" rel="noopener noreferrer" className="contact-link" aria-label="Instagram">
                                            <FaInstagram className="contact-icon" /> <span>@craftconnect.tikka</span>
                                        </a>
                                    </div>
                                </div>
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
                                        <a href="https://drive.google.com/file/d/1kxJDJcrvqsmh5Q9_T_jmJA3CnZln038Y/view?usp=sharing" 
                                           target="_blank" 
                                           rel="noopener noreferrer"
                                           className="video-link">
                                            Tutorial 3
                                        </a>
                                        <a href="https://drive.google.com/file/d/1kxJDJcrvqsmh5Q9_T_jmJA3CnZln038Y/view?usp=sharing" 
                                           target="_blank" 
                                           rel="noopener noreferrer"
                                           className="video-link">
                                            Tutorial 4
                                        </a>
                                        <a href="https://drive.google.com/file/d/1kxJDJcrvqsmh5Q9_T_jmJA3CnZln038Y/view?usp=sharing" 
                                           target="_blank" 
                                           rel="noopener noreferrer"
                                           className="video-link">
                                            Tutorial 5
                                        </a>
                                    </div>
                                </div>
                            </>
                        )}

                        {foodItem.name === "Chicken Cheese Pizza" && (
                            <>
                                <div className="contact-info">
                                    <h3>Contact Information</h3>
                                    <div className="social-links">
                                        <a href="tel:+8801512345678" className="contact-link" aria-label="Phone">
                                            <FaPhone className="contact-icon" /> <span>+880 151-234-5678</span>
                                        </a>
                                        <a href="https://facebook.com/craftconnect.pizza" target="_blank" rel="noopener noreferrer" className="contact-link" aria-label="Facebook">
                                            <FaFacebook className="contact-icon" /> <span>CraftConnect Pizza</span>
                                        </a>
                                        <a href="https://wa.me/8801512345678" target="_blank" rel="noopener noreferrer" className="contact-link" aria-label="WhatsApp">
                                            <FaWhatsapp className="contact-icon" /> <span>WhatsApp Chat</span>
                                        </a>
                                        <a href="https://instagram.com/craftconnect.pizza" target="_blank" rel="noopener noreferrer" className="contact-link" aria-label="Instagram">
                                            <FaInstagram className="contact-icon" /> <span>@craftconnect.pizza</span>
                                        </a>
                                    </div>
                                </div>
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
                                        <a href="https://drive.google.com/file/d/1kxJDJcrvqsmh5Q9_T_jmJA3CnZln038Y/view?usp=sharing" 
                                           target="_blank" 
                                           rel="noopener noreferrer"
                                           className="video-link">
                                            Tutorial 3
                                        </a>
                                        <a href="https://drive.google.com/file/d/1kxJDJcrvqsmh5Q9_T_jmJA3CnZln038Y/view?usp=sharing" 
                                           target="_blank" 
                                           rel="noopener noreferrer"
                                           className="video-link">
                                            Tutorial 4
                                        </a>
                                        <a href="https://drive.google.com/file/d/1kxJDJcrvqsmh5Q9_T_jmJA3CnZln038Y/view?usp=sharing" 
                                           target="_blank" 
                                           rel="noopener noreferrer"
                                           className="video-link">
                                            Tutorial 5
                                        </a>
                                    </div>
                                </div>
                            </>
                        )}

                        {foodItem.name === "Mix Veg Pizza" && (
                            <>
                                <div className="contact-info">
                                    <h3>Contact Information</h3>
                                    <div className="social-links">
                                        <a href="tel:+8801412345678" className="contact-link" aria-label="Phone">
                                            <FaPhone className="contact-icon" /> <span>+880 141-234-5678</span>
                                        </a>
                                        <a href="https://facebook.com/craftconnect.vegpizza" target="_blank" rel="noopener noreferrer" className="contact-link" aria-label="Facebook">
                                            <FaFacebook className="contact-icon" /> <span>CraftConnect Veg Pizza</span>
                                        </a>
                                        <a href="https://wa.me/8801412345678" target="_blank" rel="noopener noreferrer" className="contact-link" aria-label="WhatsApp">
                                            <FaWhatsapp className="contact-icon" /> <span>WhatsApp Chat</span>
                                        </a>
                                        <a href="https://instagram.com/craftconnect.vegpizza" target="_blank" rel="noopener noreferrer" className="contact-link" aria-label="Instagram">
                                            <FaInstagram className="contact-icon" /> <span>@craftconnect.vegpizza</span>
                                        </a>
                                    </div>
                                </div>
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
                                        <a href="https://drive.google.com/file/d/1kxJDJcrvqsmh5Q9_T_jmJA3CnZln038Y/view?usp=sharing" 
                                           target="_blank" 
                                           rel="noopener noreferrer"
                                           className="video-link">
                                            Tutorial 3
                                        </a>
                                        <a href="https://drive.google.com/file/d/1kxJDJcrvqsmh5Q9_T_jmJA3CnZln038Y/view?usp=sharing" 
                                           target="_blank" 
                                           rel="noopener noreferrer"
                                           className="video-link">
                                            Tutorial 4
                                        </a>
                                        <a href="https://drive.google.com/file/d/1kxJDJcrvqsmh5Q9_T_jmJA3CnZln038Y/view?usp=sharing" 
                                           target="_blank" 
                                           rel="noopener noreferrer"
                                           className="video-link">
                                            Tutorial 5
                                        </a>
                                    </div>
                                </div>
                            </>
                        )}

                        {foodItem.name === "C++" && (
                            <>
                                <div className="contact-info">
                                    <h3>Contact Information</h3>
                                    <div className="social-links">
                                        <a href="tel:+8801812345678" className="contact-link" aria-label="Phone">
                                            <FaPhone className="contact-icon" /> <span>+880 181-234-5678</span>
                                        </a>
                                        <a href="https://facebook.com/craftconnect.cpp" target="_blank" rel="noopener noreferrer" className="contact-link" aria-label="Facebook">
                                            <FaFacebook className="contact-icon" /> <span>CraftConnect C++</span>
                                        </a>
                                        <a href="https://wa.me/8801812345678" target="_blank" rel="noopener noreferrer" className="contact-link" aria-label="WhatsApp">
                                            <FaWhatsapp className="contact-icon" /> <span>WhatsApp Chat</span>
                                        </a>
                                        <a href="https://instagram.com/craftconnect.cpp" target="_blank" rel="noopener noreferrer" className="contact-link" aria-label="Instagram">
                                            <FaInstagram className="contact-icon" /> <span>@craftconnect.cpp</span>
                                        </a>
                                    </div>
                                </div>
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
                                        <a href="https://drive.google.com/file/d/1pT6ffOcv5MSDaTRA-n2GY9PnY_YMEw_2/view?usp=sharing" 
                                           target="_blank" 
                                           rel="noopener noreferrer"
                                           className="video-link">
                                            Tutorial 3
                                        </a>
                                        <a href="https://drive.google.com/file/d/1pT6ffOcv5MSDaTRA-n2GY9PnY_YMEw_2/view?usp=sharing" 
                                           target="_blank" 
                                           rel="noopener noreferrer"
                                           className="video-link">
                                            Tutorial 4
                                        </a>
                                        <a href="https://drive.google.com/file/d/1pT6ffOcv5MSDaTRA-n2GY9PnY_YMEw_2/view?usp=sharing" 
                                           target="_blank" 
                                           rel="noopener noreferrer"
                                           className="video-link">
                                            Tutorial 5
                                        </a>
                                    </div>
                                </div>
                            </>
                        )}

                        <div>
                            <h3>Thanks For Purchasing</h3>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}
