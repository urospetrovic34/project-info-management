import React from "react";
import LabelCSS from "./Label.module.css";

const Label = (props) => {
    return (
        <p className={props.style}>{props.text}{props.required && <span className={LabelCSS.required}> *</span>}{props.errorMessage && <span> - {props.errorMessage}</span>}</p>
    );
};

export default Label;
