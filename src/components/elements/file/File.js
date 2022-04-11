import React from "react";
import FileCSS from "./File.module.css";

const File = (props) => {
    return (
        <div className={FileCSS.container}>
            <button onClick={props.onClick}>Choose</button>
            <input
                type="file"
                ref={props.input}
                onChange={props.onChange}
                className={FileCSS.input}
                accept="image/*"
            />
            <label>{props.name}</label>
        </div>
    );
};

export default File;
