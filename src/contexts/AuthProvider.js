import React, { useContext, useReducer, createContext } from "react";

const AuthContext = createContext();

const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
        case "REGISTER_SUCCESS":
            return {
                ...state,
                user: "BETMEN",
            };
        case "LOGIN_FAIL":
        case "REGISTER_FAIL":
        case "LOGOUT_SUCCESS":
            console.log("OPCIJA 2");
            return {
                ...state,
            };
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
        user: null,
        token: null,
        isAuthenticated: false
    };

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    return (
        <AuthContext.Provider value={{ state: state, dispatch: dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

