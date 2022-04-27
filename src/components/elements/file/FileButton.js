import React from 'react'
import FileCSS from "./File.module.css";

export const FileButton = (props) => {
console.log(props)
  return (
    <div className={FileCSS.container}>
        <button className={FileCSS.button} onClick={props.onClick}>Choose</button>
        <input
            type="file"
            ref={props.input}
            onChange={props.onChange}
            className={FileCSS.input}
            multiple
        />
    </div>
  )
}
