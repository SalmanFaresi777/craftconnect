/**
 * Home Page Component
 * Landing page of the application featuring:
 * - Hero section with animated background
 * - Featured categories
 * - Popular courses
 * - Testimonials
 * - Call-to-action sections
 */

import { Box, Typography, Container, Grid, Paper, Card, CardContent, CardMedia, Button, Avatar, Fade } from '@mui/material';
import { styled } from '@mui/material/styles';
// Import category icons
import CodeIcon from '@mui/icons-material/Code';
import BrushIcon from '@mui/icons-material/Brush';
import CreateIcon from '@mui/icons-material/Create';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import RestaurantIcon from '@mui/icons-material/Restaurant';
// Import social media icons
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useNavigate } from 'react-router-dom';
import AnimatedBackground from '../components/AnimatedBackground';

/**
 * Styled hero section with parallax background
 * Features a semi-transparent overlay for better text readability
 */
const HeroSection = styled(Paper)(({ theme }) => ({
  position: 'relative',
  backgroundColor: '#1a237e',
  color: theme.palette.common.white,
  marginBottom: theme.spacing(4),
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundImage: 'url(https://source.unsplash.com/random/1600x900/?education,learning)',
  padding: theme.spacing(25, 0),
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
  },
}));

/**
 * Styled card component with hover effects
 * Used for category and course cards
 */
const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 40px rgba(0,0,0,0.2)',
  },
  borderRadius: '15px',
  overflow: 'hidden',
}));

/**
 * Styled container for category icons
 * Provides consistent sizing and spacing
 */
const CategoryIcon = styled(Box)(({ theme }) => ({
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
}));

/**
 * Home component - Landing page of the application
 * @returns {JSX.Element} The home page component
 */
function Home() {
  const navigate = useNavigate();

  // Featured categories data
  const categories = [
    {
      title: 'Web Development',
      icon: '💻',
      count: '24 courses',
      image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
      color: '#e3f2fd'
    },
    {
      title: 'Digital Art',
      icon: '🎨',
      count: '18 courses',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
      color: '#f3e5f5'
    },
    {
      title: 'Music',
      icon: '🎵',
      count: '16 courses',
      image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      color: '#e8f5e9'
    },
    {
      title: 'Photography',
      icon: '📸',
      count: '12 courses',
      image: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      color: '#fff3e0'
    },
    {
      title: 'Cooking',
      icon: '👨‍🍳',
      count: '15 courses',
      image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      color: '#fce4ec'
    },
    {
      title: 'Data Science',
      icon: '📊',
      count: '20 courses',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      color: '#e0f7fa'
    },
  ];

  const developers = [
    {
      name: 'Salman Faresi',
      role: 'Developer',
      image: 'https://source.unsplash.com/random/200x200/?portrait-man',
      description: 'Student at AUST CSE undergraduate program',
      github: 'https://github.com/salmanfaresi',
      linkedin: 'https://linkedin.com/in/salmanfaresi',
    },
    {
      name: 'Maisha Momtaz Meem',
      role: 'Developer',
      image: 'https://source.unsplash.com/random/200x200/?portrait-woman',
      description: 'Student at AUST CSE undergraduate program',
      github: 'https://github.com/maishamomtaz',
      linkedin: 'https://linkedin.com/in/maishameem',
    },
    {
      name: 'Jarin Tasnim',
      role: 'Developer',
      image: 'https://source.unsplash.com/random/200x200/?portrait-woman-2',
      description: 'Student at AUST CSE undergraduate program',
      github: 'https://github.com/jarintasnim',
      linkedin: 'https://linkedin.com/in/jarintasnim',
    },
  ];

  const handleExplore = () => {
    navigate('/skills');
  };

  return (
    <Box>
      <Box 
        sx={{ 
          position: 'relative',
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          bgcolor: 'background.paper',
        }}
      >
        <AnimatedBackground />
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Fade in timeout={1000}>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography
                  variant="h2"
                  component="h1"
                  sx={{
                    fontWeight: 800,
                    mb: 2,
                    background: 'linear-gradient(45deg, #1a237e 30%, #534bae 90%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 2px 10px rgba(0,0,0,0.1)',
                  }}
                >
                  Master New Skills
                </Typography>
                <Typography
                  variant="h5"
                  color="text.secondary"
                  sx={{ mb: 4, maxWidth: '80%' }}
                >
                  Join us at CraftConnect, a unique platform designed to empower communities through skill-sharing and collaboration.
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleExplore}
                    sx={{
                      backgroundColor: '#fff',
                      color: '#1a237e',
                      '&:hover': {
                        backgroundColor: '#e0e0e0',
                      },
                    }}
                  >
                    Explore Courses
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    sx={{
                      borderColor: '#fff',
                      color: '#fff',
                      '&:hover': {
                        borderColor: '#e0e0e0',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                      },
                    }}
                  >
                    Learn More
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
                  alt="Learning"
                  sx={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: 4,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                    transform: 'perspective(1000px) rotateY(-5deg)',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'perspective(1000px) rotateY(0deg)',
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Fade>
        </Container>
      </Box>

      {/* Categories Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          align="center"
          sx={{
            mb: 6,
            fontWeight: 700,
            background: 'linear-gradient(45deg, #1a237e 30%, #534bae 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Popular Categories
        </Typography>
        <Grid container spacing={4}>
          {categories.map((category) => (
            <Grid item key={category.title} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                    '& .category-image': {
                      transform: 'scale(1.1)',
                    },
                  },
                }}
                onClick={() => navigate('/skills')}
              >
                <Box
                  className="category-image"
                  sx={{
                    height: 200,
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: 'rgba(0, 0, 0, 0.3)',
                      zIndex: 1,
                    },
                    '& img': {
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease',
                    },
                  }}
                >
                  <img src={category.image} alt={category.title} />
                </Box>
                <CardContent
                  sx={{
                    flexGrow: 1,
                    bgcolor: category.color,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.9)',
                    },
                  }}
                >
                  <Typography
                    variant="h5"
                    component="h3"
                    sx={{
                      mb: 1,
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <span role="img" aria-label={category.title}>
                      {category.icon}
                    </span>
                    {category.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {category.count}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* About Section */}
      <Box
        sx={{
          bgcolor: '#f5f5f5',
          py: 8,
          mt: 4,
          borderRadius: '40px 40px 0 0',
        }}
      >
        <Fade in={true} timeout={2000}>
          <Container maxWidth="lg">
            <Typography
              variant="h3"
              align="center"
              sx={{
                mb: 6,
                fontWeight: 700,
                background: 'linear-gradient(45deg, #1a237e 30%, #3f51b5 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Meet Our Team
            </Typography>
            <Grid container spacing={4}>
              {developers.map((dev) => (
                <Grid item key={dev.name} xs={12} sm={6} md={4}>
                  <StyledCard
                    sx={{
                      alignItems: 'center',
                      p: 3,
                      background: 'linear-gradient(to bottom, #ffffff 0%, #f8f9fa 100%)',
                    }}
                  >
                    <Avatar
                      src={dev.image}
                      sx={{
                        width: 150,
                        height: 150,
                        mb: 3,
                        border: '4px solid #1a237e',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                      }}
                    />
                    <Typography
                      variant="h5"
                      gutterBottom
                      align="center"
                      sx={{ fontWeight: 600 }}
                    >
                      {dev.name}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="primary"
                      gutterBottom
                      align="center"
                      sx={{ fontWeight: 500 }}
                    >
                      {dev.role}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      align="center"
                      sx={{ mb: 3, lineHeight: 1.6 }}
                    >
                      {dev.description}
                    </Typography>
                    <Box
                      sx={{
                        mt: 'auto',
                        display: 'flex',
                        gap: 2,
                        justifyContent: 'center',
                      }}
                    >
                      <Button
                        href={dev.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        startIcon={<GitHubIcon />}
                        variant="outlined"
                        size="small"
                        sx={{
                          borderRadius: '20px',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                          },
                        }}
                      >
                        GitHub
                      </Button>
                      <Button
                        href={dev.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        startIcon={<LinkedInIcon />}
                        variant="outlined"
                        size="small"
                        sx={{
                          borderRadius: '20px',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                          },
                        }}
                      >
                        LinkedIn
                      </Button>
                    </Box>
                  </StyledCard>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Fade>
      </Box>
    </Box>
  );
}

export default Home;
