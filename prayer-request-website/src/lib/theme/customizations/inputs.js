import { alpha } from '@mui/material/styles';
import { gray, brand, red } from './themePrimitives';

export const inputsCustomizations = {
  MuiButton: {
    styleOverrides: {
      root: ({ theme, ownerState }) => ({
        borderRadius: '1.2rem',
        padding: '0.8rem 2rem',
        textTransform: 'none',
        fontWeight: 600,
        transition: 'all 0.2s ease-in-out',

        fontSize: '1.4rem',
        [theme.breakpoints.up('xl')]: {
          fontSize: '1.6rem',
        },

        ...(ownerState.variant === 'contained' &&
          ownerState.color === 'primary' && {
            backgroundColor: brand[500],
            color: gray[50],
            boxShadow: '0px 4px 12px hsla(207, 90%, 54%, 0.25)',
            '&:hover': {
              backgroundColor: brand[400],
              boxShadow: '0px 6px 16px hsla(210, 98%, 48%, 0.60)',
            },
          }),

        ...(ownerState.variant === 'contained' &&
          ownerState.color === 'error' && {
            backgroundColor: red[500],
            color: gray[50],
            boxShadow: '0px 4px 12px hsla(0, 90%, 54%, 0.25)',
            '&:hover': {
              backgroundColor: red[400],
              boxShadow: '0px 6px 16px hsla(0, 98%, 48%, 0.60)',
            },
          }),
        
        '@media (min-width:1536px)': {
          padding: '.8rem 2rem',
          fontSize: '1.6rem',
          borderRadius: '1.6rem',
        },
      }),
      startIcon: {
        '& > *:nth-of-type(1)': {
          fontSize: '2.2rem',
          '@media (min-width:1536px)': { fontSize: '2.8rem' },
        },
      },
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: {
        padding: '1.2rem',
        '& .MuiSvgIcon-root': { fontSize: '2.4rem' },
        '@media (min-width:1536px)': {
          padding: '1.5rem',
          '& .MuiSvgIcon-root': { fontSize: '3rem' },
        },
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: ({ theme }) => ({
'& .MuiInputLabel-root': {
    color: theme.palette.text.secondary,
  },
  '& .MuiInputBase-input::placeholder': {
    color: theme.palette.text.secondary,
    opacity: 1,
  },
  '& .MuiFilledInput-root': {
          backgroundColor: gray[100],
          borderRadius: '1.2rem',
          color: gray[900], 
          '&:hover': {
            backgroundColor: gray[200],
          },
          '&.Mui-focused': {
            backgroundColor: gray[100],
          },
        },
        '& .MuiOutlinedInput-root': {
          backgroundColor:
            theme.palette.mode === 'dark'
              ? alpha(theme.palette.grey[900], 0.5)
              : '#f9f9f9',
          borderRadius: '1.2rem',
          transition: theme.transitions.create(['background-color', 'box-shadow']),
          '&:hover': {
            backgroundColor:
              theme.palette.mode === 'dark'
                ? alpha(theme.palette.grey[800], 0.6)
                : '#f0f0f0',
          },
        },
      }),
    },
  },
};
