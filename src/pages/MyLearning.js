/**
 * My Learning Page Component
 * Displays user's enrolled courses and their progress
 * Features:
 * - Course progress tracking
 * - Next lesson information
 * - Course completion statistics
 * - Resume learning functionality
 * - Last accessed timestamps
 */

import { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  LinearProgress,
  Button,
  Chip,
  Divider,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

/**
 * MyLearning component - User's learning dashboard
 * @returns {JSX.Element} The learning dashboard component
 */
function MyLearning() {
  // Mock enrolled courses data
  // TODO: Replace with API call to fetch user's enrolled courses
  const [enrolledCourses] = useState([
    {
      id: 1,
      title: 'Web Development Fundamentals',
      instructor: 'John Smith',
      progress: 65,
      thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80',
      nextLesson: 'JavaScript DOM Manipulation',
      totalLessons: 24,
      completedLessons: 16,
      lastAccessed: '2024-01-25',
      description: 'Learn HTML, CSS, and JavaScript from scratch. Build responsive websites and modern web applications.',
    },
    {
      id: 2,
      title: 'Digital Art Masterclass',
      instructor: 'Emily Chen',
      progress: 30,
      thumbnail: 'https://images.unsplash.com/photo-1619409437363-1b1d6e539836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      nextLesson: 'Color Theory Basics',
      totalLessons: 18,
      completedLessons: 5,
      lastAccessed: '2024-01-24',
      description: 'Master digital art techniques using industry-standard tools. Create stunning illustrations and designs.',
    }
  ]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Page header */}
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        My Learning
      </Typography>

      {/* Course grid */}
      <Grid container spacing={4}>
        {enrolledCourses.map((course) => (
          <Grid item key={course.id} xs={12}>
            <Card sx={{ display: 'flex', height: '100%' }}>
              {/* Course thumbnail */}
              <CardMedia
                component="img"
                sx={{ width: 300 }}
                image={course.thumbnail}
                alt={course.title}
              />

              {/* Course details */}
              <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <CardContent sx={{ flex: '1 0 auto', p: 3 }}>
                  {/* Course title and instructor */}
                  <Typography variant="h5" component="h2" gutterBottom>
                    {course.title}
                  </Typography>
                  <Typography 
                    variant="subtitle1" 
                    color="text.secondary" 
                    gutterBottom
                  >
                    Instructor: {course.instructor}
                  </Typography>

                  {/* Course description */}
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {course.description}
                  </Typography>

                  {/* Progress section */}
                  <Box sx={{ mt: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Typography variant="body2" sx={{ mr: 1 }}>
                        Progress: {course.progress}%
                      </Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={course.progress} 
                        sx={{ 
                          flexGrow: 1,
                          height: 8,
                          borderRadius: 4,
                        }}
                      />
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
                      <Chip
                        icon={<CheckCircleIcon />}
                        label={`${course.completedLessons}/${course.totalLessons} Lessons`}
                        color="primary"
                        variant="outlined"
                      />
                      <Chip
                        label={`Last accessed: ${course.lastAccessed}`}
                        variant="outlined"
                      />
                    </Box>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Button
                      variant="contained"
                      startIcon={<PlayArrowIcon />}
                      sx={{ flexGrow: 0 }}
                    >
                      Continue Learning
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<AssignmentIcon />}
                      sx={{ flexGrow: 0 }}
                    >
                      View Materials
                    </Button>
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 'auto' }}>
                      Next: {course.nextLesson}
                    </Typography>
                  </Box>
                </CardContent>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default MyLearning;
