import React, { useState, useRef } from "react";
import Button from "../button/Button";
import Input from "../input/Input";
import CreateCSS from "./CreateProject.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthProvider";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";
import CategoryAPI from "../../../actions/category";
import { useMutation } from "react-query";
import userHooks from "../../../hooks/query/user";

const CreateCategory = (props) => {
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

    const mutationCategory = useMutation(
        (data) => {
            console.log(data);
            return CategoryAPI.create(data)
        },
        {
            onMutate: async () => {
                setIsLoading(true);
            },
            onSuccess: () => {
                setIsLoading(false);
                navigate("/admin/categories");
            },
        }
    );

    const handleButton = (event) => {
        event.preventDefault();
        if(credentials.name){
            mutationCategory.mutate({
                data: {
                    name: credentials.name,
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
                                    Create Category
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div className={CreateCSS.row}>
                        <div className={CreateCSS.labelInputWrapperEmail}>
                            <label htmlFor="email" className={CreateCSS.label}>
                                Name
                            </label>
                            <Input
                                type="text"
                                name="name"
                                placeholder="Name"
                                id="name"
                                onChange={handleCredentialsChange}
                            />
                        </div>
                    </div>
                </div>
                <div className={CreateCSS.membersInfo}>
                    <div className={CreateCSS.buttonWrapperUser}>
                        <Link to="/admin/categories">
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

export default CreateCategory;

//
