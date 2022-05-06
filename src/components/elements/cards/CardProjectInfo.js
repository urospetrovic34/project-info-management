import React from "react";
import CardCSS from "./Card.module.css";
import Avatar from "../../../assets/q-logo.png";
import { FaExternalLinkAlt } from "react-icons/fa";
import userHooks from "../../../hooks/query/user";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";

const CardProjectInfo = (props) => {
    console.log(props);
    let logoData = props.project.logo;

    return (
        <div className={CardCSS.cardContainer}>
            <div className={CardCSS.avatarPMContainer}>
                <div className={CardCSS.cardAvatar}>
                    <img
                        src={
                            logoData !== undefined && logoData?.formats !== null
                                ? logoData?.url
                                : Avatar
                        }
                        alt="avatar"
                        className={CardCSS.avatar}
                    />
                </div>
            </div>
            <div className={CardCSS.info_container}>
                <div className={CardCSS.headerPMInfoContainer}>
                    <h1 className={CardCSS.cardHeader}>
                        {props.project.name
                            .split("", 30)
                            .reduce(
                                (o, c) =>
                                    o.length === 29
                                        ? `${o}${c}...`
                                        : `${o}${c}`,
                                ""
                            )}
                    </h1>
                    <FaExternalLinkAlt />
                </div>
                <div className={CardCSS.btnEmployeeInfoContainer}>
                    <div className={CardCSS.PMInfoContainer}>
                        <img
                            src={
                                props.project.employees[0].avatar
                                    ? props.project.employees[0].avatar.url
                                    : "https://upload.wikimedia.org/wikipedia/commons/a/a0/PEGI_Online_annotated.svg"
                            }
                            alt="PM avatar"
                            className={CardCSS.PMAvatar}
                        />
                        <span className={CardCSS.PMName}>
                            {props.project.employees[0]
                                ? props.project.employees[0].name +
                                  " " +
                                  props.project.employees[0].surname
                                : ""}
                        </span>
                    </div>
                    <p className={CardCSS.EmployeeInfo}>
                        {props.project.employees.length === 1
                            ? "1 Employee"
                            : props.project.employees.length > 1 &&
                              props.project.employees.length +
                                  " Employees"}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CardProjectInfo;
//
