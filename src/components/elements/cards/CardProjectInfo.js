import React from "react";
import CardCSS from "./Card.module.css";
import Avatar from "../../../assets/q-logo.png";
import { FaExternalLinkAlt } from "react-icons/fa";

const CardProjectInfo = () => {
  return (
    <div className={CardCSS.cardContainer}>
      <div className={CardCSS.avatarPMContainer}>
        <div className={CardCSS.cardAvatar}>
          <img src={Avatar} alt="avatar" className={CardCSS.avatar} />
        </div>
        <div className={CardCSS.headerPMInfoContainer}>
          <h1 className={CardCSS.cardHeader}>Project Name</h1>
          <div className={CardCSS.PMInfoContainer}>
            <img src={Avatar} alt="PM avatar" className={CardCSS.PMAvatar} />
            <span className={CardCSS.PMName}>PM Name</span>
          </div>
        </div>
      </div>
      <div className={CardCSS.btnEmployeeInfoContainer}>
        <FaExternalLinkAlt />
        <p className={CardCSS.EmployeeInfo}>{`6 employees`}</p>
      </div>
    </div>
  );
};

export default CardProjectInfo;
