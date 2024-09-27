import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Typography, Button, styled } from "@mui/material";

const WelcomeBanner = () => {
    return (
        <BannerWrapper>
            <Box>
                <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold', color: '#333', mb: 2 }}>
                    MORE THAN JUST SELLING ONLINE.
                </Typography>
                <Typography variant="h4" component="h2" sx={{ color: '#666', mb: 3 }}>
                    LESS THAN YOU'D EXPECT TO PAY.
                </Typography>
                <Typography variant="body1" sx={{ color: '#888', mb: 4 }}>
                    Try for free for as long as you like. No transaction fees.
                </Typography>
                <Box>
                    <StyledButton variant="contained">
                        Get started for free
                    </StyledButton>
                    <SecondaryButton variant="outlined">
                        No credit card required
                    </SecondaryButton>
                </Box>
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <img src={require("../assets/phone_mockup.png")} alt="Mobile app mockup" style={{ maxWidth: '100%' }} />
            </Box>
        </BannerWrapper>
    );
};

export default WelcomeBanner;

const StyledButton = styled(Button)(({ theme }) => ({
    padding: theme.spacing(1, 3),
    backgroundColor: '#FFD400',
    color: '#000',
    fontWeight: 'bold',
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
        backgroundColor: '#FFC300',
    },
}));

const SecondaryButton = styled(Button)(({ theme }) => ({
    padding: theme.spacing(1, 3),
    borderColor: '#000',
    color: '#000',
    fontWeight: 'bold',
    borderRadius: theme.shape.borderRadius,
    marginLeft: theme.spacing(2),
    '&:hover': {
        borderColor: '#333',
        color: '#333',
    },
}));

const BannerWrapper = styled('section')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(4),
    backgroundColor: '#fff',
    minHeight: '70vh',
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        textAlign: 'center',
    },
}));

// const BannerWrapper = styled('section')(({ theme }) => ({
//     minHeight: '60vh',
//     display: 'grid',
//     placeItems: 'center',
//     padding: theme.spacing(4),
//     background: `linear-gradient(135deg, #d8b8a0 30%, #b88970 90%)`,
//     color: theme.palette.common.white,
//     [theme.breakpoints.up('lg')]: {
//         height: `calc(100vh - ${theme.spacing(10)})`,
//         gridTemplateColumns: '1fr 1fr',
//         gap: theme.spacing(16),
//         '.MuiTypography-h1': {
//             marginBottom: theme.spacing(4),
//         },
//         '.MuiTypography-body1': {
//             fontSize: '1.25rem',
//         },
//     },
// }));

// const ButtonGroup = styled('div')(({ theme }) => ({
//     display: 'flex',
//     justifyContent: 'center',
//     marginTop: theme.spacing(4),
//     [theme.breakpoints.up('lg')]: {
//         justifyContent: 'flex-start',
//     },
// }));