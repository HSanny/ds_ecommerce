import React from "react";
import { TextField, Button } from '@mui/material';
import { useAuthContext } from "../../contexts/authContext";
import ButtonsWrapper from "../common/ButtonsWrapper";

const Login = () => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const { login, onLogin } = useAuthContext();

    const handleSubmit = async () => {
        const userData = await login(email, password);
        if (userData) {
            onLogin(userData)
        }
    }

    return (
        <div>
            <TextField
                label='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
                label='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <ButtonsWrapper>
                <Button onClick={handleSubmit}>Login</Button>
            </ButtonsWrapper>
        </div>
    )
}

export default Login