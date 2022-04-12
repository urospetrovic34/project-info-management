import React from 'react'
import NoteCSS from './Note.module.css'
import { AiOutlineClose } from "react-icons/ai";

export const Note = (props) => {
  console.log(props.note)
  return (
    <div className={NoteCSS.wrapper}>
        <div className={NoteCSS.container}>
          <div className={NoteCSS.row}>
            <div className={NoteCSS.title_container}>
              <p>{props.note.attributes.title}</p>
            </div>
            <div className={NoteCSS.exit_container}>
              <AiOutlineClose/>
            </div>
          </div>
          <div className={NoteCSS.row}>
            <div className={NoteCSS.project_container}>
              <p>Project: {props.note.attributes.project.data.attributes.name}</p>
            </div>
            <div className={NoteCSS.category_container}>
              <p>{props.note.attributes.category.data.attributes.name}</p>
            </div>
          </div>
          <div className={NoteCSS.row}>
            <div className={NoteCSS.description_container}>
              <p>Description:</p>
              <p>{props.note.attributes.description}</p>
            </div>
          </div>
          <div className={NoteCSS.row}>
            <div className={NoteCSS.file_container}>

            </div>
          </div>
        </div>
    </div>
  )
}
