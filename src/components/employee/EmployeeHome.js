import React from "react";
// import Header from "../elements/navigation/header/Header";
import EmployeeCSS from "./Employee.module.css";
// import SubHeaderEmployee from "../elements/navigation/subHeaderEmployee/SubHeaderEmployee";
import SubHeader from "../elements/navigation/subHeader/SubHeader";
import CardProjectInfo from "../elements/cards/CardProjectInfo";

const EmployeeHome = () => {
  return (
    <div className={EmployeeCSS.container}>
      <SubHeader />
      <div className={EmployeeCSS.contentContainer}>
        <CardProjectInfo />
        <CardProjectInfo />
      </div>
    </div>
  );
};
export default EmployeeHome;
