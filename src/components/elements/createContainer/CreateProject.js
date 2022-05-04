import React, { useState, useEffect, useRef, useMemo } from "react";
import Button from "../button/Button";
import Input from "../input/Input";
import CreateCSS from "./CreateProject.module.css";
import CardMembers from "../cards/CardMembers";
import projectHooks from "../../../hooks/query/project";
import userHooks from "../../../hooks/query/user";
import Photo from "../../../assets/photo.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthProvider";
import axios from "../../../config/axiosConfig";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";
import AsyncSearchBar from "../searchBar/AsyncSearchBar";
import { FileButton } from "../file/FileButton";
import { Select } from "../select/Select";

const CreateProject = (props) => {
    const btnSaveStyle = {
        backgroundColor: "#319795",
        color: "white",
        border: "1px solid lightgray",
        fontWeight: "600",
    };
    const navigate = useNavigate();

    const users = userHooks.useUsersRegular();
    console.log(users);
    const userOptions = useMemo(
        () =>
            users.data?.map((user) => {
                return { value: user.id, label: "user.name" };
            }),
        [users.data]
    );

    const [credentials, setCredentials] = useState({
        name: "",
        description: "",
        logo: null,
        image: null,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [collabs, setCollabs] = useState("");
    const employees = [];
    const [upload, setUpload] = useState();

    const input = useRef(null);
    const fileReader = new FileReader();

    const createProjectMutation = projectHooks.useCreateProjectMutation();

    useEffect(() => {
        if (collabs) {
            collabs.forEach((collab) => {
                employees.push(collab.id);
            });
        }
        console.log(employees);
    }, [collabs]);

    const handleButton = (event) => {
        event.preventDefault();
        // const data = { name, description, logo: logoRes, employees };
        // createProjectMutation.mutate({ data });
        navigate("/");
    };

    const handleCredentialsChange = (event) => {
        event.preventDefault();
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value,
        });
    };

    const getOneUpload = async (id) => {
        let response;
        await axios
            .get(`/api/upload/files/${id}`)
            .then((res) => {
                response = res.data;
                setUpload(res.data);
                console.log(res.data);
            })
            .catch((err) => {
                return err;
            });
        return response;
    };

    const handleFileClick = (event) => {
        event.preventDefault();
        input.current.click();
    };

    const handleFileChange = (event) => {
        event.preventDefault();
        if (event.target.files[0] !== undefined) {
            const fileUploaded = event.target.files[0];
            const formData = new FormData();
            formData.append("files", fileUploaded);
            fileReader.readAsDataURL(fileUploaded);
            fileReader.onload = function () {
                setCredentials({
                    ...credentials,
                    logo: formData,
                    image: fileReader.result,
                });
            };
        } else {
            setCredentials({
                ...credentials,
                logo: null,
                image: null,
            });
        }
    };

    return (
        <div className={CreateCSS.container}>
            <div className={CreateCSS.contentContainer}>
                <div className={CreateCSS.projectInfo}>
                    <div className={CreateCSS.inputContainer}>
                        <div>
                            <div className={CreateCSS.projectInfoHeader}>
                                <h2 className={CreateCSS.header}>
                                    Project Info
                                </h2>
                            </div>
                            <div className={CreateCSS.row}>
                                <div className={CreateCSS.labelInputWrapper}>
                                    <label
                                        htmlFor="projectName"
                                        className={CreateCSS.label}
                                    >
                                        Project Name
                                    </label>
                                    <Input
                                        type="text"
                                        name="projectName"
                                        placeholder="Project name..."
                                        id="projectName"
                                        onChange={handleCredentialsChange}
                                    />
                                </div>
                                <FileButton
                                    project={true}
                                    input={input}
                                    placeholder="Choose Project Logo"
                                    onClick={handleFileClick}
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>
                        <div>
                            <div className={CreateCSS.uploadPreview}>
                                <img
                                    src={
                                        credentials.image
                                            ? credentials.image
                                            : Photo
                                    }
                                    alt="uploadPhoto"
                                    onClick={handleFileClick}
                                    className={CreateCSS.imgPreview}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={CreateCSS.textAreaContainer}>
                        <label
                            htmlFor="projectDescription"
                            className={CreateCSS.label}
                        >
                            Project Description
                        </label>
                        <textarea
                            id="projectDescription"
                            name="projectDescription"
                            rows="4"
                            cols="50"
                            placeholder="Project Description..."
                            className={CreateCSS.textarea}
                            onChange={handleCredentialsChange}
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
                    <div className={CreateCSS.employee_container}>
                        {collabs ? (
                            <CardMembers membersInfo={collabs} />
                        ) : (
                            <span>No members added</span>
                        )}
                    </div>
                    <div className={CreateCSS.buttonWrapper}>
                        <Link to="/">
                            <Button
                                value={"Back"}
                                text={"BACK"}
                                style={btnSaveStyle}
                            />
                        </Link>
                        <Button
                            value={"Save"}
                            onClick={handleButton}
                            text={"SAVE"}
                            style={btnSaveStyle}
                        />
                    </div>
                </div>
            </div>
            {isLoading ? <LoadingSpinner /> : null}
        </div>
    );
};

export default CreateProject;

//
