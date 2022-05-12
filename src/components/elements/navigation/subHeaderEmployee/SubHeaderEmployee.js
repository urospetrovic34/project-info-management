import React from "react";
import SubHeaderEmployeeCSS from "../subHeaderEmployee/SubHeaderEmployee.module.css";
import logo from "../../../../assets/q-logo.png";
import { ordinalDate } from "../../../../utils/ordinalDate";

const SubHeaderEmployee = (props) => {
    console.log(props.project);
    let dateCreatedAt = new Date(props.project.data?.data.createdAt);
    let logoData = props.project.data?.data.logo;
    let projectManager = props.project.data?.data.employees.filter(
        (employee) => employee.role.name === "Project Manager"
    );
    return (
        <div className={SubHeaderEmployeeCSS.container}>
            <div className={SubHeaderEmployeeCSS.logo_container}>
                <img
                    src={
                        logoData !== undefined && logoData?.formats !== null
                            ? logoData?.url
                            : logo
                    }
                    alt="logo"
                    className={SubHeaderEmployeeCSS.logo}
                />
                <div className={SubHeaderEmployeeCSS.text}>
                    <h2 className={SubHeaderEmployeeCSS.title}>
                        {props.project.data?.data.name}
                    </h2>
                    <p className={SubHeaderEmployeeCSS.paragraph}>
                        {props.project.data?.data.description}
                    </p>
                </div>
            </div>
            <div className={SubHeaderEmployeeCSS.info}>
                <div>
                    <div className={SubHeaderEmployeeCSS.project_manager}>
                        <h4 className={SubHeaderEmployeeCSS.headInfo}>
                            Start Date
                        </h4>
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
                        <h4 className={SubHeaderEmployeeCSS.headInfo}>
                            Project Manager
                        </h4>
                        <img
                            src={
                                projectManager &&
                                projectManager[0].avatar !== undefined
                                    ? projectManager[0].avatar.url
                                    : logo
                            }
                            alt="logo"
                            className={SubHeaderEmployeeCSS.profile_picture}
                        />
                    </div>
                </div>
                <div>
                    <div className={SubHeaderEmployeeCSS.employees}>
                        <div>
                            <h4 className={SubHeaderEmployeeCSS.headInfo}>
                                Employees
                            </h4>
                            <div
                                className={
                                    SubHeaderEmployeeCSS.avatarEmployeeContainer
                                }
                            >
                                {props.project.data?.data.employees?.filter(
                                    (employee) =>
                                        employee.id !== projectManager[0].id
                                ).length > 0
                                    ? props.project.data?.data.employees
                                          ?.filter(
                                              (employee) =>
                                                  employee.id !==
                                                  projectManager[0].id
                                          )
                                          .map((employee) => (
                                              <img
                                                  key={employee.id}
                                                  src={
                                                      employee.avatar?.url ||
                                                      logo
                                                  }
                                                  alt="logo"
                                                  className={
                                                      SubHeaderEmployeeCSS.profile_picture
                                                  }
                                              />
                                          ))
                                          .slice(0, 3)
                                    : "No Employees added"}
                            </div>
                        </div>
                        <div>
                            <div className={SubHeaderEmployeeCSS.more}>
                                {/* +{props.project.data?.data.employees?.length.filter(
                                        (employee) =>
                                            employee.id !==
                                            projectManager[0].id
                                    ) - 3} more */}
                                {props.project.data?.data.employees?.filter(
                                    (employee) =>
                                        employee.id !== projectManager[0].id
                                ).length > 3
                                    ? "+ " +
                                      (props.project.data?.data.employees?.filter(
                                          (employee) =>
                                              employee.id !==
                                              projectManager[0].id
                                      ).length -
                                          3) +
                                      " more"
                                    : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubHeaderEmployee;
