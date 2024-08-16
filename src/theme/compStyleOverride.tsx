import { Components } from '@mui/material/styles';

const componentStyleOverrides = (colors: any): Components => {
    return {
        MuiButton: {
            styleOverrides: {
                root: {
                    width:'100px',
                    borderRadius: '8px',
                    backgroundColor: colors.secondaryMain,
                },
            },
        },
        // Add other component overrides here as needed
    };
};

export default componentStyleOverrides;
