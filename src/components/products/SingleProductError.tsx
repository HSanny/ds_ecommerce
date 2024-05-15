import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SingleProductErrorPage = ({ message }: { message: string }) => {
    const navigate = useNavigate();

    return (
        <Container maxWidth="sm" sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>{message}</Typography>
            <Button variant="contained" color="primary" onClick={() => navigate('/products')}>
                Back to Product List
            </Button>
        </Container>
    );
};

export default SingleProductErrorPage;