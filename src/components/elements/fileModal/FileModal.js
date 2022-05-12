import React, { useState, useEffect } from "react";
import FileModalCSS from "./FileModal.module.css";
import { Document, Page, pdfjs } from "react-pdf";
import {
    AiOutlineClose,
    AiOutlineDownload,
    AiOutlineArrowLeft,
    AiOutlineArrowRight,
} from "react-icons/ai";
import { saveAs } from "file-saver";
import { Link } from "react-router-dom";

export const FileModal = (props) => {
    const [numPages, setNumPages] = useState(null);
    const [zoomValue, setZoomValue] = useState(1);
    const [currentFile, setCurrentFile] = useState(props.file);

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
        saveAs(currentFile.url, currentFile.caption);
    };

    const handleArrowLeft = () => {
        const index = props.allFiles.findIndex(
            (file) => file.id === currentFile.id
        );
        if (index > 0) {
            setCurrentFile(props.allFiles[index - 1]);
        }
    };

    const handleArrowRight = () => {
        const index = props.allFiles.findIndex(
            (file) => file.id === currentFile.id
        );
        if (index < props.allFiles.length - 1) {
            setCurrentFile(props.allFiles[index + 1]);
        }
    };

    return (
        <div className={FileModalCSS.wrapper}>
            <div className={FileModalCSS.button_container}>
                <AiOutlineDownload
                    className={FileModalCSS.button}
                    onClick={handleDownload}
                />
                <AiOutlineClose
                    className={FileModalCSS.button}
                    onClick={props.onClick}
                />
            </div>
            {props.allFiles.findIndex((file) => file.id === currentFile.id) >
                0 && props.allFiles.length > 1 ? (
                <div className={FileModalCSS.arrow_container}>
                    <AiOutlineArrowLeft
                        className={FileModalCSS.button}
                        onClick={handleArrowLeft}
                    />
                </div>
            ) : (
                <div className={FileModalCSS.arrow_container}></div>
            )}
            <div className={FileModalCSS.central_container}>
                {currentFile.ext === ".pdf" ? (
                    <div
                        className={FileModalCSS.pdf_container}
                        onClick={handleZoom}
                    >
                        <Document
                            file={currentFile.url}
                            options={{ workerSrc: "/pdf.worker.js" }}
                            onLoadSuccess={onDocumentLoadSuccess}
                            className={FileModalCSS.pdf_container}
                        >
                            {Array.from(new Array(numPages), (el, index) => (
                                <Page
                                    key={`page_${index + 1}`}
                                    pageNumber={index + 1}
                                    scale={zoomValue}
                                />
                            ))}
                        </Document>
                    </div>
                ) : currentFile.mime.split("/")[0] === "image" ? (
                    <div className={FileModalCSS.image_container}>
                        <img src={currentFile.url} alt="#" />
                    </div>
                ) : currentFile.mime.split("/")[0] === "video" ? (
                    <div className={FileModalCSS.video_contaienr}>
                        <video width="1000" controls>
                            <source
                                src={currentFile.url}
                                type={currentFile.mime}
                            />
                        </video>
                    </div>
                ) : currentFile.mime.split("/")[0] === "audio" ? (
                    <div className={FileModalCSS.audio_container}>
                        <audio controls>
                            <source
                                src={currentFile.url}
                                type={currentFile.mime}
                            />
                        </audio>
                    </div>
                ) : (
                    <p className={FileModalCSS.surprise}>"EMPTY"</p>
                )}
            </div>
            {props.allFiles.findIndex((file) => file.id === currentFile.id) <
                props.allFiles.length - 1 && props.allFiles.length > 1 ? (
                <div className={FileModalCSS.arrow_container}>
                    <AiOutlineArrowRight
                        className={FileModalCSS.button}
                        onClick={handleArrowRight}
                    />
                </div>
            ) : (
                <div className={FileModalCSS.arrow_container}></div>
            )}
        </div>
    );
};
