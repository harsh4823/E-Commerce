import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const PrivateRoute = ({publicPage = false,adminOnly=false}) => {
    const { user } = useSelector(state => state.auth);
    const location = useLocation();
    const isAdmin = user && user?.roles?.includes("ROLE_ADMIN");

    if (publicPage) {
        return (user && !location.state?.from) ? <Navigate to={'/'} replace/> : <Outlet/>
    }
    if (adminOnly) {
        if (!isAdmin) {
           return <Navigate to={'/'}/>
        }
    }
 return user ? <Outlet/> : <Navigate to={'/login'} state={{from : location}} replace/>
}
