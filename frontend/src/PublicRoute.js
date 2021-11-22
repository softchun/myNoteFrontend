import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import IsLogin from './utils';

const PublicRoute = () => {

    return IsLogin() ? <Navigate to="/home" /> : <Outlet />;
}

export default PublicRoute;