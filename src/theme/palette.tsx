import { PaletteOptions } from '@mui/material/styles';

const palette = (themeColors: any): PaletteOptions => ({
  primary: {
    main: themeColors.primaryMain,
    light: themeColors.primaryLight,
    dark: themeColors.primaryDark,
  },
  secondary: {
    main: themeColors.secondaryMain,
    light: themeColors.secondaryLight,
    dark: themeColors.secondaryDark,
  },
  background: {
    default: themeColors.paper,
    paper: themeColors.paper,
  },
  text: {
    primary: themeColors.grey900,
    secondary: themeColors.grey500,
  },
});

export default palette;
