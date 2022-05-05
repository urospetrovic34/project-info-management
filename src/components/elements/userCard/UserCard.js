import React, { useEffect, useState } from 'react';
import UserCardCSS from "../userCard/UserCard.module.css";
import logo from "../../../assets/q-logo.png";
import Button from "../button/Button";
import axios from 'axios';
import DeleteButton from '../deleteButton/DeleteButton';
import { useQuery } from 'react-query';
import userHooks from '../../../hooks/query/user';


const UserCard = () => {


  const users = userHooks.useUsers();
  console.log(users);


  return (
    <div>
      {users.data?.map((user) => {
        return <div key={user.id} className={UserCardCSS.container}>
          <div className={UserCardCSS.logo_container} >
            <img src={logo} alt="profile_picture" className={UserCardCSS.logo} />
          </div>
          <div>
            <p key={user.id}>{user.name}</p>
          </div>

          <div>
            <p key={user.id}>{user.surname}</p>
          </div>
          <div>
            <p key={user.id}>{user.email}</p>
          </div>
          <div>
            <p key={user.id}>{user.role}</p>
          </div>
          <div>
            <DeleteButton />
          </div>
          <div>
          </div>
        </div>
      })}

    </div>
  )
}

export default UserCard;