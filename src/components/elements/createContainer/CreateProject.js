import React from "react";
import Button from "../button/Button";
import Input from "../input/Input";
import CreateCSS from "./CreateProject.module.css";
import CardMembers from "../cards/CardMembers";

const CreateProject = () => {
  const btnStyle = {
    backgroundColor: "transparent",
    color: "black",
    border: "1px solid lightgray",
    marginLeft: "10px",
  };
  return (
    <div className={CreateCSS.container}>
      <div className={CreateCSS.contentContainer}>
        <div className={CreateCSS.projectInfoHeader}>
          <h2 className={CreateCSS.header}>Project Info</h2>
        </div>
        <div className={CreateCSS.projectInfo}>
          <div className={CreateCSS.inputContainer}>
            <div className={CreateCSS.labelInputWrapper}>
              <label for="projectName" className={CreateCSS.label}>
                Project Name
              </label>
              <Input type={"text"} name={"projectName"} placeholder={"Project name..."} id={"projectName"} />
            </div>
            <label htmlFor="filePicker" className={CreateCSS.file}>
              Choose Project Logo
            </label>
            <Input type={"file"} name={"filePicker"} id={"filePicker"} style={{ display: "none" }} />
          </div>
          <div className={CreateCSS.textAreaContainer}>
            <label for="projectDescription" className={CreateCSS.label}>
              Project Description
            </label>
            <textarea
              id="projectDescription"
              name="projectDescription"
              rows="4"
              cols="50"
              placeholder="Project Description..."
              className={CreateCSS.textarea}
            ></textarea>
          </div>
        </div>
        <div className={CreateCSS.membersHeader}>
          <h2 className={CreateCSS.header}>Members</h2>
        </div>
        <div className={CreateCSS.membersInfo}>
          <div className={CreateCSS.inputContainer}>
            <Input type={"text"} name={"findEmployee"} placeholder={"Find Employee..."} id={"findEmployee"} />
            <Button value={"ADD"} text={"ADD"} style={btnStyle} />
          </div>
          <CardMembers />
          <CardMembers />
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
