import React from "react";
import { TextField, Button, Container, Box, Paper, Typography, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useAuthContext } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { PaymentMethodType, RegisterDataType, initialRegisterType, userDataType } from "../types/authType";
import { relative } from "path";

const SignUp = () => {
    const [registerData, setRegisterData] = React.useState<RegisterDataType>(initialRegisterType)
    const { register, onLogin } = useAuthContext();

    const navigate = useNavigate() // for redirecting after login

    const handleChange = (
        prop: keyof RegisterDataType,
        subprop?: keyof PaymentMethodType
    ) => (event: React.ChangeEvent<HTMLInputElement>) => {
        if (subprop && registerData.paymentMethod.type) {
            setRegisterData({
                ...registerData,
                paymentMethod: { ...registerData.paymentMethod, [subprop]: event.target.value }
            });
        } else {
            setRegisterData({
                ...registerData,
                [prop]: event.target.value
            })
        }
    }


    const handlePaymentTypeChange = (event: SelectChangeEvent<string>) => {
        const type = event.target.value as 'Credit Card' | 'Debit Card' | 'PayPal' | ''
        setRegisterData({
            ...registerData,
            paymentMethod: {
                type: type,
                cardNumber: '',
                expiryDate: '',
                cvv: '',
                cardholderName: ''
            }
        })
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const userData = await register(registerData);
            if (userData) {
                onLogin(userData);
                navigate('/products');
            }
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={6} sx={{ mt: 8, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        mt: 3
                    }}>

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={registerData.email}
                        onChange={handleChange('email')}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        value={registerData.username}
                        onChange={handleChange('username')}
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
                        value={registerData.password}
                        onChange={handleChange('password')}
                    />

                    <FormControl
                        fullWidth
                        sx={{
                            mt: 2
                        }}
                    >
                        <InputLabel> Payment Method </InputLabel>
                        <Select
                            labelId="payment-method-label"
                            value={registerData?.paymentMethod?.type}
                            label="Payment Method"
                            onChange={handlePaymentTypeChange}
                        >
                            <MenuItem value={'Credit Card'}>Credit Card</MenuItem>
                            <MenuItem value={'Debit Card'}>Debit Card</MenuItem>
                            <MenuItem value={'PayPal'}>PayPal</MenuItem>
                        </Select>
                    </FormControl>

                    {['Credit Card', 'Debit Card'].includes(registerData.paymentMethod.type) && (
                        <>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="cardNumber"
                                label="Card Number"
                                type="text"
                                id="cardNumber"
                                value={registerData.paymentMethod.cardNumber || ''}
                                onChange={(e) => handleChange('paymentMethod', 'cardNumber')}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="expiryDate"
                                label="Expiry Date"
                                type="text"
                                id="expiryDate"
                                value={registerData.paymentMethod.expiryDate || ''}
                                onChange={(e) => handleChange('paymentMethod', 'expiryDate')}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="cvv"
                                label="CVV"
                                type="text"
                                id="cvv"
                                value={registerData.paymentMethod.cvv || ''}
                                onChange={(e) => handleChange('paymentMethod', 'cvv')}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="cardholderName"
                                label="Cardholder Name"
                                type="text"
                                id="cardholderName"
                                value={registerData.paymentMethod.cardholderName || ''}
                                onChange={(e) => handleChange('paymentMethod', 'cardholderName')}
                            />
                        </>
                    )}

                    {registerData.paymentMethod.type === 'PayPal' && (
                        <>
                            <TextField
                                margin="normal"
                                fullWidth
                                name="paypalEmail"
                                label="PayPal Email"
                                type="email"
                                id="paypalEmail"
                                value={registerData.paymentMethod.cardholderName || ''}  // Assuming using cardholderName to store PayPal email
                                onChange={(e) => handleChange('paymentMethod', 'cardholderName')}
                            />
                        </>
                    )}

                    <TextField
                        margin="normal"
                        fullWidth
                        name="billingAddress"
                        label="Billing Address"
                        type="text"
                        id="billingAddress"
                        autoComplete="billing-address"
                        value={registerData.billingAddress}
                        onChange={handleChange('billingAddress')}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        name="shippingAddress"
                        label="Shipping Address"
                        type="text"
                        id="shippingAddress"
                        autoComplete="shipping-address"
                        value={registerData.shippingAddress}
                        onChange={handleChange('shippingAddress')}
                    />


                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Typography
                        component="p"
                        sx={{
                            mt: 1,
                            mb: 1,
                            textAlign: 'center',
                            fontSize: 'relative'
                        }}
                    >
                        Already have an account ?
                    </Typography>
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={() => navigate('/authentication/login')}
                    >
                        Sign In
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}

export default SignUp