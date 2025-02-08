// Import necessary hooks from React for context and state management
import { createContext, useContext, useState } from 'react';

// Create a new context for cart functionality
const CartContext = createContext();

/**
 * CartProvider component that wraps the application to provide cart functionality
 * This component manages the cart state and provides methods to manipulate it
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to be wrapped
 */
export function CartProvider({ children }) {
  // State to store cart items with their details and progress
  const [cartItems, setCartItems] = useState([]);

  /**
   * Add a course to the cart if it's not already present
   * @param {Object} course - Course object to be added
   * @returns {boolean} - True if course was added, false if it was already in cart
   */
  const addToCart = (course) => {
    if (!cartItems.some(item => item.id === course.id)) {
      setCartItems(prev => [...prev, { ...course, progress: 0 }]);
      return true;
    }
    return false;
  };

  /**
   * Remove a course from the cart by its ID
   * @param {string|number} courseId - ID of the course to remove
   */
  const removeFromCart = (courseId) => {
    setCartItems(prev => prev.filter(item => item.id !== courseId));
  };

  /**
   * Clear all items from the cart
   * Typically used after checkout or when resetting the cart
   */
  const clearCart = () => {
    setCartItems([]);
  };

  /**
   * Check if a course is already in the cart
   * @param {string|number} courseId - ID of the course to check
   * @returns {boolean} - True if course is in cart, false otherwise
   */
  const isInCart = (courseId) => {
    return cartItems.some(item => item.id === courseId);
  };

  // Provide cart state and methods to children components
  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      clearCart,
      isInCart,
    }}>
      {children}
    </CartContext.Provider>
  );
}

/**
 * Custom hook to use cart functionality in components
 * @throws {Error} If used outside of CartProvider
 * @returns {Object} Cart context containing cart state and methods
 */
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
