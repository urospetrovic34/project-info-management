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
    console.log(project);

    const [data, setData] = useState({
        title: "",
        description: "",
        category: "",
        files: [],
    });

    const input = useRef(null);

    const handleFileClick = (event) => {
        event.preventDefault();
        input.current.click();
    };

    const handleFileChange = (event) => {
        event.preventDefault();
        const formData = new FormData();
        for (let i = 0; i < event.target.files.length; i++) {
            const file = event.target.files[i];
            formData.append(`file${i + 1}`, file);
        }
        setData({ ...data, files: formData });
    };

    //SINCE I DID NOT KNOW HOW TO FILTER OUT FORMDATA OBJECT
    //I HAD TO GO THROUGH AN ALTERNATIVE ROUTE
    const handleRemoveFile = (event) => {
        const formData = new FormData();
        for (var entry of data.files.entries()) {
            if (entry[0] !== event) {
                formData.append(entry[0], entry[1]);
            }
        }
        setData({ ...data, files: formData });
    };

    const handleCategoryChange = (event) => {
        
    }

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
                                <Input placeholder="Note Title"></Input>
                            </div>
                            <div className={CreateNoteTabCSS.input_label}>
                                <span className={CreateNoteTabCSS.input_title}>
                                    Description
                                </span>
                                <Textarea
                                    name="Description"
                                    placeholder="Note Description..."
                                    rows={6}
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
                                    onChange={handleCategoryChange}
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
                            <Button text="Save Note"></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateNoteTab;
