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
    props.note.attributes.files.data.filter((file) => file.attributes.provider_metadata.resource_type !== "raw")
  );

  const handleModal = (data) => {
    setFile(data);
    setModalCheck((modalCheck) => !modalCheck);
  };

  const handleDownload = (data) => {
    saveAs(data.attributes.url, data.attributes.caption);
  };

  return (
    <div className={NoteCSS.wrapper}>
      {modalCheck && <FileModal file={file} allFiles={allFiles} note={props.note} onClick={handleModal} />}
      <div className={NoteCSS.container}>
        <div className={NoteCSS.row}>
          <div className={NoteCSS.title_container}>
            <h4>{props.note.attributes.title}</h4>
          </div>
          <div className={NoteCSS.exit_container} onClick={props.onClick}>
            <AiOutlineClose className={NoteCSS.exit_button} />
          </div>
        </div>
        <div className={NoteCSS.row}>
          <div className={NoteCSS.project_container}>
            <p className={NoteCSS.subheaders}>
              Project:{" "}
              <span className={NoteCSS.subheadersInfo}> {props.note.attributes.project.data.attributes.name}</span>
            </p>
          </div>
          <div className={NoteCSS.category_container}>
            <p>{props.note.attributes.category.data.attributes.name}</p>
          </div>
        </div>
        <div className={NoteCSS.row}>
          <div className={NoteCSS.description_container}>
            <p className={NoteCSS.description_container_title}>Description:</p>
            <div className={NoteCSS.description_container_text}>
              <p>
                {props.note.attributes.description ? props.note.attributes.description : "No description available"}
              </p>
            </div>
          </div>
        </div>
        <div className={NoteCSS.row_center}>
          <div className={NoteCSS.file_container}>
            {props.note.attributes.files.data &&
              props.note.attributes.files.data.map((file) => (
                <FilePreview
                  caption={file.attributes.caption}
                  extension={file.attributes.ext}
                  previewUrl={file.attributes.previewUrl}
                  type={file.attributes.mime.split("/")[0]}
                  thumbnail={file.attributes.formats?.thumbnail.url}
                  url={file.attributes.url}
                  key={file.id}
                  onClick={() =>
                    file.attributes.provider_metadata.resource_type === "raw" ? handleDownload(file) : handleModal(file)
                  }
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
