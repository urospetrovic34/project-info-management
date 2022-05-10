import React from "react";
import CreateUserCSS from "./CreateUser.module.css";
import CreateUserContainer from "../elements/createContainer/CreateUser";
export const CreateUser = () => {
    return (
        <div className={CreateUserCSS.wrapper}>
            <CreateUserContainer />
        </div>
    );
};
