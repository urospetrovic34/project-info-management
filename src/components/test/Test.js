import React from "react";
import userHooks from "../../hooks/query/user";
import { CardUserPanel } from "../elements/cards/cardUserPanel/CardUserPanel";
import TestCSS from "./Test.module.css";
import userAvatarPlaceholder from "../../assets/avatar-placeholder.png";
import { Select } from "../elements/select/Select";
import { AdminHeader } from "../elements/navigation/adminHeader/AdminHeader";

export const Test = () => {
    let users = userHooks.useUsers();
    return (
        <div className={TestCSS.wrapper}>
            <div className={TestCSS.container}>
                {users.status !== "success" && <p>ANSAKSESFUL</p>}
                <AdminHeader/>
                {users.status === "success" &&
                    users.data.map((user) => (
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
