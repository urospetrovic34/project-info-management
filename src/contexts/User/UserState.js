import React, { useContext, useReducer } from "react";
import { UserContext } from "./UserContext";
import UserReducer from "./UserReducer";

export const useUser = () => {
    const { state, dispatch } = useContext(UserContext);
    return [state, dispatch];
};

export const UserState = ({ children }) => {
    const initialState = {
        user: null,
        token: null,
    };

    const [state, dispatch] = useReducer(UserReducer, initialState);

    return (
        <UserContext.Provider value={{ state: state, dispatch: dispatch }}>
            {children}
        </UserContext.Provider>
    );
};
