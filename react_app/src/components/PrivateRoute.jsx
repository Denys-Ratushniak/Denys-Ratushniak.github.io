import React, {useState} from "react";
import { Route, Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
    const isLoggedIn = sessionStorage.getItem("Authorization");
    
    if (!isLoggedIn) {
        alert("Please sign in to have access to this page");
        return (
            <Navigate to="/login" />
        );
    }
    return children;
}

export default PrivateRoute;