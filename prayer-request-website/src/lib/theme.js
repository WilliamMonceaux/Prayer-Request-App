'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    htmlFontSize: 10,
    fontFamily: 'var(--font-roboto), sans-serif',
    h1: { fontFamily: 'var(--font-lato), sans-serif', fontWeight: 700 },
    h2: { fontFamily: 'var(--font-lato), sans-serif', fontWeight: 700 },
    h3: { fontFamily: 'var(--font-lato), sans-serif', fontWeight: 700 },
    h4: { fontFamily: 'var(--font-lato), sans-serif', fontWeight: 700 },
    h5: { fontFamily: 'var(--font-lato), sans-serif', fontWeight: 700 },
    h6: { fontFamily: 'var(--font-lato), sans-serif', fontWeight: 700 },
  },
  components: { 
    MuiCssBaseline: {
      styleOverrides: {
        html: {
            fontSize: '10px',
        },
      },
    },
  },
});

export default theme;