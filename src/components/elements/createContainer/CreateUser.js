import React, { useState, useEffect, useRef, useMemo } from "react";
import Button from "../button/Button";
import Input from "../input/Input";
import CreateCSS from "./CreateProject.module.css";
import Photo from "../../../assets/photo.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthProvider";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";
import { FileButton } from "../file/FileButton";
import UploadAPI from "../../../actions/upload";
import UserAPI from "../../../actions/user";
import { useMutation } from "react-query";
import { Select } from "../select/Select";
import userHooks from "../../../hooks/query/user";

const CreateUser = (props) => {
    const btnSaveStyle = {
        backgroundColor: "#319795",
        color: "white",
        fontWeight: "600",
    };
    const navigate = useNavigate();
    const [authState, authDispatch] = useAuth();
    const count = userHooks.useCountUsers();

    const [credentials, setCredentials] = useState({
        name: "",
        surname: "",
        description: "",
        username: "",
        email: "",
        role: 34,
        confirmed: true,
        logo: null,
        image: null,
    });
    console.log(credentials);
    const roleOptions = [
        { value: 34, label: "Employee" },
        { value: 35, label: "Project Manager" },
    ];
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
                let data = {
                    name: credentials.name,
                    surname: credentials.surname,
                    description: credentials.description,
                    email: credentials.email,
                    username:
                        credentials.name.toLowerCase() +
                        credentials.surname.toLowerCase() +
                        count.data,
                    password: credentials.password,
                    role: credentials.role,
                    confirmed: credentials.confirmed,
                    avatar: response[0].id,
                };
                console.log(data);
                mutationUser.mutate(data);
            },
        }
    );

    const mutationUser = useMutation(
        (data) => {
            console.log(data);
            return UserAPI.create(data);
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
            mutationUser.mutate({
                name: credentials.name,
                surname: credentials.surname,
                description: credentials.description,
                email: credentials.email,
                username:
                    credentials.name.toLowerCase() +
                    credentials.surname.toLowerCase() +
                    count.data,
                password: credentials.password,
                role: credentials.role,
                confirmed: credentials.confirmed,
            });
        }
    };

    const handleRoleChange = (event) => {
        setCredentials({ ...credentials, role: event.value });
    };

    return (
        <div className={CreateCSS.container}>
            <div className={CreateCSS.contentContainer}>
                <div className={CreateCSS.projectInfo}>
                    <div className={CreateCSS.inputContainer}>
                        <div>
                            <div className={CreateCSS.projectInfoHeader}>
                                <h2 className={CreateCSS.header}>
                                    Create New User
                                </h2>
                            </div>
                            <div className={CreateCSS.row}>
                                <div className={CreateCSS.labelInputWrapper}>
                                    <label
                                        htmlFor="firstName"
                                        className={CreateCSS.label}
                                    >
                                        First Name
                                    </label>
                                    <Input
                                        type="text"
                                        name="name"
                                        placeholder="First Name"
                                        id="firstName"
                                        onChange={handleCredentialsChange}
                                    />
                                </div>
                                <div className={CreateCSS.labelInputWrapper}>
                                    <label
                                        htmlFor="lastName"
                                        className={CreateCSS.label}
                                    >
                                        Last Name
                                    </label>
                                    <Input
                                        type="text"
                                        name="surname"
                                        placeholder="Last Name"
                                        id="lastName"
                                        onChange={handleCredentialsChange}
                                    />
                                </div>
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
                    <div className={CreateCSS.row}>
                        <div className={CreateCSS.labelInputWrapperEmail}>
                            <label htmlFor="email" className={CreateCSS.label}>
                                Email
                            </label>
                            <Input
                                type="text"
                                name="email"
                                placeholder="Email"
                                id="email"
                                onChange={handleCredentialsChange}
                            />
                        </div>
                        <div className={CreateCSS.fileButtonContainer}>
                            <FileButton
                                className={CreateCSS.fileButton}
                                multiple={false}
                                project={true}
                                input={input}
                                placeholder="Choose User Avatar"
                                onClick={handleFileClick}
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>
                    <div className={CreateCSS.row}>
                        <div className={CreateCSS.labelInputWrapperEmail}>
                            <label
                                htmlFor="password"
                                className={CreateCSS.label}
                            >
                                Password
                            </label>
                            <Input
                                type="password"
                                name="password"
                                placeholder="Password"
                                id="password"
                                onChange={handleCredentialsChange}
                            />
                        </div>
                    </div>
                    <div className={CreateCSS.textAreaContainerUser}>
                        <label
                            htmlFor="userDescription"
                            className={CreateCSS.label}
                        >
                            Description
                        </label>
                        <Input
                            type="text"
                            name="description"
                            placeholder="Description"
                            id="userDescription"
                            onChange={handleCredentialsChange}
                        />
                    </div>
                    <div className={CreateCSS.textAreaContainerUser}>
                        <label
                            htmlFor="projectDescription"
                            className={CreateCSS.label}
                        >
                            Role
                        </label>
                        <div className={CreateCSS.select}>
                            <Select
                                placeholder={"Choose Role"}
                                options={roleOptions}
                                multi={false}
                                isSearchable={false}
                                defaultValue={roleOptions[0]}
                                onChange={handleRoleChange}
                            />
                        </div>
                    </div>
                </div>
                <div className={CreateCSS.membersInfo}>
                    <div className={CreateCSS.buttonWrapperUser}>
                        <Link to="/admin">
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

export default CreateUser;

//
