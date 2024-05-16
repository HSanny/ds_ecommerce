import React, { ReactNode, forwardRef } from "react";
import { TextField, Button, Container, Box, Paper, Typography, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useAuthContext } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { PaymentMethodType, RegisterDataType, initialRegisterType } from "../types/authType";
import { InputMask, type InputMaskProps } from "@react-input/mask";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

// Component with InputMask
const CardNumberInputMask = forwardRef<HTMLInputElement, InputMaskProps>((props, forwardedRef) => {
    return <InputMask ref={forwardedRef} mask="____ - ____ - ____ - ____" replacement="_" {...props} />;
});

const ExpiryDateInputMask = forwardRef<HTMLInputElement, InputMaskProps>((props, forwardedRef) => {
    return <InputMask ref={forwardedRef} mask="__ / __" replacement="_" {...props} />;
});

const CVVInputMask = forwardRef<HTMLInputElement, InputMaskProps>((props, forwardedRef) => {
    return <InputMask ref={forwardedRef} mask="___" replacement="_" {...props} />;
});

const SignUp = () => {
    const [registerData, setRegisterData] = React.useState<RegisterDataType>(initialRegisterType)
    const { register } = useAuthContext();

    const navigate = useNavigate() // for redirecting after login

    const handleChange = (
        prop: keyof RegisterDataType,
        subprop?: keyof PaymentMethodType
    ) => (event: React.ChangeEvent<HTMLInputElement>) => {
        if (subprop && registerData.paymentMethod.type) {
            setRegisterData((prevData) => ({
                ...prevData,
                paymentMethod: { ...prevData.paymentMethod, [subprop]: event.target.value }
            }))
        } else {
            setRegisterData((prevData) => ({
                ...prevData,
                [prop]: event.target.value
            }))
        }
    }


    const handlePaymentTypeChange = (event: SelectChangeEvent<string>) => {
        const type = event.target.value as 'Credit Card' | 'Debit Card' | 'PayPal' | ''
        setRegisterData((prevData) => ({
            ...prevData,
            paymentMethod: {
                type: type,
                cardNumber: '',
                expiryDate: '',
                cvv: '',
                cardholderName: ''
            }
        }))
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await register(registerData);
            navigate('/products');
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

                    <PhoneInput
                        country={'us'}
                        onChange={e => handleChange('phoneNumber')}
                        containerStyle={{ margin: '16px 0' }}
                        inputStyle={{ width: '100%' }}
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
                                InputProps={{
                                    inputComponent: CardNumberInputMask
                                }}
                                margin="normal"
                                required
                                fullWidth
                                name="cardNumber"
                                label="Card Number"
                                type="text"
                                id="cardNumber"
                                value={registerData.paymentMethod.cardNumber || ''}
                                onChange={handleChange('paymentMethod', 'cardNumber')}
                            />
                            <TextField
                                InputProps={{
                                    inputComponent: ExpiryDateInputMask
                                }}
                                margin="normal"
                                required
                                fullWidth
                                name="expiryDate"
                                label="Expiry Date"
                                type="text"
                                id="expiryDate"
                                value={registerData.paymentMethod.expiryDate || ''}
                                onChange={handleChange('paymentMethod', 'expiryDate')}
                            />

                            <TextField
                                InputProps={{
                                    inputComponent: CVVInputMask
                                }}
                                margin="normal"
                                required
                                fullWidth
                                name="cvv"
                                label="CVV"
                                type="text"
                                id="cvv"
                                value={registerData.paymentMethod.cvv || ''}
                                onChange={handleChange('paymentMethod', 'cvv')}
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
                                onChange={handleChange('paymentMethod', 'cardholderName')}
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
                                onChange={handleChange('paymentMethod', 'cardholderName')}
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

                    <FormControl
                        fullWidth
                        sx={{
                            mt: 2
                        }}
                    >
                        <InputLabel> Default Shipping Method </InputLabel>
                        <Select
                            labelId="default-shipping-method-label"
                            value={registerData.defaultShippingMethod || ''}
                            label="Default Shipping Method"
                            onChange={(e) => handleChange('defaultShippingMethod')}
                        >
                            <MenuItem value={'Standard'}>Standard</MenuItem>
                            <MenuItem value={'Express'}>Express</MenuItem>
                            <MenuItem value={'Next-Day'}>Next-Day</MenuItem>
                        </Select>
                    </FormControl>

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