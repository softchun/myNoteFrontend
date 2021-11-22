import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import IsLogin from './utils';

const PrivateRoute = () => {
    
    return IsLogin() ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;