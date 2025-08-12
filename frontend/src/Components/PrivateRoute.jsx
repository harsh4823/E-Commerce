import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const PrivateRoute = ({publicPage = false}) => {
    const { user } = useSelector(state => state.auth);
    const location = useLocation();

    if (publicPage) {
        return (user && !location.state?.from) ? <Navigate to={'/'} replace/> : <Outlet/>
    }
 return user ? <Outlet/> : <Navigate to={'/login'} state={{from : location}} replace/>
}
