import React from "react";
import { Navigate } from "react-router-dom";
import Message from "./Message";

function PrivateRoute({ children }) {
    const isLoggedIn = sessionStorage.getItem("Authorization");

    if (!isLoggedIn) {
        Message("Please sign in to have access to this page");
        return <Navigate to="/login" />;
    }
    return children;
}

export default PrivateRoute;
