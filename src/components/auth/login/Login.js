import React, { useState } from "react";
import { useAuth } from "../../../contexts/AuthProvider";
// import AuthAPI from "../../../actions/auth";
import LoginCSS from "./Login.module.css";
import Input from "../../elements/input/Input";
import logo from "../../../assets/q-logo.png";

export const Login = () => {
  const [authState, authDispatch] = useAuth();
  const { user } = authState;
  console.log(authDispatch, user);

  const [credentials, setCredentials] = useState({
    identifier: "",
    password: "",
  });

  const handleCredentialsChange = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
    console.log(credentials);
  };

  const handleCredentialsClick = (event) => {
    event.preventDefault();
    console.log(credentials);
  };

  return (
    <div className={LoginCSS.wrapper}>
      <div className={LoginCSS.container}>
        <img src={logo} alt="alt" />
        <h2>Login</h2>
        <form className={LoginCSS.form}>
          <div className={LoginCSS.row}>
            <Input type="text" name="identifier" placeholder="Email" onChange={handleCredentialsChange} />
          </div>
          <div className={LoginCSS.row}>
            <Input type="password" name="password" placeholder="Password" onChange={handleCredentialsChange} />
          </div>
          <div className={LoginCSS.row}>
            <button onClick={handleCredentialsClick}>ASD</button>
          </div>
        </form>
      </div>
    </div>
  );
};
