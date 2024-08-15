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
    default: themeColors.backgroundDefault,
    paper: themeColors.paper,
  },
  text: {
    primary: themeColors.textPrimary,
    secondary: themeColors.textSecondary,
  },
});

export default palette;
