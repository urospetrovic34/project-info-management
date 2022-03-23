import React, { useContext, useReducer, createContext } from "react";

const AuthContext = createContext();

const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
        case "REGISTER_SUCCESS":
            localStorage.setItem("user", JSON.stringify(action.payload.user));
            localStorage.setItem("token", action.payload.jwt);
            return {
                ...state,
                user: localStorage.getItem("user"),
                token: localStorage.getItem("token"),
            };
        case "LOGIN_FAIL":
        case "REGISTER_FAIL":
        case "LOGOUT_SUCCESS":
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            return state;
        default:
            return state;
    }
};

export const useAuth = () => {
    const { state, dispatch } = useContext(AuthContext);
    return [state, dispatch];
};

export const AuthProvider = ({ children }) => {
    const initialState = {
        user: localStorage.getItem("user"),
        token: localStorage.getItem("token"),
    };

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    return (
        <AuthContext.Provider value={{ state: state, dispatch: dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};
