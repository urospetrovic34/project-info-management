import React from "react";
import CardCSS from "./Card.module.css";
import Avatar from "../../../assets/q-logo.png";
import { FaExternalLinkAlt } from "react-icons/fa";
import userHooks from "../../../hooks/query/user";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";

const CardProjectInfo = (props) => {
    let logoData = props.project.attributes.logo.data;
    const findProjectManager = userHooks.useUsers(
        props.project.id,
        "project_manager"
    );
    console.log(findProjectManager);

    return (
        <div className={CardCSS.cardContainer}>
            <div className={CardCSS.avatarPMContainer}>
                <div className={CardCSS.cardAvatar}>
                    <img
                        src={logoData ? logoData.attributes.url : Avatar}
                        alt="avatar"
                        className={CardCSS.avatar}
                    />
                </div>
            </div>
            <div className={CardCSS.info_container}>
                <div className={CardCSS.headerPMInfoContainer}>
                    <h1 className={CardCSS.cardHeader}>
                        {props.project.attributes.name
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
                                Avatar
                                // findProjectManager.data
                                //     ? findProjectManager.data?.[0].avatar.url
                                //     : "https://upload.wikimedia.org/wikipedia/commons/a/a0/PEGI_Online_annotated.svg"
                            }
                            alt="PM avatar"
                            className={CardCSS.PMAvatar}
                        />
                        <span className={CardCSS.PMName}>
                            {
                                "PLACEHOLDER" /* {findProjectManager.data
                                ? findProjectManager.data?.[0].username
                                : "PROJECT MANAGER"} */
                            }
                        </span>
                    </div>
                    <p className={CardCSS.EmployeeInfo}>
                        {props.project.attributes.employees.data?.length === 1
                            ? "1 Employee" : props.project.attributes.employees.data?.length > 1 && (
                              props.project.attributes.employees.data?.length + " Employees"
                            )}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CardProjectInfo;
//
