import React, { useContext, useReducer, createContext } from "react";

const AuthContext = createContext();

const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
        case "REGISTER_SUCCESS":
            (localStorage.getItem("remember") === "true"
                ? localStorage
                : sessionStorage
            ).setItem("token", action.payload.jwt);
            return {
                ...state,
                token: (localStorage.getItem("remember") === "true"
                    ? localStorage
                    : sessionStorage
                ).getItem("token"),
            };
        case "USER_LOADED":
            console.log(action.payload);
            (localStorage.getItem("remember") === "true"
                ? localStorage
                : sessionStorage
            ).setItem("user", JSON.stringify(action.payload));
            return {
                ...state,
                user: JSON.parse(
                    (localStorage.getItem("remember") === "true"
                        ? localStorage
                        : sessionStorage
                    ).getItem("user")
                ),
            };
        case "LOGIN_FAIL":
        case "REGISTER_FAIL":
        case "LOGOUT_SUCCESS":
            (localStorage.getItem("remember") === "true"
                ? localStorage
                : sessionStorage
            ).removeItem("user");
            (localStorage.getItem("remember") === "true"
                ? localStorage
                : sessionStorage
            ).removeItem("token");
            return {
                user: JSON.parse(
                    (localStorage.getItem("remember") === "true"
                        ? localStorage
                        : sessionStorage
                    ).getItem("user")
                ),
                token: (localStorage.getItem("remember") === "true"
                    ? localStorage
                    : sessionStorage
                ).getItem("token"),
            };
        default:
            return state;
    }
};
//comment
export const useAuth = () => {
    const { state, dispatch } = useContext(AuthContext);
    return [state, dispatch];
};

export const AuthProvider = ({ children }) => {
    const initialState = {
        user: JSON.parse(
            (localStorage.getItem("remember") === "true"
                ? localStorage
                : sessionStorage
            ).getItem("user")
        ),
        token: (localStorage.getItem("remember") === "true"
            ? localStorage
            : sessionStorage
        ).getItem("token"),
    };

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    return (
        <AuthContext.Provider value={{ state: state, dispatch: dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};
