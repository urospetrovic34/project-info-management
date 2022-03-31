import React, { useState } from "react";
import TabsCSS from "./Tabs.module.css";
import TabNavItem from "./TabNavItem";
import TabContent from "./TabContent";

const Tabs = ({ labels, tabContent }) => {
  const [activeTab, setActiveTab] = useState("tab1");

  return (
    <div className={TabsCSS.tabs}>
      <ul className={TabsCSS.nav}>
        <TabNavItem title={labels[0]} id="tab1" activeTab={activeTab} setActiveTab={setActiveTab} />
        <TabNavItem title={labels[1]} id="tab2" activeTab={activeTab} setActiveTab={setActiveTab} />
        <TabNavItem title={labels[2]} id="tab3" activeTab={activeTab} setActiveTab={setActiveTab} />
      </ul>

      <div className={TabsCSS.outlet}>
        <TabContent id="tab1" activeTab={activeTab}>
          {tabContent}
        </TabContent>
        <TabContent id="tab2" activeTab={activeTab}>
          <p>Tab 2 works!</p>
        </TabContent>
        <TabContent id="tab3" activeTab={activeTab}>
          <p>Tab 3 works!</p>
        </TabContent>
      </div>
    </div>
  );
};

export default Tabs;
