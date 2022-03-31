import React from "react";
import Input from "../elements/input/Input";
import EmployeeCSS from "./Employee.module.css";
import { Select } from "../elements/select/Select";
import CardProjectManagement from "../elements/cards/CardProjectManagement";
const EmployeeFirstTab = () => {
  const sortEmployeeOptions = [
    { value: "", label: "Option-1" },
    { value: "", label: "Option-2" },
    { value: "", label: "Option-3" },
    { value: "", label: "Option-4" },
  ];
  return (
    <div className={EmployeeCSS.employeeFirstTabContainer}>
      <div className={EmployeeCSS.inputWrapper}>
        <Input />
        <div className={EmployeeCSS.customSort}>
          <Select placeholder="Sort by..." options={sortEmployeeOptions} multi={false} />
        </div>
      </div>
      <div className={EmployeeCSS.cardWrapper}>
        <CardProjectManagement />
        <CardProjectManagement />
      </div>
    </div>
  );
};
export default EmployeeFirstTab;
