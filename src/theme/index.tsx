// src/theme/index.ts
import { createTheme, ThemeOptions } from '@mui/material/styles';
import colors from '../scss/_themes-vars.module.scss'; // Importing SCSS variables
import componentStyleOverrides from './compStyleOverride';
import themePalette from './palette';
import themeTypography from './typography';

// Generate a static theme object
console.log('colors=====>',colors)

const themeOptions: ThemeOptions = {
  direction: 'ltr',
  palette: themePalette(colors), // Using the palette function
  typography: themeTypography(colors), // Using the typography function
  components: componentStyleOverrides(colors), // Using the component overrides function
};

const theme = createTheme(themeOptions);

export default theme;
