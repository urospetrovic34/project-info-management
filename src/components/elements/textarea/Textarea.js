import React from "react";
import TextareaCSS from "./Textarea.module.css";

export const Textarea = (props) => {
    return (
        <div>
            <textarea
                className={TextareaCSS.textarea}
                name={props.name}
                placeholder={props.placeholder}
                rows={props.rows}
                onChange={props.onChange}
            ></textarea>
        </div>
    );
};
