import React from "react";
import PropTypes from "prop-types";
import "../../styles/Input.css";


/**
 * @typedef {object} Props
 * @property {"text" | "password"} [type="text"] - Input type.
 * @property {boolean} [disabled=false] - Whether the input is disabled.
 * @property {string} [className] - Additional classes to pass onto Input.
 * @property {...any} [props] - Rest of the props.
 */

/**
 * Simple input.
 *
 * @type {React.ForwardRefExoticComponent<React.PropsWithoutRef<Props> & React.RefAttributes<unknown>>}
 */
const Input = React.forwardRef(
    ({ type = "text", disabled = false, className, ...props }, ref) => {

        return (
            <input
                ref={ref}
                type={type}
                disabled={disabled}
                className="input"
                {...props}
            />
        );
    }
);

Input.propTypes = {
    type: PropTypes.oneOf(["text", "password"]),
    disabled: PropTypes.bool,
    className: PropTypes.string,
};

Input.displayName = "Input";

export default Input;