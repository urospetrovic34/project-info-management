import React from "react";
import CardCSS from "./Card.module.css";
import Avatar from "../../../assets/q-logo.png";
import { FaExternalLinkAlt } from "react-icons/fa";

const CardProjectInfo = (props) => {
  let logoData = props.project.attributes.logo.data;

  return (
    <div className={CardCSS.cardContainer}>
      <div className={CardCSS.avatarPMContainer}>
        <div className={CardCSS.cardAvatar}>
          <img src={logoData ? logoData.attributes.url : Avatar} alt="avatar" className={CardCSS.avatar} />
        </div>
      </div>
      <div className={CardCSS.info_container}>
        <div className={CardCSS.headerPMInfoContainer}>
          <h1 className={CardCSS.cardHeader}>
            {props.project.attributes.name
              .split("", 30)
              .reduce((o, c) => (o.length === 29 ? `${o}${c}...` : `${o}${c}`), "")}
          </h1>
          <FaExternalLinkAlt />
        </div>
        <div className={CardCSS.btnEmployeeInfoContainer}>
          <div className={CardCSS.PMInfoContainer}>
            <img src={Avatar} alt="PM avatar" className={CardCSS.PMAvatar} />
            <span className={CardCSS.PMName}>PM Name</span>
          </div>
          <p className={CardCSS.EmployeeInfo}>{props.project.attributes.employees.data?.length} Employees</p>
        </div>
      </div>
    </div>
  );
};

export default CardProjectInfo;
//
