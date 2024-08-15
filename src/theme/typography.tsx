import { TypographyOptions } from '@mui/material/styles/createTypography';

const typography = (themeColors: any): TypographyOptions => ({
  fontFamily: 'Roboto, sans-serif',
  h1: {
    fontSize: '2rem',
    fontWeight: 700,
    color: themeColors.textPrimary,
  },
  h2: {
    fontSize: '1.75rem',
    fontWeight: 600,
    color: themeColors.textPrimary,
  },
  body1: {
    fontSize: '1rem',
    fontWeight: 400,
    color: themeColors.textSecondary,
  },
});

export default typography;
