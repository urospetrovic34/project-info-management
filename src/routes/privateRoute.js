import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

export const PrivateRoute = ({ children, redirect }) => {
    const [authState, authDispatch] = useAuth();
    const { user, token } = authState;
    const location = useLocation();
    console.log(location);

    if (!user && !token) {
        return <Navigate to={redirect} replace />;
    }
    else if(user.role.name === "System Administrator" && location.pathname === "/"){
        return <Navigate to="/admin" replace />;
    }

    return children;
};
