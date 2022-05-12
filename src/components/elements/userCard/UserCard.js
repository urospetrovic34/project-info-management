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
import { MdManageAccounts } from "react-icons/md";
import { GrUserManager } from "react-icons/gr";
import { useMediaQuery } from "react-responsive";
import { IoIosMan } from "react-icons/io";

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
        queryClient.invalidateQueries("usersV2");
      },
    }
  );

  const handleNavigate = () => {
    navigate(`/users/edit/${props.user.id}`);
  };

  const isMiddleScreen = useMediaQuery({ query: "(max-width: 960px)" });
  const isBigScreen = useMediaQuery({ query: "(min-width: 961px)" });
  const iconSize = {
    fontSize: "20px",
  };

  return (
    <div onClick={handleNavigate}>
      <div className={UserCardCSS.container}>
        <div className={UserCardCSS.avatar}>
          <img
            src={props.user.avatar ? props.user.avatar.url : logo}
            alt="profile_picture"
            className={UserCardCSS.logo}
          />
        </div>

        <div className={UserCardCSS.name}>
          <p>{props.user.name}</p>
        </div>

        <div className={UserCardCSS.surname}>
          <p>{props.user.surname}</p>
        </div>
        <div className={UserCardCSS.email}>
          <p>{props.user.email}</p>
        </div>
        <div className={UserCardCSS.role}>
          {isMiddleScreen && props.user.role.name === "Project Manager" && <MdManageAccounts style={iconSize} />}
          {isMiddleScreen && props.user.role.name === "Employee" && <IoIosMan style={iconSize} />}

          {isBigScreen && <p className={UserCardCSS.role_p}>{props.user.role.name}</p>}
        </div>
        <div onClick={handleDeleteUser} className={UserCardCSS.delete}>
          <DeleteButton />
        </div>
      </div>
    </div>
  );
};

export default UserCard;
