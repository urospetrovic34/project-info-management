import React from "react";
import SubHeaderEmployee from "../elements/navigation/subHeaderEmployee/SubHeaderEmployee";
import Tabs from "../elements/tabs/Tabs";
import EmployeeCSS from "./Employee.module.css";
import EmployeeFirstTab from "./EmployeeFirstTab";

const EmployeeProjectView = () => {
  const labels = ["Project Management", "Development", "DevOps"];

  return (
    <div className={EmployeeCSS.container}>
      <SubHeaderEmployee />
      <Tabs labels={labels} tabContent={<EmployeeFirstTab />} />
    </div>
  );
};

export default EmployeeProjectView;
