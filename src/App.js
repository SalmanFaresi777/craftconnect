/**
 * Main application component that sets up routing and global providers
 * This component serves as the root of the application, configuring:
 * - Material-UI theming
 * - Authentication context
 * - Shopping cart context
 * - React Router for navigation
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Skills from './pages/Skills';
import Cart from './pages/Cart';
import MyLearning from './pages/MyLearning';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    // Apply custom Material-UI theme to all components
    <ThemeProvider theme={theme}>
      {/* Reset CSS to provide consistent styling across browsers */}
      <CssBaseline />
      {/* Provide authentication context to the app */}
      <AuthProvider>
        {/* Provide shopping cart functionality */}
        <CartProvider>
          {/* Set up client-side routing */}
          <Router>
            {/* Global navigation component */}
            <Navbar />
            {/* Define application routes */}
            <Routes>
              {/* Home page - Landing page for the application */}
              <Route path="/" element={<Home />} />
              {/* Skills page - Browse available courses/skills */}
              <Route path="/skills" element={<Skills />} />
              {/* Shopping cart page */}
              <Route path="/cart" element={<Cart />} />
              {/* Learning dashboard for enrolled courses */}
              <Route path="/learning" element={<MyLearning />} />
              {/* Authentication routes */}
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </Router>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
