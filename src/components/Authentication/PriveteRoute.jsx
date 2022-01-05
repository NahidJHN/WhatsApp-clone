import React from 'react';
import { Outlet, Navigate, useLocation } from "react-router-dom"
import { useStateValue } from "../../stateProvider/stateProvider"



const PrivateRoute = () => {
    const [{ user }, ] = useStateValue()
    const location = useLocation()

    return user ? <Outlet /> : < Navigate replace state={{ from: location }} to="/sign-up" />
}

export default PrivateRoute;