import React, { useState, useEffect } from "react";
import Button from "../button/Button";
import Input from "../input/Input";
import CreateCSS from "./CreateProject.module.css";
import CardMembers from "../cards/CardMembers";
import projectHooks from "../../../hooks/query/project";

const CreateProject = () => {
  const btnAddStyle = {
    backgroundColor: "transparent",
    color: "black",
    border: "1px solid lightgray",
    marginLeft: "10px",
  };
  const btnSaveStyle = {
    backgroundColor: "#319795",
    color: "white",
    border: "1px solid lightgray",
    fontWeight: "600",
  };
  const createProjectMutation = projectHooks.useCreateProjectMutation();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState("");

  const [data, setData] = useState({});

  const handleButton = (event) => {
    event.preventDefault();
    createProjectMutation.mutate({ data });
    console.log(data);
  };
  useEffect(() => {
    setData({ name: name, description: description, logo: "3" });
    console.log(data);
  }, []);

  return (
    <div className={CreateCSS.container}>
      <div className={CreateCSS.contentContainer}>
        <div className={CreateCSS.projectInfoHeader}>
          <h2 className={CreateCSS.header}>Project Info</h2>
        </div>
        <div className={CreateCSS.projectInfo}>
          <div className={CreateCSS.inputContainer}>
            <div className={CreateCSS.labelInputWrapper}>
              <label htmlFor="projectName" className={CreateCSS.label}>
                Project Name
              </label>
              <Input
                type={"text"}
                name={"projectName"}
                placeholder={"Project name..."}
                id={"projectName"}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <label htmlFor="filePicker" className={CreateCSS.file}>
              Choose Project Logo
            </label>
            <Input type={"file"} name={"filePicker"} id={"filePicker"} style={{ display: "none" }} />
          </div>
          <div className={CreateCSS.textAreaContainer}>
            <label htmlFor="projectDescription" className={CreateCSS.label}>
              Project Description
            </label>
            <textarea
              id="projectDescription"
              name="projectDescription"
              rows="4"
              cols="50"
              placeholder="Project Description..."
              className={CreateCSS.textarea}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></textarea>
          </div>
        </div>
        <div className={CreateCSS.membersHeader}>
          <h2 className={CreateCSS.header}>Members</h2>
        </div>
        <div className={CreateCSS.membersInfo}>
          <div className={CreateCSS.inputContainer}>
            <Input type={"text"} name={"findEmployee"} placeholder={"Find Employee..."} id={"findEmployee"} />
            <Button value={"ADD"} text={"ADD"} style={btnAddStyle} />
          </div>
          <CardMembers />
          <CardMembers />
          <div className={CreateCSS.buttonWrapper}>
            <Button value={"Save"} onClick={handleButton} text={"SAVE"} style={btnSaveStyle} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
