import { Box, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                height: '5rem',
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: 'center',
                alignItems: 'center',
                background: 'var(--clr-black)',
                color: 'var(--clr-white)',
                textAlign: 'center',
                px: 2, // padding left and right
                py: 1, // padding top and bottom
                '& span': {
                    color: 'var(--clr-primary-5)',
                },
                '& h5': {
                    margin: '0.1rem',
                    fontWeight: 400,
                    textTransform: 'none',
                    lineHeight: 1.25,
                },
            }}
        >
            <Typography variant="h5">
                © {new Date().getFullYear()} Data & Commerce All Rights Reserved
            </Typography>
        </Box>
    );
};

export default Footer;