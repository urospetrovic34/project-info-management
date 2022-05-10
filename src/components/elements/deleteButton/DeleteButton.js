import React from 'react';
import DeleteButtonCSS from "../deleteButton/DeleteButton.module.css"
import { FaTrash } from 'react-icons/fa';

const DeleteButton = (props) => {
    return (
        <button
            className={DeleteButtonCSS.btn}
            type={props.type}
            onClick={props.onClick}
            value={props.value}
            style={props.style}
        >
            <FaTrash className={DeleteButtonCSS.trash}></FaTrash>
        </button>
    )
}

export default DeleteButton;