import React, { createContext, useState } from "react";
import TabsNav from "./tabs/TabsNav";
import Blog from "./tabs/Blog";
import Events from "./tabs/Events";
import Glossary from "./tabs/Glossary";
import styles from "./ResourcesTabs.module.css";

// Create a new context for the currentTab state
const CurrentTabContext = createContext();

// Define the ResourcesTabs component
const ResourcesTabs = () => {
  const [currentTab, setCurrentTab] = useState("blog");

  let currentTabContent;
  switch (currentTab) {
    case "blog":
      currentTabContent = <Blog />;
      break;
    case "events":
      currentTabContent = <Events />;
      break;
    case "glossary":
      currentTabContent = <Glossary />;
      break;
    default:
      currentTabContent = null;
  }

  return (
    <CurrentTabContext.Provider value={{ currentTab, setCurrentTab }}>
      <div className={styles.resourcesTabs}>
        <TabsNav />
        {currentTabContent}
      </div>
    </CurrentTabContext.Provider>
  );
};

export default ResourcesTabs;
export { CurrentTabContext };
