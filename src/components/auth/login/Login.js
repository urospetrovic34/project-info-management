import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../../contexts/AuthProvider";
import AuthAPI from "../../../actions/auth";
import LoginCSS from "./Login.module.css";
import Input from "../../elements/input/Input";
import logo from "../../../assets/q-logo.png";
import Button from "../../elements/button/Button";
import Label from "../../elements/label/Label";
import { useError } from "../../../contexts/ErrorProvider";
import { emailRegex } from "../../../utils/regex";
import { Checkbox } from "../../elements/checkbox/Checkbox";
import { Link } from "react-router-dom";
import File from "../../elements/file/File";

export const Login = () => {
    const [authState, authDispatch] = useAuth();
    const [errorState, errorDispatch] = useError();
    const { message } = errorState;

    const [errors, setErrors] = useState({
        identifier: "",
        password: "",
    });
    const [credentials, setCredentials] = useState({
        identifier: "",
        password: "",
    });

    const [rememberCheck, setRememberCheck] = useState(false);

    const handleCredentialsChange = (event) => {
        event.preventDefault();
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value,
        });
    };

    const handleCheckboxChange = () => {
        localStorage.setItem("remember", !rememberCheck);
        setRememberCheck(!rememberCheck);
    };

    const handleCredentialsClick = (event) => {
        event.preventDefault();
        setErrors((errors) => ({ errors }));
        if (!credentials.identifier) {
            setErrors((errors) => ({
                ...errors,
                identifier: "Field is required",
            }));
        } else if (!emailRegex.test(credentials.identifier)) {
            setErrors((errors) => ({
                ...errors,
                identifier: "Email is not valid",
            }));
        }
        if (!credentials.password) {
            setErrors((errors) => ({
                ...errors,
                password: "Field is required",
            }));
        }
        if (
            credentials.identifier &&
            credentials.password &&
            emailRegex.test(credentials.identifier)
        ) {
            AuthAPI.login(authDispatch, errorDispatch, credentials);
        }
    };

    useEffect(() => {
        localStorage.setItem("remember", false);
    }, []);

    return (
        <div className={LoginCSS.wrapper}>
            <div className={LoginCSS.container}>
                <img className={LoginCSS.logo} src={logo} alt="alt" />
                <Label text="Sign in" style={LoginCSS.header} />
                <Label
                    text={message ? message.error.message : <>&nbsp;</>}
                    style={LoginCSS.credentials}
                />
                <form className={LoginCSS.form}>
                    <div className={LoginCSS.row}>
                        <Label
                            style={LoginCSS.input_label}
                            text="Email"
                            required={true}
                            errorMessage={errors.identifier}
                        />
                        <Input
                            type="text"
                            name="identifier"
                            placeholder="Email"
                            onChange={handleCredentialsChange}
                            error={errors.identifier}
                        />
                    </div>
                    <div className={LoginCSS.row}>
                        <Label
                            style={LoginCSS.input_label}
                            text="Password"
                            required={true}
                            errorMessage={errors.password}
                        />
                        <Input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={handleCredentialsChange}
                            error={errors.password}
                        />
                    </div>
                    <div className={LoginCSS.centre_row}>
                        <Checkbox
                            checked={rememberCheck}
                            text="Remember me"
                            onChange={() => handleCheckboxChange()}
                        />
                    </div>
                    <div className={`${LoginCSS.row} ${LoginCSS.button_row}`}>
                        <Button
                            text="Sign in"
                            onClick={handleCredentialsClick}
                        />
                    </div>
                </form>
                <div className={LoginCSS.forget_row}>
                    <Link to="#">
                        <Label text="Forgot password?" />
                    </Link>
                </div>
            </div>
        </div>
    );
};
//
