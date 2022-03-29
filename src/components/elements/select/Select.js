import React from "react";
import DefaultSelect from "react-select";
import { customStyles } from "./customStyles";
import SelectCSS from "./Select.module.css";

export const Select = (props) => {
    return (
        <div>
            <DefaultSelect
                defaultValue={props.options[0]}
                className={SelectCSS.custom_select}
                styles={customStyles}
                options={props.options}
                onChange={props.handleSelectChange}
            />
        </div>
    );
};
