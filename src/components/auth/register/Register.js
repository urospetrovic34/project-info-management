import React, { useState } from "react";
import { useAuth } from "../../../contexts/AuthProvider";
import AuthAPI from "../../../actions/auth";
import RegisterCSS from "./Register.module.css";
import Input from "../../elements/input/Input";
import logo from "../../../assets/q-logo.png";

export const Register = () => {
    const [authState, authDispatch] = useAuth();
    const { user } = authState;

    const [credentials, setCredentials] = useState({
        identifier: "",
        password: "",
    });

    return (
        <div className={RegisterCSS.wrapper}>
            <div className={RegisterCSS.container}>
                <img src={logo} alt="alt" />
                <h2>Login</h2>
                <form className={RegisterCSS.form}>
                    <div className={RegisterCSS.row}>
                        <Input />
                        <Input />
                    </div>
                    <div className={RegisterCSS.row}>
                        <Input />
                    </div>
                    <div className={RegisterCSS.row}>
                        <Input />
                    </div>
                    <div className={RegisterCSS.row}>
                        <Input />
                    </div>
                    <div className={RegisterCSS.row}>
                        <button>ASD</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
