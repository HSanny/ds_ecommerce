import axios from "axios";
import React, { PropsWithChildren } from "react";
import { UserType, initialUserState, userDataType } from "../types/authType";
import { LOGIN_ENDPOINT } from "../utils/api";
import { getCsrfToken } from "../utils/helpers";
import axiosInstance from "../utils/axiosConfig";

interface AuthContextType {
    user: UserType;
    login: (email: string, password: string) => {};
    register: (useData: any) => {};
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
    const [userData, setUserData] = React.useState<userDataType>();

    const login = async (email: string, password: string) => {
        console.log('Logging in');
        try {
            const csrfToken = getCsrfToken(); // Make sure CSRF token is being fetched correctly
            console.log('csrfToken: ', csrfToken)
            const response = await axiosInstance.post(LOGIN_ENDPOINT, {
                email,
                password
            }, {
                headers: {
                    'X-CSRFToken': csrfToken,  // Ensure CSRF token is set in the request header
                }
            });
            console.log('Login response:', response);
            return response.data;
        } catch (error) {
            console.error('Login error:', error);
            if (axios.isAxiosError(error) && error.response) {
                // Assuming setErrors is a function that sets error messages in your component's state
                setErrors(error.response.data.errors || ['Unknown error occurred']);
            } else {
                console.error('Unexpected error:', error);
            }
        }
    };

    const onLogin = (userData: userDataType) => {
        setUserData(userData)
    }

    const register = async (registerData: any) => {
        try {
            const response = await axios.post('/api/register', registerData)
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