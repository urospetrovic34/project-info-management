import React from "react";
import TabsCSS from "./Tabs.module.css";

const TabNavItem = ({ id, title, activeTab, setActiveTab }) => {
  const handleClick = () => {
    setActiveTab(id);
  };

  return (
    <li onClick={handleClick} className={activeTab === id ? TabsCSS.active : ""}>
      {title}
    </li>
  );
};
export default TabNavItem;
