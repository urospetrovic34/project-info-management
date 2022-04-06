import React from "react";
import TabsCSS from "./Tabs.module.css";

const TabNavItem = (props) => {

  return (
    <li onClick={props.handleActiveTab} value={props.title} className={props.activeTab === props.id ? TabsCSS.active : ""}>
      {props.title}
    </li>
  );
};
export default TabNavItem;
