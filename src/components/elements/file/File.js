import React from "react";
import FileCSS from "./File.module.css";
import { GiCancel } from "react-icons/gi";

const File = (props) => {
    return (
        <div className={FileCSS.card}>
            <div className={FileCSS.card_col_one}>
                <p>{props.name}</p>
                <p className={FileCSS.size}>{(props.size/1024).toFixed(2)} KB</p>
            </div>
            <div className={FileCSS.card_col_two}>
                <GiCancel className={FileCSS.remove} onClick={() => props.removeFile(props.id)}/>
            </div>
        </div>
    );
};

export default File;
