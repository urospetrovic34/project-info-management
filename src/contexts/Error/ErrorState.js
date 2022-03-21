import React, { useContext, useReducer } from "react";
import { ErrorContext } from "./ErrorContext";
import ErrorReducer from "./ErrorReducer";

export const useError = () => {
    const { state, dispatch } = useContext(ErrorContext);
    return [state, dispatch];
};

export const ErrorState = ({ children }) => {
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
