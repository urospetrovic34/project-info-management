import React, { useState } from "react";
import FileModalCSS from "./FileModal.module.css";
import { Document, Page, pdfjs } from "react-pdf";
import { AiOutlineClose, AiOutlineDownload } from "react-icons/ai";
import { saveAs } from "file-saver";
import { Link } from "react-router-dom";

export const FileModal = (props) => {
  const [numPages, setNumPages] = useState(null);
  const [zoomValue, setZoomValue] = useState(1);
  console.log(props.file);

  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const handleZoom = () => {
    if (zoomValue !== 1) {
      setZoomValue(1);
    } else {
      setZoomValue(1.5);
    }
  };

  const handleDownload = () => {
    saveAs(props.file.attributes.url, props.file.attributes.caption);
  };

  return (
    <div className={FileModalCSS.wrapper}>
      <div className={FileModalCSS.button_container}>
        <AiOutlineDownload className={FileModalCSS.button} onClick={handleDownload} />
        <AiOutlineClose className={FileModalCSS.button} onClick={props.onClick} />
      </div>
      {props.file.attributes.ext === ".pdf" ? (
        <div className={FileModalCSS.pdf_container} onClick={handleZoom}>
          <Document
            file={props.file.attributes.url}
            options={{ workerSrc: "/pdf.worker.js" }}
            onLoadSuccess={onDocumentLoadSuccess}
            className={FileModalCSS.pdf_container}
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} scale={zoomValue} />
            ))}
          </Document>
        </div>
      ) : props.file.attributes.mime.split("/")[0] === "image" ? (
        <div className={FileModalCSS.image_container}>
          <img src={props.file.attributes.formats.small.url} alt="#" />
        </div>
      ) : props.file.attributes.mime.split("/")[0] === "video" ? (
        <div className={FileModalCSS.video_contaienr}>
          <video width="1000" controls>
            <source src={props.file.attributes.url} type={props.file.attributes.mime} />
          </video>
        </div>
      ) : props.file.attributes.mime.split("/")[0] === "audio" ? (
        <div className={FileModalCSS.audio_container}>
          <audio controls>
            <source src={props.file.attributes.url} type={props.file.attributes.mime} />
          </audio>
        </div>
      ) : (
        <p className={FileModalCSS.surprise}>ZA TEBE IMA 8=======================D</p>
      )}
    </div>
  );
};
