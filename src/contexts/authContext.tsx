import axios from "axios";
import React, { PropsWithChildren } from "react";
import { UserType, initialUserState } from "../types/userType";
import { LOGIN_ENDPOINT } from "../utils/api";
import { getCsrfToken } from "../utils/helpers";

interface AuthContextType {
    user: UserType;
    login: (email: string, password: string) => {};
    register: (useData: any) => void;
    logout: () => void;
    onLogin: (userData: any) => void;
}

const Authcontext = React.createContext<AuthContextType>(null!);

export const useAuthContext = () => {
    return React.useContext(Authcontext)
}

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {

    const [user, setUser] = React.useState<UserType>(initialUserState);
    const [errors, setErrors] = React.useState<string[]>([]);

    const login = async (email: string, password: string) => {
        try {
            const csrfToken = getCsrfToken()
            const response = await axios.post(LOGIN_ENDPOINT, {
                email, password
            }, {
                withCredentials: true,
                headers: {
                    'X-CSRFToken': csrfToken,
                    'Content-Type': 'application/json',
                }
            })
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setErrors(error.response?.data?.errors || []);
            } else {
                console.error('Unexpected error:', error);
            }
        }
    }

    const onLogin = (userData: any) => {
        setUser(userData)
    }

    const register = async (userData: any) => {
        try {
            const response = await axios.post('/api/register', userData)
            return response.data
        } catch (error) {
            console.log('Registration error: ', error);
        }
    }

    const logout = () => {
        //TODO
    }

    return (
        <Authcontext.Provider value={{ user, login, onLogin, register, logout }}>
            {children}
        </Authcontext.Provider>
    )
}