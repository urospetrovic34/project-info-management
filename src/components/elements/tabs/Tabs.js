import React, { useState, useEffect } from "react";
import TabsCSS from "./Tabs.module.css";
import TabNavItem from "./TabNavItem";
import TabContent from "./TabContent";
import CardProjectManagement from "../cards/CardProjectManagement";
import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthProvider";
import { Note } from "../../note/Note";

const Tabs = (props) => {
    const [activeTab, setActiveTab] = useState("");
    const [categories, setCategories] = useState([]);
    const [authState, authDispatch] = useAuth();
    const [modalCheck, setModalCheck] = useState(false);
    const [note, setNote] = useState({});
    console.log(authState.user.role.name);

    const handleActiveTab = (event) => {
        console.log(event.target.innerText);
        setActiveTab(event.target.innerText);
    };

    const handleModal = () => {
        setModalCheck(modalCheck => !modalCheck);
    };

    // if (props.status === "success") {
    //     categories = props.project.data?.data.attributes.notes.data?.map(
    //         (note) => {
    //             return note.data.attributes.category.data?.attributes.name;
    //         }
    //     );
    //     console.log(categories)
    // }

    useEffect(() => {
        let array = props.project.data?.data.attributes.notes.data?.map(
            (note) => {
                return note.attributes.category.data?.attributes.name;
            }
        );
        setCategories(() => [...new Set(array)]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.project.status]);

    useEffect(() => {
        setActiveTab(categories[0]);
    }, [categories]);

    console.log(props.project);

    return (
        <div className={TabsCSS.tabs}>
            {modalCheck && <Note note={note} onClick={handleModal} />}
            <ul className={TabsCSS.nav}>
                <div className={TabsCSS.categories_nav}>
                    {props.project.status === "success" &&
                        categories.map((category) => (
                            <TabNavItem
                                key={category}
                                title={category}
                                activeTab={activeTab}
                                handleActiveTab={handleActiveTab}
                            />
                        ))}
                </div>
                {authState.user.role.name !== "Project Manager" && (
                    <div>
                        <Link to="/notes/create">
                            <TabNavItem activeTab={false} title="ADD NOTE" />
                        </Link>
                    </div>
                )}
            </ul>

            <div className={TabsCSS.outlet}>
                <TabContent id={activeTab} activeTab={activeTab}>
                    {props.project.status === "success" &&
                        categories.length === 0 && (
                            <div>This project hasn't got any notes yet</div>
                        )}
                    {props.project.status === "success" &&
                        props.project.data?.data.attributes.notes.data
                            .filter(
                                (note) =>
                                    note.attributes.category.data.attributes
                                        .name === activeTab
                            )
                            .map((note) => (
                                <CardProjectManagement
                                    onClick={() => {
                                        handleModal();
                                        setNote(note);
                                    }}
                                    note={note}
                                    key={note.id}
                                />
                            ))}
                </TabContent>
            </div>
        </div>
    );
};

export default Tabs;
