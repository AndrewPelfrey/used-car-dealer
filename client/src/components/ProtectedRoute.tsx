import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: ReactNode;
    requiredRole: string; 
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
    const role = localStorage.getItem('role'); 

    if (role !== requiredRole) {
        return <Navigate to="/" />;
    }

    return <>{children}</>; 
};

export default ProtectedRoute;
