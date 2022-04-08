import React from "react";
import SubHeaderEmployeeCSS from "../subHeaderEmployee/SubHeaderEmployee.module.css";
import logo from "../../../../assets/q-logo.png";
import { ordinalDate } from "../../../../utils/ordinalDate";

const SubHeaderEmployee = (props) => {
    let dateCreatedAt = new Date(props.project.data?.data.attributes.createdAt);

    console.log(props.project);
    return (
        <div className={SubHeaderEmployeeCSS.container}>
            <div className={SubHeaderEmployeeCSS.logo_container}>
                <img
                    src={logo}
                    alt="logo"
                    className={SubHeaderEmployeeCSS.logo}
                />
                <div>
                    <h2 className={SubHeaderEmployeeCSS.title}>
                        {props.project.data?.data.attributes.name}
                    </h2>
                    <p className={SubHeaderEmployeeCSS.paragraph}>
                        {props.project.data?.data.attributes.description}
                    </p>
                </div>
            </div>
            <div className={SubHeaderEmployeeCSS.info}>
                <div>
                    <div className={SubHeaderEmployeeCSS.project_manager}>
                        <h4>Start Date</h4>
                        <p>
                            {dateCreatedAt.toLocaleString("default", {
                                month: "short",
                            })}{" "}
                            {ordinalDate(
                                dateCreatedAt.toLocaleString("default", {
                                    day: "numeric",
                                })
                            )}{" "}
                            {dateCreatedAt.getFullYear()}
                        </p>
                    </div>
                </div>
                <div>
                    <div className={SubHeaderEmployeeCSS.project_manager}>
                        <h4>Project Manager</h4>
                        <img
                            src={logo}
                            alt="logo"
                            className={SubHeaderEmployeeCSS.profile_picture}
                        />
                    </div>
                </div>
                <div>
                    <div className={SubHeaderEmployeeCSS.employees}>
                        <h4>Employees</h4>
                        <div className={SubHeaderEmployeeCSS.profile_pictures}>
                            <img
                                src={logo}
                                alt="logo"
                                className={SubHeaderEmployeeCSS.profile_picture}
                            />
                            <img
                                src={logo}
                                alt="logo"
                                className={SubHeaderEmployeeCSS.profile_picture}
                            />
                            <img
                                src={logo}
                                alt="logo"
                                className={SubHeaderEmployeeCSS.profile_picture}
                            />
                            <span className={SubHeaderEmployeeCSS.more}>
                                +5 more
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubHeaderEmployee;
