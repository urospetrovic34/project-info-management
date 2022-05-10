import React, { useState } from "react";
import Button from "../elements/button/Button";
import AsyncSearchBar from "../elements/searchBar/AsyncSearchBar";
import { Select } from "../elements/select/Select";
import UserCard from "../elements/userCard/UserCard";
import SystemAdminPageCSS from "../systemAdminPage/SystemAdminPage.module.css";
import userHooks from "../../hooks/query/user";
import { Pagination } from "../elements/pagination/Pagination";
import Input from "../elements/input/Input";
import { Link } from "react-router-dom";
import useDebounce from "../../hooks/custom/useDebounce";

const SystemAdminPage = () => {
    const [pageNumber, setPageNumber] = useState(0);
    const [userName, setUserName] = useState(null);
    const debouncedPageNumber = useDebounce(pageNumber, 250);
    const debouncedUserName = useDebounce(userName, 1000);
    const users = userHooks.useUsersV2(
        null,
        debouncedUserName,
        debouncedPageNumber
    );
    const sortEmployeeOptions = [
        { value: "", label: "Option-1" },
        { value: "", label: "Option-2" },
        { value: "", label: "Option-3" },
        { value: "", label: "Option-4" },
    ];
    console.log(users);

    const handlePageChange = async (event) => {
        setPageNumber(event.target.value - 1);
    };

    const handleNextPageChange = async () => {
        setPageNumber(users.data?.meta?.pagination.page - 1 + 1);
    };

    const handlePreviousPageChange = async () => {
        setPageNumber(users.data?.meta?.pagination.page - 1 - 1);
    };

    const handleUserNameFilter = async (event) => {
        setPageNumber(0);
        setUserName(event.target.value);
    };
    return (
        <div className={SystemAdminPageCSS.container}>
            <>
                <div className={SystemAdminPageCSS.flex}>
                    <div className={SystemAdminPageCSS.search_container}>
                        <div>
                            <Input
                                placeholder={"Search users..."}
                                onChange={handleUserNameFilter}
                            />
                        </div>
                        <div className={SystemAdminPageCSS.select}>
                            <Select
                                placeholder={"Sort by..."}
                                options={sortEmployeeOptions}
                                multi={false}
                                isSearchable={false}
                            />
                        </div>
                    </div>
                    <div className={SystemAdminPageCSS.btn}>
                        <Link to="/users/create">
                            <Button text=" + Add User" />
                        </Link>
                    </div>
                </div>
                <div className={SystemAdminPageCSS.card_container}>
                    {users.status === "success" &&
                        users.data?.data?.map((user) => (
                            <UserCard key={user.id} user={user} />
                        ))}
                </div>
                <div className={SystemAdminPageCSS.pagination}>
                    {users.status === "success" && (
                        <Pagination
                            currentPage={users.data?.meta?.pagination.page}
                            totalCount={users.data?.meta?.pagination.total}
                            pageSize={users.data?.meta?.pagination.pageSize}
                            handlePageChange={handlePageChange}
                            handleNextPageChange={handleNextPageChange}
                            handlePreviousPageChange={handlePreviousPageChange}
                        />
                    )}
                </div>
            </>
        </div>
    );
};

export default SystemAdminPage;
