import React from "react";
import FileCSS from "./File.module.css";

export const FileButton = (props) => {
    console.log(props);
    return (
        <div className={FileCSS.container}>
            <button className={props.avatar ? FileCSS.avatar : props.project ? FileCSS.project : FileCSS.button} onClick={props.onClick}>
                {props.placeholder ? props.placeholder : "Choose"}
            </button>
            <input
                type="file"
                ref={props.input}
                onChange={props.onChange}
                className={FileCSS.input}
                multiple
            />
        </div>
    );
};
