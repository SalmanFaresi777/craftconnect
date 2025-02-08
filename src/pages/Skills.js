/**
 * Skills Page Component
 * Displays a catalog of available courses/skills that users can browse and add to cart
 * Features:
 * - Course cards with detailed information
 * - Add/Remove from cart functionality
 * - Snackbar notifications
 * - Responsive grid layout
 */

import { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Rating,
  Box,
  Chip,
  Stack,
  Snackbar,
  Alert,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { useCart } from '../context/CartContext';

/**
 * Skills component - Course catalog page
 * @returns {JSX.Element} The skills page component
 */
function Skills() {
  // Cart context for managing course selection
  const { addToCart, removeFromCart, isInCart } = useCart();
  
  // Snackbar state for user notifications
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Mock course data
  // TODO: Replace with API call to fetch courses
  const [skills] = useState([
    {
      id: 1,
      name: 'Web Development Fundamentals',
      instructor: 'John Smith',
      description: 'Learn HTML, CSS, and JavaScript from scratch. Build responsive websites and modern web applications.',
      price: 49.99,
      duration: '8 weeks',
      rating: 4.5,
      students: 1234,
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80',
      tags: ['Beginner', 'Web Development', 'Coding'],
    },
    {
      id: 2,
      name: 'Digital Art Masterclass',
      instructor: 'Emily Chen',
      description: 'Master digital art techniques using industry-standard tools. Create stunning illustrations and designs.',
      price: 39.99,
      duration: '6 weeks',
      rating: 4.8,
      students: 856,
      image: 'https://images.unsplash.com/photo-1619409437363-1b1d6e539836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      tags: ['Intermediate', 'Digital Art', 'Design'],
    },
    {
      id: 3,
      name: 'Creative Writing Workshop',
      instructor: 'Michael Brown',
      description: 'Develop your storytelling skills. Learn plot development, character creation, and narrative techniques.',
      price: 29.99,
      duration: '4 weeks',
      rating: 4.6,
      students: 567,
      image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80',
      tags: ['All Levels', 'Writing', 'Creative'],
    },
    {
      id: 4,
      name: 'Urban Gardening Essentials',
      instructor: 'Sarah Green',
      description: 'Learn how to create and maintain a thriving garden in limited space. Perfect for city dwellers.',
      price: 34.99,
      duration: '5 weeks',
      rating: 4.7,
      students: 789,
      image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      tags: ['Beginner', 'Gardening', 'Sustainable'],
    },
    {
      id: 5,
      name: 'Piano for Beginners',
      instructor: 'Robert Lee',
      description: 'Start your musical journey with piano fundamentals. Learn notes, chords, and basic music theory.',
      price: 44.99,
      duration: '10 weeks',
      rating: 4.9,
      students: 432,
      image: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      tags: ['Beginner', 'Music', 'Piano'],
    },
    {
      id: 6,
      name: 'Photography Masterclass',
      instructor: 'Jessica White',
      description: 'Master the art of photography. Learn composition, lighting, and post-processing techniques.',
      price: 54.99,
      duration: '8 weeks',
      rating: 4.7,
      students: 923,
      image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      tags: ['All Levels', 'Photography', 'Creative'],
    },
    {
      id: 7,
      name: 'Yoga and Meditation',
      instructor: 'Maya Patel',
      description: 'Learn yoga poses, breathing techniques, and meditation practices for physical and mental well-being.',
      price: 29.99,
      duration: '6 weeks',
      rating: 4.8,
      students: 1567,
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2020&q=80',
      tags: ['All Levels', 'Fitness', 'Wellness'],
    },
    {
      id: 8,
      name: 'Italian Cuisine Mastery',
      instructor: 'Marco Rossi',
      description: 'Learn authentic Italian cooking techniques and recipes from a professional chef.',
      price: 49.99,
      duration: '6 weeks',
      rating: 4.9,
      students: 678,
      image: 'https://images.unsplash.com/photo-1498579397066-22750a3cb424?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      tags: ['Intermediate', 'Cooking', 'Italian'],
    },
    {
      id: 9,
      name: 'Mobile App Development',
      instructor: 'Alex Turner',
      description: 'Build iOS and Android apps using React Native. Learn mobile app design patterns and best practices.',
      price: 59.99,
      duration: '10 weeks',
      rating: 4.6,
      students: 892,
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
      tags: ['Intermediate', 'Mobile', 'React Native'],
    },
    {
      id: 10,
      name: 'Oil Painting Techniques',
      instructor: 'Maria Garcia',
      description: 'Master oil painting from basics to advanced techniques. Learn color mixing and composition.',
      price: 44.99,
      duration: '8 weeks',
      rating: 4.7,
      students: 445,
      image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2045&q=80',
      tags: ['All Levels', 'Painting', 'Art'],
    },
    {
      id: 11,
      name: 'Guitar Fundamentals',
      instructor: 'James Wilson',
      description: 'Start your guitar journey. Learn chords, strumming patterns, and popular songs.',
      price: 39.99,
      duration: '8 weeks',
      rating: 4.8,
      students: 734,
      image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      tags: ['Beginner', 'Music', 'Guitar'],
    },
    {
      id: 12,
      name: 'Data Science Essentials',
      instructor: 'David Wang',
      description: 'Learn Python, data analysis, and machine learning fundamentals for data science.',
      price: 64.99,
      duration: '12 weeks',
      rating: 4.7,
      students: 1123,
      image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
      tags: ['Intermediate', 'Data Science', 'Python'],
    },
  ]);

  /**
   * Handle adding a course to cart
   * @param {Object} skill - Course to add
   */
  const handleAddToCart = (skill) => {
    const added = addToCart(skill);
    setSnackbar({
      open: true,
      message: added ? 'Course added to cart' : 'Course is already in cart',
      severity: added ? 'success' : 'info'
    });
  };

  /**
   * Handle removing a course from cart
   * @param {Object} skill - Course to remove
   */
  const handleRemoveFromCart = (skillId) => {
    removeFromCart(skillId);
    setSnackbar({
      open: true,
      message: 'Course removed from cart',
      severity: 'success'
    });
  };

  /**
   * Close snackbar notification
   */
  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Container sx={{ py: 8 }} maxWidth="lg">
      {/* Page header */}
      <Typography 
        variant="h4" 
        gutterBottom 
        align="center" 
        sx={{ 
          mb: 4,
          fontWeight: 700,
          background: 'linear-gradient(45deg, #1a237e 30%, #534bae 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Available Skills
      </Typography>
      {/* Course grid */}
      <Grid container spacing={4}>
        {skills.map((skill) => (
          <Grid item key={skill.id} xs={12} sm={6} md={4}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: '0.3s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 6,
                },
              }}
            >
              {/* Course image */}
              <CardMedia
                component="img"
                height="200"
                image={skill.image}
                alt={skill.name}
                sx={{
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              />
              {/* Course content */}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2" sx={{ fontWeight: 600 }}>
                  {skill.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <PersonIcon sx={{ fontSize: 20, mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {skill.instructor}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {skill.description}
                </Typography>
                <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                  {skill.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      sx={{ 
                        backgroundColor: 'rgba(25, 118, 210, 0.1)',
                        color: 'primary.main',
                      }}
                    />
                  ))}
                </Stack>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Rating
                    value={skill.rating}
                    precision={0.1}
                    readOnly
                    size="small"
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    ({skill.students} students)
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AccessTimeIcon sx={{ fontSize: 20, mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {skill.duration}
                  </Typography>
                </Box>
              </CardContent>
              {/* Action buttons */}
              <CardActions>
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 1 }}>
                  <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
                    ${skill.price}
                  </Typography>
                  {isInCart(skill.id) ? (
                    <Button 
                      size="small" 
                      color="error"
                      variant="contained"
                      startIcon={<RemoveShoppingCartIcon />}
                      onClick={() => handleRemoveFromCart(skill.id)}
                      sx={{
                        textTransform: 'none',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: 2,
                        },
                        transition: 'all 0.2s',
                      }}
                    >
                      Remove
                    </Button>
                  ) : (
                    <Button 
                      size="small" 
                      color="primary"
                      variant="contained"
                      startIcon={<ShoppingCartIcon />}
                      onClick={() => handleAddToCart(skill)}
                      sx={{
                        textTransform: 'none',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: 2,
                        },
                        transition: 'all 0.2s',
                      }}
                    >
                      Add to Cart
                    </Button>
                  )}
                </Box>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Notification snackbar */}
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
  );
}

export default Skills;
