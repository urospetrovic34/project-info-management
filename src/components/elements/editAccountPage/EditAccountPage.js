import React, { useRef, useState, useEffect } from "react";
import EditAccountPageCSS from "../editAccountPage/EditAccountPage.module.css";
import logo from "../../../assets/q-logo.png";
import File from "../../elements/file/File";
import Input from "../input/Input";
import Label from "../label/Label";
import Button from "../button/Button";
import Avatar from "../../../assets/avatar-placeholder.png";
import { useAuth } from "../../../contexts/AuthProvider";
import { FileButton } from "../file/FileButton";
import { AiOutlineCamera } from "react-icons/ai";
import { useMutation, queryClient } from "react-query";
import UserAPI from "../../../actions/user";
import AuthAPI from "../../../actions/auth";
import UploadAPI from "../../../actions/upload";

const EditAccountPage = () => {
    const [authState, authDispatch] = useAuth();
    const [camera, setCamera] = useState(false);
    const [credentials, setCredentials] = useState({
        name: authState.user.name,
        surname: authState.user.surname,
        email: authState.user.email,
        password: "",
        description: authState.user.description,
        logo: null,
        image: authState.user.avatar ? authState.user.avatar.url : null,
    });
    console.log(credentials);

    const input = useRef(null);
    const fileReader = new FileReader();

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
                image: authState.user.avatar ? authState.user.avatar.url : null,
            });
        }
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
            onSuccess: (response) => {
                let data = {
                    name: credentials.name,
                    surname: credentials.surname,
                    description: credentials.description,
                    email: credentials.email,
                    avatar: response[0].id,
                };
                mutationUser.mutate(data);
            },
        }
    );

    // const mutationPassword = useMutation(
    //     () => {
    //         let data = { data: { status: "published" } };
    //         return UserAPI.edit(authState.user.id, data);
    //     },
    //     {
    //         onSettled: () => {
    //             queryClient.invalidateQueries("users");
    //         },
    //     }
    // );

    const mutationUser = useMutation(
        (data) => {
            return UserAPI.edit(authState.user.id, data);
        },
        {
            onSuccess: () => {
                AuthAPI.refresh(authDispatch);
            },
        }
    );

    const handleButton = (event) => {
        event.preventDefault();
        if (credentials.logo) {
            mutationLogo.mutate(credentials.logo);
        } else {
            mutationUser.mutate({
                name: credentials.name,
                surname: credentials.surname,
                description: credentials.description,
                email: credentials.email,
                ...(credentials.password !== ""
                    ? { password: credentials.password }
                    : null),
            });
        }
        setCredentials({
            ...credentials,
            password: "",
        });
    };

    const chooseStyle = {
        backgroundColor: "rgb(49, 151, 149)",
        color: "white",
        fontWeight: "600",
        borderRadius: "5px",
    };

    return (
        <div className={EditAccountPageCSS.wrapper}>
            <div className={EditAccountPageCSS.container}>
                <div className={EditAccountPageCSS.section_one}>
                    <div className={EditAccountPageCSS.user_name}>
                        {authState.user.name} {authState.user.surname}
                    </div>
                    <div className={EditAccountPageCSS.role}>
                        {authState.user.role.name}
                    </div>
                    {/* {authState.user.role.name !== "System Administrator" ? } */}
                    <div
                        className={EditAccountPageCSS.logo_container}
                        style={{
                            backgroundImage: `url(${
                                credentials.image ? credentials.image : Avatar
                            })`,
                        }}
                        onClick={handleFileClick}
                        onMouseOver={() => setCamera(true)}
                        onMouseLeave={() => setCamera(false)}
                    >
                        {camera && (
                            <AiOutlineCamera
                                className={EditAccountPageCSS.camera_thumb}
                            />
                        )}
                    </div>
                    <div>
                        <FileButton
                            avatar={true}
                            input={input}
                            onClick={handleFileClick}
                            onChange={handleFileChange}
                            style={chooseStyle}
                        />
                    </div>
                </div>
                <div className={EditAccountPageCSS.section_two}>
                    <div className={EditAccountPageCSS.acc_informations}>
                        <div className={EditAccountPageCSS.row}>
                            <Label
                                style={EditAccountPageCSS.title_label}
                                text="Account Settings"
                            />
                        </div>
                        <div className={EditAccountPageCSS.row}>
                            <Label
                                style={EditAccountPageCSS.input_label}
                                text="First Name"
                            />
                            <Input
                                value={credentials.name}
                                type="text"
                                name="name"
                                placeholder="First Name"
                                onChange={handleCredentialsChange}
                            />
                        </div>
                        <div>
                            <Label
                                style={EditAccountPageCSS.input_label}
                                text="Last Name"
                            />
                            <Input
                                value={credentials.surname}
                                type="text"
                                name="surname"
                                placeholder="Last Name"
                                onChange={handleCredentialsChange}
                            />
                        </div>
                        <div>
                            <Label
                                style={EditAccountPageCSS.input_label}
                                text="Email"
                            />
                            <Input
                                value={credentials.email}
                                type="text"
                                name="email"
                                placeholder="Email"
                                onChange={handleCredentialsChange}
                            />
                        </div>
                        <div>
                            <Label
                                style={EditAccountPageCSS.input_label}
                                text="Description"
                            />
                            <Input
                                value={credentials.description}
                                type="text"
                                name="description"
                                placeholder="Description"
                                onChange={handleCredentialsChange}
                            />
                        </div>
                        <div>
                            <Label
                                style={EditAccountPageCSS.input_label}
                                text="Password"
                            />
                            <Input
                                value={credentials.password}
                                type="password"
                                name="password"
                                placeholder="Enter new password"
                                onChange={handleCredentialsChange}
                            />
                        </div>
                        {/* <div>
                            <Label
                                style={EditAccountPageCSS.input_label}
                                text="Password"
                            />
                            <Input
                                type="password"
                                name="identifier"
                                placeholder=""
                            />
                        </div> */}
                    </div>
                    <div className={EditAccountPageCSS.button_section}>
                        <div className={EditAccountPageCSS.row_reverse}>
                            <Button text="Save" onClick={handleButton} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditAccountPage;
