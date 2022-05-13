import React, { useState, useEffect } from "react";
import Button from "../elements/button/Button";
import Input from "../elements/input/Input";
// import CreateCSS from "../createProject/CreateProjectPage/CreateProject.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import LoadingSpinner from "../elements/loadingSpinner/LoadingSpinner";
import CategoryAPI from "../../actions/category";
import CreateCSS from '../elements/createContainer/CreateProject.module.css'
import { useMutation } from "react-query";
import categoryHooks from '../../hooks/query/category'

const CreateCategory = (props) => {
    const btnSaveStyle = {
        backgroundColor: "#319795",
        color: "white",
        fontWeight: "600",
    };
    const navigate = useNavigate();
    const location = useLocation();
    const category = categoryHooks.useSingleCategory(location.pathname.split("/")[3])
    console.log(category)
    const [credentials, setCredentials] = useState({
        name: "",
    });
    const [isLoading, setIsLoading] = useState(false);

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

    useEffect(() => {
        if (category.status === "success") {
            setCredentials({
                ...credentials,
                name: category.data.data.attributes.name,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category.status]);

    return (
        <div className={CreateCSS.container}>
            <div className={CreateCSS.contentContainer}>
                <div className={CreateCSS.projectInfo}>
                    <div className={CreateCSS.inputContainer}>
                        <div>
                            <div className={CreateCSS.projectInfoHeader}>
                                <h2 className={CreateCSS.header}>
                                    Edit Category
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
                                value={credentials.name}
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
