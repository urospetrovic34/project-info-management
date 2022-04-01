import React from "react";
import DefaultSelect from "react-select";
import { customStyles } from "./customStyles";
import SelectCSS from "./Select.module.css";

export const Select = (props) => {
  return (
    <DefaultSelect
      defaultValue={props.defaultValue}
      className={SelectCSS.custom_select}
      styles={customStyles}
      options={props.options}
      onChange={props.onChange}
      isMulti={props.multi}
      placeholder={props.placeholder}
    />
  );
};
