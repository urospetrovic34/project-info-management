import React, { useState } from "react";
import FilePreviewCSS from "./FilePreview.module.css";
import Audio from "../../../assets/audioIcon700.jpg";
import File from "../../../assets/file.jpg";
import { FileModal } from "../fileModal/FileModal";

export const FilePreview = (props) => {
    console.log(props.type)
    return (
        <div className={FilePreviewCSS.container} onClick={props.onClick}>
            <img
                className={FilePreviewCSS.preview}
                src={
                    props.type === "audio"
                        ? Audio
                        : props.type === "video"
                        ? props.previewUrl
                        : props.type === "application" || props.type === "text"
                        ? File
                        : props.thumbnail
                }
                alt="#"
            />
            <div className={FilePreviewCSS.title}>
                <p>{props.caption}</p>
            </div>
        </div>
    );
};
