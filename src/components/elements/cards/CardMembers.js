import React, { useEffect, useState } from "react";
import CardCSS from "./Card.module.css";
import Avatar from "../../../assets/q-logo.png";
import { FaRegWindowClose } from "react-icons/fa";

const CardMembers = (props) => {
  const [entries, setEntries] = useState([]);
  const members = props.membersInfo;

  useEffect(() => {
    setEntries([...members]);
  }, [members]);

  const updateMembers = (a) => {
    const updatedMembers = members.filter((member) => {
      return member.id !== a;
    });
    setEntries(updatedMembers);
  };

  return entries.map((member) => {
    return (
      <div key={member.id} className={CardCSS.cardMembersContainer}>
        <div className={CardCSS.PMInfoContainer}>
          <img
            src={member.avatar ? member.avatar.formats.small.url : Avatar}
            alt="PM avatar"
            className={CardCSS.PMAvatar}
          />
          <div className={CardCSS.PMAdditionalInfo}>
            <div className={CardCSS.PMNameAdditional}>{`${member.name} ${member.surname}`}</div>
            <div className={CardCSS.PMName}>{`${member.role.name}`}</div>
          </div>
        </div>
        <FaRegWindowClose className={CardCSS.close} onClick={() => updateMembers(member.id)} />
      </div>
    );
  });
};

export default CardMembers;
