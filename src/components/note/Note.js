import React, { useState } from "react";
import NoteCSS from "./Note.module.css";
import { AiOutlineClose } from "react-icons/ai";
import { FilePreview } from "../elements/filePreview/FilePreview";
import { FileModal } from "../elements/fileModal/FileModal";
import { saveAs } from "file-saver";

export const Note = (props) => {
    console.log(props.note);
    const [modalCheck, setModalCheck] = useState(false);
    const [file, setFile] = useState({});
    const [allFiles, setAllFiles] = useState(
        props.note.files.filter(
            (file) => file.provider_metadata.resource_type !== "raw"
        )
    );

    const handleModal = (data) => {
        setFile(data);
        setModalCheck((modalCheck) => !modalCheck);
    };

    const handleDownload = (data) => {
        saveAs(data.url, data.caption);
    };

    return (
        <div className={NoteCSS.wrapper}>
            {modalCheck && (
                <FileModal
                    file={file}
                    allFiles={allFiles}
                    onClick={handleModal}
                    note={props.note}
                />
            )}
            <div className={NoteCSS.container}>
                <div className={NoteCSS.row}>
                    <div className={NoteCSS.title_container}>
                        <h4>{props.note.title}</h4>
                    </div>
                    <div
                        className={NoteCSS.exit_container}
                        onClick={props.onClick}
                    >
                        <AiOutlineClose className={NoteCSS.exit_button} />
                    </div>
                </div>
                <div className={NoteCSS.row}>
                    <div className={NoteCSS.project_container}>
                        <p className={NoteCSS.subheaders}>
                            Project:{" "}
                            <span className={NoteCSS.subheadersInfo}>
                                {" "}
                                {props.note.project.name}
                            </span>
                        </p>
                    </div>
                    <div className={NoteCSS.category_container}>
                        <p>{props.note.category.name}</p>
                    </div>
                </div>
                <div className={NoteCSS.row}>
                    <div className={NoteCSS.description_container}>
                        <p className={NoteCSS.description_container_title}>
                            Description:
                        </p>
                        <div className={NoteCSS.description_container_text}>
                            <p>
                                {props.note.description
                                    ? props.note.description
                                    : "No description available"}
                            </p>
                        </div>
                    </div>
                </div>
                <div className={NoteCSS.row_center}>
                    <div className={NoteCSS.file_container}>
                        {props.note.files &&
                            props.note.files.map((file) => (
                                <FilePreview
                                    caption={file.caption}
                                    extension={file.ext}
                                    previewUrl={file.previewUrl}
                                    type={file.mime.split("/")[0]}
                                    thumbnail={file.formats?.thumbnail.url}
                                    url={file.url}
                                    key={file.id}
                                    onClick={() =>
                                        file.provider_metadata.resource_type ===
                                        "raw"
                                            ? handleDownload(file)
                                            : handleModal(file)
                                    }
                                />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
