import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      light: '#F2FBFC',
      main: '#003846',
      dark: '#1E1E1E',
    },
    secondary: {
      main: '#04A7C3',
    },
    neutral: {
      main: '#7A7289',
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: 'Sofia Sans, sans-serif',
    h1: {
      fontSize: '5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '4rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '3.5rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '3rem',
      fontWeight: 400,
    },
    h5: {
      fontSize: '2.5rem',
      fontWeight: 400,
    },
    h6: {
      fontSize: '2rem',
      fontWeight: 400,
    },
  },
});

export default theme;
