/**
 * Navigation Bar Component
 * Provides the main navigation interface for the application
 * Features:
 * - Responsive design with mobile drawer
 * - User authentication status
 * - Shopping cart integration
 * - Dynamic menu items
 */

import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Box,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SchoolIcon from '@mui/icons-material/School';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

/**
 * Navbar Component
 * @returns {JSX.Element} The navigation bar component
 */
function Navbar() {
  // State for mobile drawer
  const [mobileOpen, setMobileOpen] = useState(false);
  // State for user menu
  const [anchorEl, setAnchorEl] = useState(null);
  
  // Theme and responsive design hooks
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Cart and authentication context
  const { cartItems } = useCart();
  const { user, signOut } = useAuth();

  // Navigation menu items configuration
  const menuItems = [
    { text: 'Home', path: '/' },
    { text: 'Skills', path: '/skills' },
    { text: 'My Learning', path: '/learning' },
  ];

  /**
   * Toggle mobile drawer
   */
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  /**
   * Open user menu
   * @param {React.MouseEvent} event - Click event
   */
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  /**
   * Close user menu
   */
  const handleClose = () => {
    setAnchorEl(null);
  };

  /**
   * Handle user sign out
   */
  const handleSignOut = () => {
    signOut();
    handleClose();
  };

  // Mobile drawer content
  const drawer = (
    <Box onClick={handleDrawerToggle}>
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            component={RouterLink}
            to={item.path}
            key={item.text}
          >
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      {user ? (
        <List>
          <ListItem>
            <ListItemText
              primary={user.name}
              secondary={user.email}
            />
          </ListItem>
          <ListItem button onClick={handleSignOut}>
            <ListItemText primary="Sign Out" />
          </ListItem>
        </List>
      ) : (
        <List>
          <ListItem button component={RouterLink} to="/signin">
            <ListItemText primary="Sign In" />
          </ListItem>
          <ListItem button component={RouterLink} to="/signup">
            <ListItemText primary="Sign Up" />
          </ListItem>
        </List>
      )}
    </Box>
  );

  return (
    <>
      {/* Main AppBar */}
      <AppBar position="sticky" elevation={0}>
        <Toolbar>
          {/* Mobile menu button */}
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Brand logo and title */}
          <SchoolIcon sx={{ mr: 1 }} />
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            CraftConnect
          </Typography>

          {/* Desktop navigation menu */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {menuItems.map((item) => (
                <Button
                  key={item.text}
                  color="inherit"
                  component={RouterLink}
                  to={item.path}
                  sx={{ ml: 2 }}
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          )}

          {/* Shopping cart button */}
          <IconButton
            color="inherit"
            component={RouterLink}
            to="/cart"
            sx={{ ml: 2 }}
          >
            <Badge badgeContent={cartItems.length} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          {/* User authentication section */}
          {user ? (
            <Box sx={{ ml: 2 }}>
              <IconButton onClick={handleMenu} color="inherit">
                <Avatar sx={{ width: 32, height: 32 }}>
                  {user.name[0].toUpperCase()}
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem disabled>
                  {user.name}
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleSignOut}>
                  Sign Out
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            !isMobile && (
              <Box sx={{ ml: 2 }}>
                <Button
                  color="inherit"
                  component={RouterLink}
                  to="/signin"
                >
                  Sign In
                </Button>
                <Button
                  color="inherit"
                  component={RouterLink}
                  to="/signup"
                  sx={{ ml: 1 }}
                >
                  Sign Up
                </Button>
              </Box>
            )
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile navigation drawer */}
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}

export default Navbar;
