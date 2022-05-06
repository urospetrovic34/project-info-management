import React, { useEffect, useState } from "react";
import CardCSS from "./Card.module.css";
import Avatar from "../../../assets/q-logo.png";
import { FaRegWindowClose } from "react-icons/fa";

const CardMembers = (props) => {
  console.log(props.member)
    return (
        <div key={props.member.id} className={CardCSS.cardMembersContainer}>
            <div className={CardCSS.PMInfoContainer}>
                <img
                    src={
                        props.member.avatar
                            ? props.member.avatar.formats.small.url
                            : Avatar
                    }
                    alt="PM avatar"
                    className={CardCSS.PMAvatar}
                />
                <div className={CardCSS.PMAdditionalInfo}>
                    <div
                        className={CardCSS.PMNameAdditional}
                    >{`${props.member.name} ${props.member.surname}`}</div>
                    <div
                        className={CardCSS.PMName}
                    >{`${props.member.role.name}`}</div>
                </div>
            </div>
            <FaRegWindowClose
                className={CardCSS.close}
                onClick={() => props.updateMembers(props.index)}
            />
        </div>
    );
};

export default CardMembers;
