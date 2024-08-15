import { Components } from '@mui/material/styles';

const componentStyleOverrides = (colors: any): Components => {
    return {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                    backgroundColor: colors.primaryMain,
                },
            },
        },
        // Add other component overrides here as needed
    };
};

export default componentStyleOverrides;
