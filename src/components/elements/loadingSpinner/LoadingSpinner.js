import React from "react";
import LoadingCSS from "./LoadingSpinner.module.css";

export default function LoadingSpinner() {
  return (
    <div className={LoadingCSS.spinner_container}>
      <div className={LoadingCSS.loading_spinner}></div>
    </div>
  );
}
