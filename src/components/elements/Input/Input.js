import React from 'react';
import InputCSS from "../Input/Input.module.css";


const Input = () => {
    return (
        <input type="text" placeholder="Search projects" className={InputCSS.input} />
    )
}

export default Input;