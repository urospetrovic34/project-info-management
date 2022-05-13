import React, { useState, useRef, useEffect } from "react";
import EditUserCSS from "./EditUser.module.css";
import userHooks from "../../hooks/query/user";
import Input from "../elements/input/Input";
import UserAPI from "../../actions/user";
import UploadAPI from "../../actions/upload";
import { useMutation } from "react-query";
import { FileButton } from "../elements/file/FileButton";
import { Link } from "react-router-dom";
import Button from "../elements/button/Button";
import LoadingSpinner from "../elements/loadingSpinner/LoadingSpinner";
import { Select } from "../elements/select/Select";
import { useAuth } from "../../contexts/AuthProvider";
import { useNavigate, useLocation } from "react-router-dom";
import Photo from "../../assets/photo.jpg";

export const EditUser = () => {
    const btnSaveStyle = {
        backgroundColor: "#319795",
        color: "white",
        fontWeight: "600",
    };
    const navigate = useNavigate();
    const location = useLocation();
    const [authState, authDispatch] = useAuth();
    const count = userHooks.useCountUsers();
    const user = userHooks.useSingleUser(location.pathname.split("/")[3]);
    console.log(user);

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

    useEffect(() => {
        if (user.status === "success") {
            setCredentials({
                ...credentials,
                name: user.data.name,
                surname: user.data.surname,
                email: user.data.email,
                description: user.data.description,
                role:user.data.role.id,
                image: user.data.avatar !== null ? user.data.avatar.url : null,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user.status]);

    return (
        user.status === "success" && (
            <div className={EditUserCSS.container}>
                <div className={EditUserCSS.contentContainer}>
                    <div className={EditUserCSS.projectInfo}>
                        <div className={EditUserCSS.inputContainer}>
                            <div>
                                <div className={EditUserCSS.projectInfoHeader}>
                                    <h2 className={EditUserCSS.header}>
                                        Edit User
                                    </h2>
                                </div>
                                <div className={EditUserCSS.row}>
                                    <div
                                        className={
                                            EditUserCSS.labelInputWrapper
                                        }
                                    >
                                        <label
                                            htmlFor="firstName"
                                            className={EditUserCSS.label}
                                        >
                                            First Name
                                        </label>
                                        <Input
                                            type="text"
                                            name="name"
                                            placeholder="First Name"
                                            id="firstName"
                                            value={credentials.name}
                                            onChange={handleCredentialsChange}
                                        />
                                    </div>
                                    <div
                                        className={
                                            EditUserCSS.labelInputWrapper
                                        }
                                    >
                                        <label
                                            htmlFor="lastName"
                                            className={EditUserCSS.label}
                                        >
                                            Last Name
                                        </label>
                                        <Input
                                            type="text"
                                            name="surname"
                                            placeholder="Last Name"
                                            id="lastName"
                                            value={credentials.surname}
                                            onChange={handleCredentialsChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className={EditUserCSS.uploadPreview}>
                                    <img
                                        src={
                                            credentials.image
                                                ? credentials.image
                                                : Photo
                                        }
                                        alt="uploadPhoto"
                                        onClick={handleFileClick}
                                        className={EditUserCSS.imgPreview}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={EditUserCSS.row}>
                            <div className={EditUserCSS.labelInputWrapperEmail}>
                                <label
                                    htmlFor="email"
                                    className={EditUserCSS.label}
                                >
                                    Email
                                </label>
                                <Input
                                    type="text"
                                    name="email"
                                    placeholder="Email"
                                    id="email"
                                    value={credentials.email}
                                    onChange={handleCredentialsChange}
                                />
                            </div>
                            <div className={EditUserCSS.fileButtonContainer}>
                                <FileButton
                                    className={EditUserCSS.fileButton}
                                    multiple={false}
                                    project={true}
                                    input={input}
                                    placeholder="Choose User Avatar"
                                    onClick={handleFileClick}
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>
                        <div className={EditUserCSS.row}>
                            <div className={EditUserCSS.labelInputWrapperEmail}>
                                <label
                                    htmlFor="password"
                                    className={EditUserCSS.label}
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
                        <div className={EditUserCSS.textAreaContainerUser}>
                            <label
                                htmlFor="userDescription"
                                className={EditUserCSS.label}
                            >
                                Description
                            </label>
                            <Input
                                type="text"
                                name="description"
                                placeholder="Description"
                                id="userDescription"
                                value={credentials.description}
                                onChange={handleCredentialsChange}
                            />
                        </div>
                        <div className={EditUserCSS.textAreaContainerUser}>
                            <label
                                htmlFor="projectDescription"
                                className={EditUserCSS.label}
                            >
                                Role
                            </label>
                            <div className={EditUserCSS.select}>
                                <Select
                                    placeholder={"Choose Role"}
                                    options={roleOptions}
                                    multi={false}
                                    isSearchable={false}
                                    defaultValue={roleOptions[roleOptions.findIndex((el) => el.value === credentials.role)]}
                                    onChange={handleRoleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={EditUserCSS.membersInfo}>
                        <div className={EditUserCSS.buttonWrapperUser}>
                            <Link to="/admin/users">
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
        )
    );
};
