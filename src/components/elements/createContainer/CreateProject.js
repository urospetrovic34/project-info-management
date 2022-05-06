import React, { useState, useEffect, useRef, useMemo } from "react";
import Button from "../button/Button";
import Input from "../input/Input";
import CreateCSS from "./CreateProject.module.css";
import CardMembers from "../cards/CardMembers";
import Photo from "../../../assets/photo.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthProvider";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";
import AsyncSearchBar from "../searchBar/AsyncSearchBar";
import { FileButton } from "../file/FileButton";
import UploadAPI from "../../../actions/upload";
import ProjectAPI from "../../../actions/project";
import { useMutation, queryClient } from "react-query";

const CreateProject = (props) => {
    const btnSaveStyle = {
        backgroundColor: "#319795",
        color: "white",
        border: "1px solid lightgray",
        fontWeight: "600",
    };
    const navigate = useNavigate();
    const [authState, authDispatch] = useAuth();

    const [credentials, setCredentials] = useState({
        name: "",
        description: "",
        logo: null,
        image: null,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [members, setMembers] = useState([]);

    console.log(members);

    const input = useRef(null);
    const fileReader = new FileReader();

    const handleUpdateCollabs = (id) => {
        setMembers((members) => members.filter((_, index) => index !== id));
    };

    const handleCredentialsChange = (event) => {
        event.preventDefault();
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value,
        });
    };

    const mutationLogo = useMutation(
        (files) => {
            return UploadAPI.create(files);
        },
        {
            onMutate: async () => {
                setIsLoading(true);
            },
            onSuccess: (response) => {
                const employees = Array.from(
                    members.map((member) => member.id)
                );
                employees.push(authState.user.id);
                let data = {
                    name: credentials.name,
                    description: credentials.description,
                    employees: employees,
                    logo: response[0].id,
                };
                mutationProject.mutate({ data: data });
            },
        }
    );

    const mutationProject = useMutation(
        (data) => {
            return ProjectAPI.create(data);
        },
        {
            onMutate: async () => {
                setIsLoading(true);
            },
            onSuccess: (response) => {
                setIsLoading(false);
                navigate("/");
            },
        }
    );

    const handleMembersChange = (value) => {
        console.log(members);
        setMembers((members) => [...members, value]);
        setMembers((members) =>
            members.filter(
                (value, index, self) =>
                    index === self.findIndex((member) => member.id === value.id)
            )
        );
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

    const handleButton = (event) => {
        event.preventDefault();
        console.log();
        if (credentials.logo) {
            mutationLogo.mutate(credentials.logo);
        } else {
            const employees = Array.from(members.map((member) => member.id));
            employees.push(authState.user.id);
            mutationProject.mutate({
                data: {
                    name: credentials.name,
                    description: credentials.description,
                    employees: employees,
                },
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
                                        name="name"
                                        placeholder="Project Name"
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
                            name="description"
                            rows="4"
                            cols="50"
                            placeholder="Description..."
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
                    <AsyncSearchBar onChange={handleMembersChange} />
                    <div className={CreateCSS.employee_container}>
                        {members.length > 0 ? (
                            members.map((member) => (
                                <CardMembers
                                    key={member.id}
                                    member={member}
                                    updateMembers={handleUpdateCollabs}
                                    index={members.indexOf(member)}
                                />
                            ))
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
