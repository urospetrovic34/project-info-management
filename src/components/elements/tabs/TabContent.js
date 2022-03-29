import React from "react";
import TabsCSS from "./Tabs.module.css";

const TabContent = ({ id, activeTab, children }) => {
  return activeTab === id ? <div className={TabsCSS.tabContent}>{children}</div> : null;
};

export default TabContent;
