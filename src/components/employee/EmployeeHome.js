import React from "react";
import Header from "../elements/navigation/header/Header";
import EmployeeCSS from "./Employee.module.css";
import SubHeaderEmployee from "../elements/navigation/subHeaderEmployee/SubHeaderEmployee";
import SubHeader from "../elements/navigation/subHeader/SubHeader";

const EmployeeHome = () => {
  return (
    <div className={EmployeeCSS.container}>
      <Header />
      <SubHeader />
    </div>
  );
};
export default EmployeeHome;
