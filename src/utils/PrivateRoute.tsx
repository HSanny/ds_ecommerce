import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../contexts/authContext';

/*
*   ensure only authenticated users can access certain routes
*
*/

const PrivateRoute = () => {
    const { user } = useAuthContext()

    return user.isLogin ? <Outlet /> : <Navigate to='authentication/login' />
}

export default PrivateRoute