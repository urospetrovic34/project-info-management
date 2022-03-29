import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

export const DefaultRoute = () => {
    const [authState, authDispatch] = useAuth();
    const { user, token } = authState;

    if (user && token) {
        return <Navigate to="/" replace />;
    } else {
        return <Navigate to="/login" replace />;
    }
};
