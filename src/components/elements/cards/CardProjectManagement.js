import React from "react";
import CardCSS from "./Card.module.css";
import Avatar from "../../../assets/q-logo.png";
import { FaRegStickyNote } from "react-icons/fa";

const CardProjectManagement = () => {
  return (
    <div className={CardCSS.cardContainerSecond}>
      <div className={CardCSS.headerPMInfoContainer}>
        <h1 className={CardCSS.cardHeader}>Project management tool</h1>
        <span className={CardCSS.PMName}>Monday.com for client task management. Internally, we use ActiveCollab.</span>
      </div>
      <div className={CardCSS.iconPmInfoContainer}>
        <FaRegStickyNote className={CardCSS.noteIcon} />
        <div className={CardCSS.PMInfoContainer}>
          <img src={Avatar} alt="PM avatar" className={CardCSS.PMAvatar} />
          <div className={CardCSS.PMAdditionalInfo}>
            <div className={CardCSS.PMNameAdditional}>Segun Adebayo</div>
            <div className={CardCSS.PMName}>Founder of Chakra UI</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProjectManagement;
