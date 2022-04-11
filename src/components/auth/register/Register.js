import React, { useState } from "react";
import { useAuth } from "../../../contexts/AuthProvider";
// import AuthAPI from "../../../actions/auth";
import RegisterCSS from "./Register.module.css";
import Input from "../../elements/input/Input";
import logo from "../../../assets/q-logo.png";
import { useError } from "../../../contexts/ErrorProvider";
import { emailRegex, passwordAltRegex } from "../../../utils/regex";
import Label from "../../elements/label/Label";
import Button from "../../elements/button/Button";
import { Checkbox } from "../../elements/checkbox/Checkbox";
import AuthAPI from "../../../actions/auth";

export const Register = () => {
    const [authState, authDispatch] = useAuth();
    const [errorState, errorDispatch] = useError();
    const { user } = authState;
    const { message } = errorState;

    const [errors, setErrors] = useState({
        email: "",
        password: "",
        name: "",
        surname: "",
        confirmPassword: "",
    });
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
        name: "",
        surname: "",
        confirmPassword: "",
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

    //HERE PUT HANDLE CREDENTIALS CLICK
    const handleCredentialsClick = (event) => {
        event.preventDefault();
        setErrors((errors) => ({ errors }));
        if (!credentials.name) {
            setErrors((errors) => ({
                ...errors,
                name: "Field is required",
            }));
        }
        if (!credentials.surname) {
            setErrors((errors) => ({
                ...errors,
                surname: "Field is required",
            }));
        }
        if (!credentials.email) {
            setErrors((errors) => ({
                ...errors,
                email: "Field is required",
            }));
        } else if (!emailRegex.test(credentials.email)) {
            setErrors((errors) => ({
                ...errors,
                email: "Email is not valid",
            }));
        }
        if (!credentials.password) {
            setErrors((errors) => ({
                ...errors,
                password: "Field is required",
            }));
        } else if (!passwordAltRegex.test(credentials.password)) {
            setErrors((errors) => ({
                ...errors,
                password: "Your password is not strong enough.",
            }));
        }
        if (
            !credentials.confirmPassword ||
            credentials.confirmPassword !== credentials.password
        ) {
            setErrors((errors) => ({
                ...errors,
                confirmPassword: "Passwords do not match",
            }));
        }
        if (
            credentials.name &&
            credentials.surname &&
            emailRegex.test(credentials.email) &&
            credentials.confirmPassword &&
            credentials.password &&
            passwordAltRegex.test(credentials.password)
        ) {
            AuthAPI.register(authDispatch, errorDispatch, credentials);
        }
    };

    return (
        <div className={RegisterCSS.wrapper}>
            <div className={RegisterCSS.container}>
                <img className={RegisterCSS.logo} src={logo} alt="alt" />
                <Label text="Registration" style={RegisterCSS.header} />
                <Label
                    text={message ? message.error.message : <>&nbsp;</>}
                    style={RegisterCSS.credentials}
                />
                <form className={RegisterCSS.form}>
                    <div className={RegisterCSS.hor_row}>
                        <div className={RegisterCSS.half_column}>
                            <Label
                                style={RegisterCSS.input_label}
                                text="First name"
                                required={true}
                                errorMessage={errors.name}
                            />
                            <Input
                                type="text"
                                name="name"
                                placeholder="First name"
                                onChange={handleCredentialsChange}
                                error={errors.name}
                            />
                        </div>
                        <div className={RegisterCSS.half_column}>
                            <Label
                                style={RegisterCSS.input_label}
                                text="Last name"
                                required={true}
                                errorMessage={errors.surname}
                            />
                            <Input
                                type="text"
                                name="surname"
                                placeholder="Last name"
                                onChange={handleCredentialsChange}
                                error={errors.surname}
                            />
                        </div>
                    </div>
                    <div className={RegisterCSS.row}>
                        <Label
                            style={RegisterCSS.input_label}
                            text="Email"
                            required={true}
                            errorMessage={errors.email}
                        />
                        <Input
                            type="text"
                            name="email"
                            placeholder="Email"
                            onChange={handleCredentialsChange}
                            error={errors.email}
                        />
                    </div>
                    <div className={RegisterCSS.row}>
                        <Label
                            style={RegisterCSS.input_label}
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
                    <div className={RegisterCSS.row}>
                        <Label
                            style={RegisterCSS.input_label}
                            text="Confirm password"
                            required={true}
                            errorMessage={errors.confirmPassword}
                        />
                        <Input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm password"
                            error={errors.confirmPassword}
                            onChange={handleCredentialsChange}
                        />
                    </div>
                    <div className={RegisterCSS.centre_row}>
                        <Checkbox
                            checked={rememberCheck}
                            text="Remember me"
                            onChange={() => handleCheckboxChange()}
                        />
                    </div>
                    <div
                        className={`${RegisterCSS.row} ${RegisterCSS.margin25}`}
                    >
                        <Button
                            text="Register"
                            onClick={handleCredentialsClick}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};
