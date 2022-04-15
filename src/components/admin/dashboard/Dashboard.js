import React from "react";
import DashboardCSS from "./Dashboard.module.css";

export const Dashboard = () => {
  return (
    <div className={DashboardCSS.wrapper}>
      <div className={DashboardCSS.container}>
        <div className={DashboardCSS.row_links}></div>
      </div>
    </div>
  );
};
