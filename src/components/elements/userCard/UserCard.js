import React, { useEffect, useState } from "react";
import UserCardCSS from "../userCard/UserCard.module.css";
import logo from "../../../assets/avatar-placeholder.png";
import Button from "../button/Button";
import axios from "axios";
import DeleteButton from "../deleteButton/DeleteButton";
import { useNavigate } from "react-router-dom";
import userHooks from "../../../hooks/query/user";
import { useMutation, useQueryClient } from "react-query";
import UserAPI from "../../../actions/user";

const UserCard = (props) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const handleDeleteUser = (event) => {
        event.stopPropagation();
        mutationUser.mutate();
    };

    const mutationUser = useMutation(
        () => {
            return UserAPI.remove(props.user.id);
        },
        {
            // onMutate: async () => {
            //     setIsLoading(true);
            // },
            onSuccess: (data) => {
                console.log(data);
                queryClient.invalidateQueries('usersV2')
            },
        }
    );

    const handleNavigate = () => {
        navigate(`/users/edit/${props.user.id}`);
    };

    return (
        <div onClick={handleNavigate}>
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
                <div onClick={handleDeleteUser}>
                    <DeleteButton />
                </div>
                <div></div>
            </div>
        </div>
    );
};

export default UserCard;
