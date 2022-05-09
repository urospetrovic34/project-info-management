import React, { useEffect, useState } from "react";
import UserCardCSS from "../userCard/UserCard.module.css";
import logo from "../../../assets/avatar-placeholder.png";
import Button from "../button/Button";
import axios from "axios";
import DeleteButton from "../deleteButton/DeleteButton";

const UserCard = (props) => {
    return (
        <div>
            <div className={UserCardCSS.container}>
                <img
                    src={props.user.avatar ? props.user.avatar.url : logo}
                    alt="profile_picture"
                    className={UserCardCSS.logo}
                />
                <div>
                    <p>{props.user.name}</p>
                </div>

                <div>
                    <p>{props.user.surname}</p>
                </div>
                <div>
                    <p>{props.user.email}</p>
                </div>
                <div>
                    <p>{props.user.role.name}</p>
                </div>
                <div>
                    <DeleteButton />
                </div>
                <div></div>
            </div>
        </div>
    );
};

export default UserCard;
