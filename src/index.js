import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createTheme, ThemeProvider } from '@mui/material';


const theme = createTheme({
  typography: {
    fontFamily: 'Ubuntu, Open Sans, Arial, sans-serif', // Primary: Ubuntu, Secondary: Open Sans
    h1: {
      fontFamily: 'Ubuntu',  // Primary font for H1
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontFamily: 'Ubuntu',  // Primary font for H2
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontFamily: 'Ubuntu',  // Primary font for H3
      fontSize: '1.75rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h4: {
      fontFamily: 'Ubuntu',  // Primary font for H3
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.2,
    },
    body1: {
      fontFamily: 'Open Sans',  // Secondary font for body text
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontFamily: 'Open Sans',  // Secondary font for smaller body text
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.43,
    },
  },
  palette: {
    primary: {
      main: '#D7C7F4', // Primary color (can be adjusted as per your need)
      contrastText: '#9785BA',
    },
    secondary: {
      main: '#FAF7FF', // Secondary solid color fallback for gradients
      contrastText: '#fff',
    },
    text: {
      primary: '#000000', // Default text color
      secondary: 'rgba(0, 0, 0, 0.8)', // Secondary text color with opacity
    },
  },
  shape: {
    borderRadius: 8, // Adjust the border radius for components if needed
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderWidth: '1px', // Set global border width for buttons (you can adjust for other components similarly)
          borderStyle: 'solid',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderWidth: '1px',
          borderStyle: 'solid',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderWidth: '1px',
          borderStyle: 'solid',
        },
      },
    },
  },
});

export default theme;


theme.typography.h2 = {
  [theme.breakpoints.down("sm")]: {
    fontSize: "32px",
  },
};

theme.typography.h1 = {
  [theme.breakpoints.down("sm")]: {
    fontSize: "36px",
  },
};

theme.typography.h3 = {
  [theme.breakpoints.down("sm")]: {
    fontSize: "22px",
  },
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
