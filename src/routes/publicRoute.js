import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

export const PublicRoute = ({ children, redirect }) => {
    const [authState, authDispatch] = useAuth();
    const { user, token } = authState;

    return !user && !token ? children : <Navigate to={redirect} />;
};
