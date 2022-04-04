import React from "react";
import CardCSS from "./Card.module.css";
import Avatar from "../../../assets/46.jpg";
import Avatar2 from "../../../assets/44.jpg";
import Avatar3 from "../../../assets/32.jpg";

import { FaRegStickyNote } from "react-icons/fa";

const CardProjectManagement = () => {
  const cardInfos = [
    {
      cardTitle: "Project management tool",
      message: "Monday.com for client task management. Internally, we use ActiveCollab.",
      avatarUrl: Avatar,
      pmName: "Segun Adebayo",
      pmTitle: "Founder of Chakra UI",
    },
    {
      cardTitle: "Client info",
      message: "There are 3 people in the clients team - Adam, Elwin and Jessica.",
      avatarUrl: Avatar2,
      pmName: "Ivana Sokolovic",
      pmTitle: "Frontend employee",
    },
    {
      cardTitle: "Test Card",
      message: "Testing message, Testing message, Testing message, Testing message",
      avatarUrl: Avatar3,
      pmName: "Some Person",
      pmTitle: "Backend developer",
    },
  ];
  return cardInfos.map((info) => {
    return (
      <div key={info.cardTitle} className={CardCSS.cardContainerSecond}>
        <div className={CardCSS.headerPMInfoContainer}>
          <h1 className={CardCSS.cardHeader}>{info.cardTitle}</h1>
          <span className={CardCSS.PMName}>{info.message}</span>
        </div>
        <div className={CardCSS.iconPmInfoContainer}>
          <FaRegStickyNote className={CardCSS.noteIcon} />
          <div className={CardCSS.PMInfoContainer}>
            <img src={info.avatarUrl} alt="PM avatar" className={CardCSS.PMAvatar} />
            <div className={CardCSS.PMAdditionalInfo}>
              <div className={CardCSS.PMNameAdditional}>{info.pmName}</div>
              <div className={CardCSS.PMName}>{info.pmTitle}</div>
            </div>
          </div>
        </div>
      </div>
    );
  });
};

export default CardProjectManagement;
