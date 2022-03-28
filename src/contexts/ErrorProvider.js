import React, { useContext, useReducer, createContext } from "react";

export const ErrorContext = createContext();

export const ErrorReducer = (state, action) => {
    switch (action.type) {
        case "RETURN_ERROR":
            return {
                message: action.payload.message,
                status: action.payload.status,
                id: action.payload.id,
            };
        case "CLEAR_ERROR":
            return {
                message: null,
                status: null,
                id: null,
            };
        default:
            return state;
    }
};

export const useError = () => {
    const { state, dispatch } = useContext(ErrorContext);
    return [state, dispatch];
};

export const ErrorProvider = ({ children }) => {
    const initialState = {
        message: null,
        status: null,
        id: null,
    };

    const [state, dispatch] = useReducer(ErrorReducer, initialState);

    return (
        <ErrorContext.Provider value={{ state: state, dispatch: dispatch }}>
            {children}
        </ErrorContext.Provider>
    );
};
