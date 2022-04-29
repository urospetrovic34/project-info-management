import React, { useState, useEffect } from "react";
import TabsCSS from "./Tabs.module.css";
import TabNavItem from "./TabNavItem";
import TabContent from "./TabContent";
import CardProjectManagement from "../cards/CardProjectManagement";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthProvider";
import { Note } from "../../note/Note";
import Input from "../input/Input";
import { Select } from "../select/Select";
import { Pagination } from "../pagination/Pagination";
import useDebounce from "../../../hooks/custom/useDebounce";

const Tabs = (props) => {
    const location = useLocation();

    const [activeTab, setActiveTab] = useState("");
    const [categories, setCategories] = useState([]);
    const [authState, authDispatch] = useAuth();
    const [modalCheck, setModalCheck] = useState(false);
    const [note, setNote] = useState({});
    const [projectName, setProjectName] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [sortEntry, setSortEntry] = useState("");
    const debouncedCurrentPage = useDebounce(currentPage, 100);
    const debouncedProjectName = useDebounce(projectName, 250);
    let totalCount = 0;

    const sortOptions = [
        { value: "newest", label: "Sort By: Newest" },
        { value: "oldest", label: "Sort By: Oldest" },
        { value: "atoz", label: "Sort By: Alphabetically (A to Z)" },
        { value: "ztoa", label: "Sort By: Alphabetically (Z to A)" },
    ];

    const handleActiveTab = (event) => {
        setCurrentPage(1);
        setActiveTab(event.target.innerText);
    };

    const handleModal = () => {
        setModalCheck((modalCheck) => !modalCheck);
    };

    const handleProjectNameFilter = async (event) => {
        setProjectName(event.target.value);
    };

    const handlePageChange = async (event) => {
        setCurrentPage(event.target.value);
    };

    const handleSortChange = (event) => {
        setSortEntry(event.value);
    };

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
                {authState.user.role.name === "Project Manager" && (
                    <div>
                        <Link
                            to={`/notes/create/${props.project.data?.data?.id}`}
                        >
                            <TabNavItem activeTab={false} title="ADD NOTE" />
                        </Link>
                    </div>
                )}
            </ul>
            <div className={TabsCSS.option_row}>
                <div>
                    <Input
                        placeholder="Search notes..."
                        onChange={handleProjectNameFilter}
                    />
                </div>
                <div className={TabsCSS.sort_col}>
                    <Select
                        options={sortOptions}
                        isSearchable={false}
                        defaultValue={sortOptions[0]}
                        onChange={handleSortChange}
                    />
                </div>
            </div>
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
                                        .name === activeTab &&
                                    note.attributes.title
                                        .toLowerCase()
                                        .includes(
                                            debouncedProjectName.toLowerCase()
                                        )
                            )
                            .sort((a, b) => {
                                if (sortEntry === "oldest") {
                                    let aDate = new Date(
                                        a.attributes.createdAt
                                    );
                                    let bDate = new Date(
                                        b.attributes.createdAt
                                    );
                                    return aDate - bDate;
                                } else if (sortEntry === "atoz") {
                                    return a.attributes.title
                                        .toLowerCase()
                                        .localeCompare(
                                            b.attributes.title.toLowerCase()
                                        );
                                } else if (sortEntry === "ztoa") {
                                    return b.attributes.title
                                        .toLowerCase()
                                        .localeCompare(
                                            a.attributes.title.toLowerCase()
                                        );
                                } else {
                                    let aDate = new Date(
                                        a.attributes.createdAt
                                    );
                                    let bDate = new Date(
                                        b.attributes.createdAt
                                    );
                                    return bDate - aDate;
                                }
                            })
                            .map((note, index, array) => {
                                totalCount = array.length;
                                return (
                                    <CardProjectManagement
                                        onClick={() => {
                                            handleModal();
                                            setNote(note);
                                        }}
                                        note={note}
                                        key={note.id}
                                    />
                                );
                            })
                            .slice(
                                9 * (debouncedCurrentPage - 1),
                                9 * debouncedCurrentPage
                            )}
                </TabContent>
                <div className={TabsCSS.pagination}>
                    {props.project.status === "success" &&
                        props.project.data?.data.attributes.notes.data && (
                            <Pagination
                                handlePageChange={handlePageChange}
                                totalCount={totalCount}
                                pageSize={9}
                                currentPage={debouncedCurrentPage}
                            />
                        )}
                </div>
            </div>
        </div>
    );
};

export default Tabs;
