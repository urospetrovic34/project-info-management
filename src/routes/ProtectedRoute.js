import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

export const ProtectedRoute = ({ children,redirect }) => {
    const [authState, authDispatch] = useAuth();
    console.log(authDispatch)
    const { user, token } = authState;
    return user && token ? (
        children
    ) : !user && !token ? (
        <Navigate to={redirect} />
    ) : null;
};
