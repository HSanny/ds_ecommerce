import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Typography, Button, styled } from "@mui/material";

const WelcomeBanner = () => {
    return (
        <BannerWrapper>
            <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h1" component="h1" gutterBottom>
                    High quality <br />
                    electronic product for you!
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                    Electronic products from worldwide renowned factory
                    for you to pick, with guaranteed quality and good price!
                </Typography>
                <Button
                    component={RouterLink}
                    to="/products"
                    variant="contained"
                    color="primary"
                    size="large"
                >
                    SHOP NOW
                </Button>
            </Box>
        </BannerWrapper>
    );
};

export default WelcomeBanner;

// Styled components using Material-UI 'styled' utility
const BannerWrapper = styled('section')(({ theme }) => ({
    minHeight: '60vh',
    display: 'grid',
    placeItems: 'center',
    [theme.breakpoints.up('lg')]: {
        height: `calc(100vh - ${theme.spacing(10)})`,
        gridTemplateColumns: '1fr 1fr',
        gap: theme.spacing(16),
        '.MuiTypography-h1': {
            marginBottom: theme.spacing(4),
        },
        '.MuiTypography-body1': {
            fontSize: '1.25rem',
        },
    },
}));
