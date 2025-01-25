import React, { createContext, useContext } from 'react'
import { Navigate, Outlet } from 'react-router';
import { UserContext } from '../App';


export const ProtectedRoutes = () => {
    const {user, setUser} = useContext(UserContext);
    return user.loggedIn ?
        <Outlet />
        : <Navigate to='/login' />
}
