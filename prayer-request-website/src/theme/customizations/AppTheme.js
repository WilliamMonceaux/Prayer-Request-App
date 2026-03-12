import * as React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { inputsCustomizations } from './inputs';
import { dataDisplayCustomizations } from './dataDisplay';
import { feedbackCustomizations } from './feedback';
import { navigationCustomizations } from './navigation';
import { surfacesCustomizations } from './surfaces';
import { 
  colorSchemes, 
  typography, 
  shadows, 
  shape 
} from '../customizations/themePrimitives';

export default function AppTheme(props) {
  const { children, disableCustomTheme, themeComponents } = props;

  const theme = React.useMemo(() => {
    return disableCustomTheme
      ? {}
      : createTheme({
          cssVariables: {
            colorSchemeSelector: 'data-mui-color-scheme',
            cssVarPrefix: 'template',
          },
          colorSchemes: {
            ...colorSchemes,
          },
          typography,
          shadows,
          shape,
          components: {
            ...inputsCustomizations,
            ...dataDisplayCustomizations,
            ...feedbackCustomizations,
            ...navigationCustomizations,
            ...surfacesCustomizations,
            ...themeComponents,
          },
        });
  }, [disableCustomTheme, themeComponents]);

  if (disableCustomTheme) {
    return <React.Fragment>{children}</React.Fragment>;
  }

  return (
    <ThemeProvider theme={theme} disableTransitionOnChange defaultMode="light">
      {children}
    </ThemeProvider>
  );
}

AppTheme.propTypes = {
  children: PropTypes.node,
  disableCustomTheme: PropTypes.bool,
  themeComponents: PropTypes.object,
};