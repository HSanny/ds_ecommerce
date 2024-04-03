import axios from "axios";
import React, { PropsWithChildren } from "react";
import { UserType, initialUserState } from "../types/userType";

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

    const login = async (email: string, password: string) => {
        try {
            const response = await axios.post('/api/login', {email, password})
            return response.data;
        } catch (error) {
            console.log('Login Error:', error)
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
        <Authcontext.Provider value={{user, login, onLogin, register, logout}}>
            {children}
        </Authcontext.Provider>
    )
}