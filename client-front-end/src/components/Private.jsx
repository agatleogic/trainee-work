import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const Private = () => {
    let auth1 = localStorage.getItem("user");
    return auth1 ? <Outlet /> : <Navigate to="register" />
}

export default Private