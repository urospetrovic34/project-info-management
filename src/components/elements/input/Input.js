import React from "react";
import InputCSS from "../input/Input.module.css";

const Input = (props) => {
    return (
        <input
            type={props.type}
            name={props.name}
            placeholder={props.placeholder}
            defaultValue={props.value}
            className={`${InputCSS.input} ${props.error && InputCSS.error}`}
            onChange={props.onChange}
            id={props.id}
            style={props.style}
        />
    );
};

export default Input;
