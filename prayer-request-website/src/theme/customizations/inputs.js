import { alpha } from '@mui/material/styles';
import { gray } from '../customizations/themePrimitives';

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

        ...(ownerState.variant === 'contained' && ownerState.color === 'primary' && {
          background: `linear-gradient(to bottom, ${gray[700]} 0%, ${gray[800]} 100%)`,
          border: `1px solid ${alpha(gray[500], 0.3)}`,
          color: theme.palette.common.white,
          boxShadow: 'inset 0px 1px 0px hsla(0,0%,100%,0.1), 0px 2px 4px rgba(0,0,0,0.2)',
          '&:hover': {
            background: `linear-gradient(to bottom, ${gray[600]} 0%, ${gray[700]} 100%)`,
            boxShadow: 'inset 0px 1px 0px hsla(0,0%,100%,0.15), 0px 4px 8px rgba(0,0,0,0.3)',
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
};