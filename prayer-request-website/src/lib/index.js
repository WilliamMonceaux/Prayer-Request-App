'use client';
import { createTheme } from '@mui/material/styles';
import {
  colorSchemes,
  typography,
  shadows,
  shape,
} from './theme/customizations/themePrimitives';
import { inputsCustomizations } from './theme/customizations/inputs';
import { dataDisplayCustomizations } from './theme/customizations/dataDisplay';
import { feedbackCustomizations } from './theme/customizations/feedback';
import { navigationCustomizations } from './theme/customizations/navigation';
import { surfacesCustomizations } from './theme/customizations/surfaces';

const theme = createTheme({
  colorSchemes,
  shadows,
  shape,

  typography: {
    ...typography,
    htmlFontSize: 10,
  },
  
  components: {
    ...inputsCustomizations,
    ...dataDisplayCustomizations,
    ...feedbackCustomizations,
    ...navigationCustomizations,
    ...surfacesCustomizations,
MuiCssBaseline: {
  styleOverrides: (theme) => ({
    html: {
      fontSize: '10px',
    },
    body: {
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      backgroundImage:
        'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
      
      ...theme.applyStyles('dark', {
        backgroundImage:
          'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
      }),
    },
  }),
},
  },
},
);

export default theme;
