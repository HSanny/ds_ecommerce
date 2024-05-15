import axios from "axios";
import React, { PropsWithChildren } from "react";
import { RegisterDataType, UserType, initialUserState, userDataType } from "../types/authType";
import { LOGIN_ENDPOINT, REGISTER_ENDPOINT } from "../utils/api";
import axiosInstance from "../utils/axiosConfig";

interface AuthContextType {
    user: UserType;
    login: (email: string, password: string) => Promise<any>;
    register: (registerData: RegisterDataType) => Promise<any>;
    logout: () => void;
    onLogin: (userData: userDataType) => void;
}

const Authcontext = React.createContext<AuthContextType>(null!);

export const useAuthContext = () => {
    return React.useContext(Authcontext)
}

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {

    const [user, setUser] = React.useState<UserType>(initialUserState);

    const login = async (email: string, password: string) => {
        try {
            const response = await axiosInstance.post(LOGIN_ENDPOINT, {
                email,
                password
            })
            return response.data
        } catch (error) {
            console.error('Login error:', error)
            throw error
        }
    };

    const onLogin = (userData: userDataType) => {
        setUser({
            isLogin: true,
            email: userData.email,
            userData: userData,
        })
    }

    const register = async (registerData: any) => {
        try {
            const response = await axios.post(REGISTER_ENDPOINT, registerData)
            return response.data
        } catch (error) {
            console.log('Registration error: ', error);
        }
    }

    const logout = () => {
        setUser(initialUserState)
    }


    return (
        <Authcontext.Provider value={{ user, login, onLogin, register, logout }}>
            {children}
        </Authcontext.Provider>
    )
}