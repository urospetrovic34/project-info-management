import React from "react";
import CheckboxCSS from "./Checkbox.module.css";

export const Checkbox = (props) => {
    return (
        <div>
            <label htmlFor={props.id} className={CheckboxCSS.label}>
                <input
                    id={props.id}
                    type="checkbox"
                    value={props.value}
                    className={CheckboxCSS.checkbox}
                    checked={props.checked}
                    onChange={props.onChange}
                />
                {props.text}
            </label>
        </div>
    );
};
