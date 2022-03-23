import React, { useState } from "react";
import { useAuth } from "../../../contexts/AuthProvider";
import AuthAPI from "../../../actions/auth";
import LoginCSS from "./Login.module.css";
import Input from "../../elements/input/Input";
import logo from "../../../assets/q-logo.png";
import Button from "../../elements/button/Button";

export const Login = () => {
    const [authState, authDispatch] = useAuth();
    const { user } = authState;
    console.log(user)

    const [credentials, setCredentials] = useState({
        identifier: "",
        password: "",
    });

    const handleCredentialsChange = (event) => {
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value,
        });
    };

    const handleCredentialsClick = (event) => {
        event.preventDefault();
        AuthAPI.login(authDispatch, credentials)
    };

    return (
        <div className={LoginCSS.wrapper}>
            <div className={LoginCSS.container}>
                <img src={logo} alt="alt" />
                <h2>Login</h2>
                <form className={LoginCSS.form}>
                    <div className={LoginCSS.row}>
                        <Input
                            type="text"
                            name="identifier"
                            placeholder="Email"
                            onChange={handleCredentialsChange}
                        />
                    </div>
                    <div className={LoginCSS.row}>
                        <Input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={handleCredentialsChange}
                        />
                    </div>
                    <div className={LoginCSS.row}>
                        <Button onClick={handleCredentialsClick} />
                    </div>
                </form>
            </div>
        </div>
    );
};
