import axios from "axios";
import React, { PropsWithChildren } from "react";
import { RegisterDataType, UserType, initialUserState, userDataType } from "../types/authType";
import { LOGIN_ENDPOINT, REFRESH_TOKEN_ENDPOINT, REGISTER_ENDPOINT } from "../utils/api";
import axiosInstance from "../utils/axiosConfig";

interface AuthContextType {
    user: UserType;
    login: (email: string, password: string) => Promise<any>;
    register: (registerData: RegisterDataType) => Promise<any>;
    logout: () => void;
}

const Authcontext = React.createContext<AuthContextType>(null!);

export const useAuthContext = () => {
    return React.useContext(Authcontext)
}

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {

    const [user, setUser] = React.useState<UserType>(initialUserState);

    const login = async (email: string, password: string) => {
        try {
            const response = await axiosInstance.post(LOGIN_ENDPOINT, { email, password });
            const { access, refresh } = response.data;

            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);

            const userResponse = await axiosInstance.get('/api/user/me/');
            setUser({ isLogin: true, email: userResponse.data.email, userData: userResponse.data });
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const register = async (registerData: any) => {
        try {
            const response = await axiosInstance.post(REGISTER_ENDPOINT, registerData);
            await login(registerData.email, registerData.password);
        } catch (error) {
            console.log('Registration error:', error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setUser(initialUserState);
    };

    const refreshAccessToken = async () => {
        try {
            const refresh = localStorage.getItem('refresh_token')
            if (refresh) {
                const response = await axiosInstance.post(REFRESH_TOKEN_ENDPOINT, { refresh })
                localStorage.setItem('access_token', response.data.access)
            }
        } catch (error) {
            console.error('Token refresh error:', error)
            logout()
        }
    }

    // Use setInterval to refresh the token periodically
    React.useEffect(() => {
        const interval = setInterval(refreshAccessToken, 4 * 60 * 1000); // refresh every 4 minutes
        return () => clearInterval(interval);
    }, []);

    return (
        <Authcontext.Provider value={{ user, login, register, logout }}>
            {children}
        </Authcontext.Provider>
    )
}