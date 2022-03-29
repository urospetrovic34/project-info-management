import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

export const PrivateRoute = ({ children, redirect }) => {
    const [authState, authDispatch] = useAuth();
    const { user, token } = authState;

    if (!user && !token) {
        return <Navigate to={redirect} replace />;
    }

    return children;
};
