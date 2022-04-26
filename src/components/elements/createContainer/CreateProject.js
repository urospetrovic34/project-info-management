import React, { useState, useEffect } from "react";
import Button from "../button/Button";
import Input from "../input/Input";
import CreateCSS from "./CreateProject.module.css";
import CardMembers from "../cards/CardMembers";
import projectHooks from "../../../hooks/query/project";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthProvider";
import axios from "../../../config/axiosConfig";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";
import AsyncSearchBar from "../searchBar/AsyncSearchBar";

const CreateProject = (props) => {
  // const btnAddStyle = {
  //   backgroundColor: "transparent",
  //   color: "black",
  //   border: "1px solid lightgray",
  //   marginLeft: "10px",
  // };
  const btnSaveStyle = {
    backgroundColor: "#319795",
    color: "white",
    border: "1px solid lightgray",
    fontWeight: "600",
  };
  const navigate = useNavigate();
  // const [authState] = useAuth();
  // const { user } = authState;

  const createProjectMutation = projectHooks.useCreateProjectMutation();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [logoRes, setLogoRes] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [collabs, setCollabs] = useState("");
  const employees = [];

  useEffect(() => {
    if (collabs) {
      collabs.forEach((collab) => {
        employees.push(collab.id);
      });
    }
  }, [collabs]);

  const handleButton = (event) => {
    event.preventDefault();
    const data = { name, description, logo: logoRes, employees };
    createProjectMutation.mutate({ data });
    navigate("/");
  };
  console.log(collabs);

  const handleFileChange = (event) => {
    event.preventDefault();
    const files = event.target.files[0];
    const formData = new FormData();
    formData.append("files", files);
    uploadFile(formData);
    setIsLoading(true);
  };

  const uploadFile = async (formData) => {
    let response;
    await axios
      .post(`/api/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        response = res.data;
        setLogoRes(res.data[0].id);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        return err;
      });
    return response;
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
            <Input
              type={"file"}
              name={"filePicker"}
              id={"filePicker"}
              style={{ display: "none" }}
              onChange={handleFileChange}
              disabled={isLoading}
            />
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
            {/* <Button value={"ADD"} text={"ADD"} style={btnAddStyle} /> */}
          </div>
          <AsyncSearchBar setCollabs={setCollabs} />
          {collabs && <CardMembers membersInfo={collabs} />}
          <div className={CreateCSS.buttonWrapper}>
            <Link to="/">
              <Button value={"Back"} text={"BACK"} style={btnSaveStyle} />
            </Link>
            <Button value={"Save"} onClick={handleButton} text={"SAVE"} style={btnSaveStyle} />
          </div>
        </div>
      </div>
      {isLoading ? <LoadingSpinner /> : null}
    </div>
  );
};

export default CreateProject;

//
