import React from "react";
import InputCSS from "../Input/Input.module.css";

const Input = (props) => {
    return (
        <input
            type={props.type}
            name={props.name}
            placeholder={props.placeholder}
            className={InputCSS.input}
            onChange={props.onChange}
        />
    );
};

export default Input;
