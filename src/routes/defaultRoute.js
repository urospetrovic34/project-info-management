import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

export const DefaultRoute = () => {
    const [authState, authDispatch] = useAuth();
    const { user, token } = authState;

    return user && token ? <Navigate to="/" /> : <Navigate to="/login" />;
};
