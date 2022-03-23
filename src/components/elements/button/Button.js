import React from 'react';
import ButtonCSS from "../button/Button.module.css";

const Button = (props) => {
    return (
        <button
            className={ButtonCSS.btn}
            type={props.type}
            onClick={props.onClick}
            value={props.value}>
            New Project
        </button>

    )
}

export default Button;