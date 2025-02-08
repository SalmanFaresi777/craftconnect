/**
 * Custom Material-UI theme configuration
 * This file defines the global styling for the application, including:
 * - Color palette
 * - Typography
 * - Component-specific styles
 */

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  // Color scheme configuration
  palette: {
    // Primary color - Deep blue shades
    primary: {
      main: '#1a237e',     // Main brand color
      light: '#534bae',    // Lighter variant for hover states
      dark: '#000051',     // Darker variant for active states
      contrastText: '#ffffff', // Text color on primary background
    },
    // Secondary color - Teal shades
    secondary: {
      main: '#19857b',     // Secondary brand color
      light: '#4fb3aa',    // Lighter variant
      dark: '#00574f',     // Darker variant
      contrastText: '#ffffff', // Text color on secondary background
    },
    // Error color - Red shades for error states
    error: {
      main: '#f44336',     // Main error color
      light: '#e57373',    // Lighter variant
      dark: '#d32f2f',     // Darker variant
    },
  },
  // Typography configuration
  typography: {
    // Font stack with fallbacks
    fontFamily: [
      'Inter',                // Primary font
      '-apple-system',        // iOS/macOS
      'BlinkMacSystemFont',   // macOS
      '"Segoe UI"',          // Windows
      'Roboto',              // Android/Chrome
      '"Helvetica Neue"',    // macOS/iOS
      'Arial',               // Widespread support
      'sans-serif',          // Fallback
    ].join(','),
    // Heading styles
    h4: {
      fontWeight: 700,      // Bold
    },
    h5: {
      fontWeight: 600,      // Semi-bold
    },
    h6: {
      fontWeight: 600,      // Semi-bold
    },
  },
  // Component-specific style overrides
  components: {
    // Button customization
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,           // Rounded corners
          textTransform: 'none',     // Preserve original text case
        },
      },
    },
    // Card customization
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,          // Rounded corners
        },
      },
    },
    // Paper customization
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,          // Rounded corners
        },
      },
    },
  },
});

export default theme;
