import React from "react";
import SubHeaderEmployeeCSS from "../subHeaderEmployee/SubHeaderEmployee.module.css";
import logo from "../../../../assets/q-logo.png";
import { ordinalDate } from "../../../../utils/ordinalDate";

const SubHeaderEmployee = (props) => {
    let dateCreatedAt = new Date(props.project.data?.data.attributes.createdAt);
    let logoData = props.project.data?.data.attributes.logo.data;

    return (
        <div className={SubHeaderEmployeeCSS.wrapper}>
            <div className={SubHeaderEmployeeCSS.container}>
                <div className={SubHeaderEmployeeCSS.logo_container}>
                    <img
                        src={logoData ? logoData.attributes.url : logo}
                        alt="logo"
                        className={SubHeaderEmployeeCSS.logo}
                    />
                    <div className={SubHeaderEmployeeCSS.text}>
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
                                src={props.projectManagerAvatar}
                                alt="logo"
                                className={SubHeaderEmployeeCSS.profile_picture}
                            />
                        </div>
                    </div>
                    <div>
                        <div className={SubHeaderEmployeeCSS.employees}>
                            <div>
                                <h4>Employees</h4>
                                <div
                                    className={
                                        SubHeaderEmployeeCSS.profile_pictures
                                    }
                                >
                                    {props.project.data?.data.attributes.employees.data
                                        ?.filter(
                                            (employee) =>
                                                employee.id !==
                                                props.projectManagerId
                                        )
                                        .map((employee) => (
                                            <img
                                                key={employee.id}
                                                src={
                                                    employee.attributes.avatar
                                                        .data?.attributes.url ||
                                                    logo
                                                }
                                                alt="logo"
                                                className={
                                                    SubHeaderEmployeeCSS.profile_picture
                                                }
                                            />
                                        ))
                                        .slice(0, 3)}
                                </div>
                            </div>
                            <div>
                                <div className={SubHeaderEmployeeCSS.more}>
                                    +
                                    {props.project.data?.data.attributes
                                        .employees.data?.length - 3}{" "}
                                    more
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubHeaderEmployee;
