/**
 * Shopping Cart Page Component
 * Manages the user's shopping cart functionality with:
 * - Course list with details (title, instructor, price)
 * - Remove items functionality
 * - Total price calculation
 * - Checkout process
 * - Animations for item removal and addition
 * - Responsive design for all screen sizes
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
  Divider,
  Box,
  Avatar,
  Paper,
  Fade,
  Slide,
  Alert,
  Snackbar,
  Rating,
  Tooltip,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StarIcon from '@mui/icons-material/Star';
import SchoolIcon from '@mui/icons-material/School';
import { styled } from '@mui/material/styles';
import { useCart } from '../context/CartContext';

/**
 * Styled component for cart items
 * Adds hover effects and smooth transitions
 */
const StyledPaper = styled(Paper)(({ theme }) => ({
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
  },
}));

/**
 * Styled component for list items
 * Adds hover effect and consistent padding
 */
const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(2),
  transition: 'background-color 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

/**
 * Cart component - Shopping cart page
 * @returns {JSX.Element} The shopping cart component
 */
function Cart() {
  const navigate = useNavigate(); // Hook for navigation between routes
  const theme = useTheme(); // Access the current Material-UI theme
  const { cartItems, removeFromCart, clearCart } = useCart(); // Retrieve cart-related functions and data from context
  
  // State for UI feedback
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  
  // State for delete confirmation dialog
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    itemId: null,
  });

  /**
   * Calculate total price of items in cart
   * @returns {number} Total price
   */
  const platformFee = 4.99; // Flat fee for the platform
  const total = cartItems.reduce((sum, item) => sum + item.price, 0) + (cartItems.length > 0 ? platformFee : 0); // Calculate total cost

  /**
   * Handle item removal from cart
   * @param {Object} item - Cart item to remove
   */
  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
    setSnackbar({
      open: true,
      message: 'Course removed from cart',
      severity: 'success',
    });
    setDeleteDialog({ open: false, itemId: null });
  };

  /**
   * Handle checkout process
   */
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      setSnackbar({
        open: true,
        message: 'Your cart is empty',
        severity: 'error',
      });
      return;
    }
    clearCart(); // Clear all items from cart
    navigate('/learning'); // Navigate to learning page
    setSnackbar({
      open: true,
      message: 'Successfully enrolled in courses!',
      severity: 'success',
    });
  };

  /**
   * Close snackbar notification
   */
  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  /**
   * Open the delete confirmation dialog
   * @param {number} itemId - ID of the item to remove
   */
  const handleOpenDeleteDialog = (itemId) => {
    setDeleteDialog({ open: true, itemId });
  };

  /**
   * Close the delete confirmation dialog
   */
  const handleCloseDeleteDialog = () => {
    setDeleteDialog({ open: false, itemId: null });
  };

  return (
    <Fade in timeout={800}>
      <Container maxWidth="md" sx={{ py: 8 }}>
        {/* Header with cart icon and title */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4 }}>
          <Badge badgeContent={cartItems.length} color="primary" sx={{ mr: 2 }}>
            <ShoppingCartIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
          </Badge>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 700,
              background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Your Learning Cart
          </Typography>
        </Box>
        
        <StyledPaper elevation={3} sx={{ p: 3, mb: 4 }}>
          {/* If cart is empty, display a message with a CTA button */}
          {cartItems.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 6 }}>
              <SchoolIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Your cart is empty
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Explore our courses and start your learning journey today!
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => navigate('/skills')}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1.1rem',
                }}
              >
                Browse Courses
              </Button>
            </Box>
          ) : (
            // List all items in the cart
            <List>
              {cartItems.map((item, index) => (
                <Slide direction="right" in timeout={500 + index * 100} key={item.id}>
                  <Box>
                    <StyledListItem>
                      {/* Course image */}
                      <Avatar
                        src={item.image}
                        variant="rounded"
                        sx={{ 
                          width: 160, 
                          height: 120, 
                          mr: 2,
                          transition: 'transform 0.3s ease',
                          '&:hover': {
                            transform: 'scale(1.05)',
                          },
                        }}
                      />
                      {/* Course details */}
                      <ListItemText
                        primary={
                          <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                            {item.name}
                          </Typography>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                              {item.description}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                              <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
                                Instructor: {item.instructor}
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Rating
                                  value={item.rating}
                                  precision={0.1}
                                  readOnly
                                  size="small"
                                  emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                />
                                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                                  ({item.reviews} reviews)
                                </Typography>
                              </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <AccessTimeIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                              <Typography variant="body2" color="text.secondary">
                                {item.duration}
                              </Typography>
                            </Box>
                          </Box>
                        }
                      />
                      {/* Actions for the item */}
                      <ListItemSecondaryAction>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                          <Typography variant="h6" color="primary" sx={{ mb: 2, fontWeight: 600 }}>
                            ${item.price}
                          </Typography>
                          <Tooltip title="Remove from cart">
                            <IconButton 
                              edge="end" 
                              aria-label="delete" 
                              onClick={() => handleOpenDeleteDialog(item.id)}
                              sx={{
                                color: theme.palette.error.main,
                                transition: 'all 0.2s',
                                '&:hover': {
                                  transform: 'scale(1.1)',
                                  backgroundColor: theme.palette.error.light,
                                }
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </ListItemSecondaryAction>
                    </StyledListItem>
                    {index < cartItems.length - 1 && <Divider sx={{ my: 2 }} />}
                  </Box>
                </Slide>
              ))}
            </List>
          )}

          {/* Order summary section */}
          {cartItems.length > 0 && (
            <Box sx={{ 
              mt: 4, 
              p: 3, 
              bgcolor: 'rgba(0, 0, 0, 0.02)', 
              borderRadius: 2,
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.04)',
              }
            }}>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                Order Summary
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body1">Subtotal</Typography>
                <Typography variant="body1">${cartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  Platform fee
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ${platformFee.toFixed(2)}
                </Typography>
              </Box>
              <Divider sx={{ mb: 3 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
                  ${total.toFixed(2)}
                </Typography>
              </Box>
              <Button 
                variant="contained" 
                color="primary" 
                fullWidth 
                size="large"
                onClick={handleCheckout}
                sx={{ 
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: 2,
                  textTransform: 'none',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                  },
                }}
              >
                Enroll Now
              </Button>
            </Box>
          )}
        </StyledPaper>

        {/* Confirmation dialog for removing items */}
        <Dialog
          open={deleteDialog.open}
          onClose={handleCloseDeleteDialog}
          PaperProps={{
            sx: {
              borderRadius: 2,
              padding: 2,
            }
          }}
        >
          <DialogTitle sx={{ fontWeight: 600 }}>
            Remove Course
          </DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to remove this course from your cart?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={handleCloseDeleteDialog}
              sx={{ 
                color: 'text.secondary',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
              }}
            >
              Cancel
            </Button>
            <Button 
              onClick={() => handleRemoveItem(deleteDialog.itemId)}
              color="error"
              variant="contained"
              sx={{
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: theme.palette.error.dark,
                },
              }}
            >
              Remove
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar for success/error messages */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert 
            onClose={handleCloseSnackbar} 
            severity={snackbar.severity}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Fade>
  );
}

export default Cart;
