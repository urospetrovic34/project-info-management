import React, { useState, useEffect } from "react";
import TabsCSS from "./Tabs.module.css";
import TabNavItem from "./TabNavItem";
import TabContent from "./TabContent";
import categoryHooks from "../../../hooks/query/category";

const Tabs = (props) => {
    const [activeTab, setActiveTab] = useState("");
    const categories = categoryHooks.useCategories();
    console.log(activeTab);

    const handleActiveTab = (event) => {
        console.log(event.target.innerText);
        setActiveTab(event.target.innerText);
    };

    return (
        <div className={TabsCSS.tabs}>
            <ul className={TabsCSS.nav}>
                <TabNavItem
                    title="Betmen"
                    activeTab={activeTab}
                    handleActiveTab={handleActiveTab}
                />
                <TabNavItem
                    title="Supermen"
                    activeTab={activeTab}
                    handleActiveTab={handleActiveTab}
                />
                <TabNavItem
                    title="Flash"
                    activeTab={activeTab}
                    handleActiveTab={handleActiveTab}
                />
                {/* {categories.status === "success" &&
                    categories.data?.data.map((category) => (
                        <TabNavItem
                            key={category.id}
                            title={category.attributes.name}
                            id={category.id}
                            activeTab={activeTab}
                            handleActiveTab={handleActiveTab}
                        />
                    ))} */}
                  <button>ADD</button>
            </ul>

            <div className={TabsCSS.outlet}>
                <TabContent id="tab1" activeTab={activeTab}>
                    {/* {tabContent} */}
                </TabContent>
                <TabContent id="tab2" activeTab={activeTab}>
                    {/* <p>Tab 2 works!</p> */}
                </TabContent>
                <TabContent id="tab3" activeTab={activeTab}>
                    {/* <p>Tab 3 works!</p> */}
                </TabContent>
            </div>
        </div>
    );
};

export default Tabs;
