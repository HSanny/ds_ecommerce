import React from "react";
import { TextField, Button, Container, Box, Paper, Typography } from '@mui/material';
import { useAuthContext } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const { login, onLogin } = useAuthContext();

    const navigate = useNavigate() // for redirecting after login

    const handleSubmit = async () => {
        const userData = await login(email, password);
        if (userData) {
            onLogin(userData)
            navigate('/products')
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={6} sx={{ mt: 8, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={() => navigate('/authenticaion/sign-up')}
                    >
                        Sign Up
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}

export default Login