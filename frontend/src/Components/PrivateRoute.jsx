import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const PrivateRoute = ({publicPage = false,adminOnly=false}) => {
    const { user } = useSelector(state => state.auth);
    const location = useLocation();
    const isAdmin = user && user?.roles?.includes("ROLE_ADMIN");
    const isSeller = user && user?.roles?.includes("ROLE_SELLER");

    if (publicPage) {
        return (user && !location.state?.from) ? <Navigate to={'/'} replace/> : <Outlet/>
    }
    if (adminOnly) {
        if (!isAdmin && isSeller) {
            const sellerAllowedPaths = ["/admin/orders", "/admin/products"];
            const sellerAllowed = sellerAllowedPaths.some(path => location.pathname.startsWith(path));
            if (!sellerAllowed) {
                return <Navigate to={"/"} state={{from : location}} replace/>
            }
        };    
    }
    
    if (!isAdmin && !isSeller) {
           return <Navigate to={'/'}/>
        }
 return user ? <Outlet/> : <Navigate to={'/login'} state={{from : location}} replace/>
}
