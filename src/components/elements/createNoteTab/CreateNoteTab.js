import React, { useEffect, useState, useRef, useMemo } from "react";
import CreateNoteTabCSS from "../createNoteTab/CreateNoteTab.module.css";
import Input from "../input/Input";
import Button from "../button/Button";
import { Link, useLocation } from "react-router-dom";
import { Select } from "../select/Select";
import projectHooks from "../../../hooks/query/project";
import categoryHooks from "../../../hooks/query/category";
import { FileButton } from "../file/FileButton";
import { IoIosArrowBack } from "react-icons/io";
import { Textarea } from "../textarea/Textarea";
import { AttachFiles } from "../file/AttachFiles";
import { useMutation } from "react-query";
import UploadAPI from "../../../actions/upload";

const CreateNoteTab = (props) => {
    const location = useLocation();
    const categories = categoryHooks.useCategories();
    const options = useMemo(
        () =>
            categories.data?.data.map((category) => {
                return { value: category.id, label: category.attributes.name };
            }),
        [categories.data]
    );
    const project = projectHooks.useSingleProject(
        location.pathname.split("/")[3]
    );
    const projectTitle = useMemo(() => {
        return project.data?.data.attributes.name;
    }, [project.data]);

    const [data, setData] = useState({
        title: "",
        description: "",
        category: "",
        files: [],
        fileData: null,
    });

    console.log(data);

    const input = useRef(null);

    const handleFileClick = (event) => {
        event.preventDefault();
        input.current.click();
    };

    const handleFileChange = (event) => {
        event.preventDefault();
        const formData = new FormData();
        const formData2 = new FormData();
        for (let i = 0; i < event.target.files.length; i++) {
            const file = event.target.files[i];
            formData2.append("files", file);
            formData.append(`file${i + 1}`, file);
        }
        setData({ ...data, files: formData, fileData: formData2 });
    };

    //SINCE I DID NOT KNOW HOW TO FILTER OUT FORMDATA OBJECT
    //I HAD TO GO THROUGH AN ALTERNATIVE ROUTE
    const handleRemoveFile = (event) => {
        const formData = new FormData();
        const formData2 = new FormData();
        for (let entry of data.files.entries()) {
            if (entry[0] !== event) {
                formData.append(entry[0], entry[1]);
            }
        }
        setData({ ...data, files: formData, fileData: formData2 });
    };

    const handleCategoryChange = (value) => {
        setData({ ...data, category: value.value });
    };

    const handleDataChange = (event) => {
        event.preventDefault();
        setData({
            ...data,
            [event.target.name]: event.target.value,
        });
    };

    const handleButton = () => {
        mutationLogo.mutate(data.fileData);
    };
    let array = [];

    const mutationLogo = useMutation(
        (files) => {
            console.log(files);
            return UploadAPI.create(files);
        },
        {
            onSuccess: () => {
                console.log(array);
            },
        }
    );

    useEffect(() => {
        if (options) {
            setData({ ...data, category: options[0].value });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [options]);

    return (
        <div className={CreateNoteTabCSS.wrapper}>
            <div className={CreateNoteTabCSS.container}>
                <div className={CreateNoteTabCSS.header}>
                    <Link to={`/projects/${location.pathname.split("/")[3]}`}>
                        <IoIosArrowBack className={CreateNoteTabCSS.nav} />
                    </Link>
                    <h3 className={CreateNoteTabCSS.nav}>
                        {projectTitle} <span>-</span>
                        <span>Create a new note</span>
                    </h3>
                </div>
                <div className={CreateNoteTabCSS.data_container}>
                    <div className={CreateNoteTabCSS.layout}>
                        <div>
                            <div className={CreateNoteTabCSS.input_label}>
                                <span className={CreateNoteTabCSS.input_title}>
                                    Title
                                </span>
                                <Input
                                    placeholder="Note Title"
                                    type="text"
                                    name="title"
                                    onChange={handleDataChange}
                                ></Input>
                            </div>
                            <div className={CreateNoteTabCSS.input_label}>
                                <span className={CreateNoteTabCSS.input_title}>
                                    Description
                                </span>
                                <Textarea
                                    placeholder="Note Description..."
                                    rows={6}
                                    type="text"
                                    name="description"
                                    onChange={handleDataChange}
                                />
                            </div>
                            <div className={CreateNoteTabCSS.input_label_two}>
                                <span className={CreateNoteTabCSS.input_title}>
                                    Category
                                </span>
                                <Select
                                    placeholder="Search Category..."
                                    multi={false}
                                    options={options}
                                    isSearchable={true}
                                    onChange={(value) =>
                                        handleCategoryChange(value)
                                    }
                                />
                            </div>
                            <div className={CreateNoteTabCSS.input_label}>
                                <div className={CreateNoteTabCSS.file_row}>
                                    <span
                                        className={CreateNoteTabCSS.input_title}
                                    >
                                        Files
                                    </span>
                                    <FileButton
                                        input={input}
                                        onClick={handleFileClick}
                                        onChange={handleFileChange}
                                    />
                                </div>
                                <AttachFiles
                                    files={data.files}
                                    removeFile={handleRemoveFile}
                                />
                            </div>
                        </div>
                        <div className={CreateNoteTabCSS.btn_position}>
                            <Button
                                onClick={handleButton}
                                text="Save Note"
                            ></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateNoteTab;
