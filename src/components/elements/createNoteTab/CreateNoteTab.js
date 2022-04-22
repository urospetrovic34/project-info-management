import React, { useState, useRef, useMemo } from "react";
import CreateNoteTabCSS from "../createNoteTab/CreateNoteTab.module.css";
import Input from "../input/Input";
import Button from "../button/Button";
import { Link, useLocation } from "react-router-dom";
import { Select } from "../select/Select";
import categoryHooks from "../../../hooks/query/category";
import File from "../file/File";

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
    console.log(options);
    const [fileTest, setFileTest] = useState("Choose a file");
    const [formDataTest, setFormDataTest] = useState({ formData: null });

    const input = useRef(null);

    const handleFileClick = (event) => {
        event.preventDefault();
        input.current.click();
    };

    const handleFileChange = (event) => {
        event.preventDefault();
        const file = event.target.files[0];
        setFileTest(file.name);
        const formData = new FormData();
        formData.append("files", file);
        setFormDataTest({ ...formDataTest, formData: formData });
    };

    return (
        <div className={CreateNoteTabCSS.wrapper}>
            <div className={CreateNoteTabCSS.container}>
                <div className={CreateNoteTabCSS.header}>
                    <Link to={`/projects/${location.pathname.split("/")[3]}`}>
                        <span className={CreateNoteTabCSS.nav}>Back</span>
                    </Link>
                    <h3>Create a new Note</h3>
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
                                <textarea
                                    name="Description"
                                    placeholder="Note Description..."
                                    className={CreateNoteTabCSS.description}
                                    cols="60"
                                    rows="5"
                                ></textarea>
                            </div>
                            <div className={CreateNoteTabCSS.input_label_two}>
                                <span className={CreateNoteTabCSS.input_title}>
                                    Category
                                </span>
                                <Select
                                    placeholder="Search Category..."
                                    multi={false}
                                    options={options}
                                />
                            </div>
                            <div className={CreateNoteTabCSS.input_label_two}>
                                <span className={CreateNoteTabCSS.input_title}>
                                    Files
                                </span>
                                <File
                                    name={fileTest}
                                    input={input}
                                    onClick={handleFileClick}
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={CreateNoteTabCSS.btn_position}>
                        <Button text="Save Note"></Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateNoteTab;
