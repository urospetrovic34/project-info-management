import React, {useState,useRef} from "react";
import userHooks from "../../hooks/query/user";
import { CardUserPanel } from "../elements/cards/cardUserPanel/CardUserPanel";
import TestCSS from "./Test.module.css";
import userAvatarPlaceholder from "../../assets/avatar-placeholder.png";
import { Select } from "../elements/select/Select";
import { AdminHeader } from "../elements/navigation/adminHeader/AdminHeader";

export const Test = () => {
    let users = userHooks.useUsers();
    let [sortData,setSortData] = useState("")
    let [filterData,setFilterData] = useState("")

    const handleFilter = () => {

    }

    const handleSort = async (event) => {
        // const debounce
    }

    return (
        <div className={TestCSS.wrapper}>
            <div className={TestCSS.container}>
                <AdminHeader handleFilter={handleFilter} handleSort={handleSort}/>
                {users.status === "success" &&
                    users.data?.map((user) => (
                        <CardUserPanel
                            avatar={
                                user.avatar
                                    ? user.avatar.url
                                    : userAvatarPlaceholder
                            }
                            username={user.username}
                            role={user.role.name}
                            key={user.id}
                        />
                    ))}
            </div>
        </div>
    );
};
