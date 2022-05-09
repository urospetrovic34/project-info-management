import React, { useEffect } from "react";
import File from "./File";
import FileCSS from "./File.module.css";

export const AttachFiles = (props) => {
    return (
        <div className={FileCSS.attach_container}>
            {Array.from(props.files.entries()).map((entry) => (
                <File
                    key={entry[0]}
                    id={entry[0]}
                    name={entry[1].name}
                    size={entry[1].size}
                    removeFile={props.removeFile}
                />
            ))}
        </div>
    );
};
