import React from "react";
import { Navigate } from "react-router-dom";

// Текущий компонент принимает другой компонент в качестве пропса
// Он позволяет взять неограниченное число пропсов и передать их новому компоненту
function ProtectedRoute({ component: Component, ...props }) {
    return (
        props.loggedIn ? <Component {...props} /> : <Navigate to="/sign-in" replace />
    )
}

export default ProtectedRoute;