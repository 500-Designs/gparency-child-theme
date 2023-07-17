import React, { createContext } from "react";
import TabsNav from "./tabs/TabsNav";
import Blog from "./blog/Blog";
import Events from "./events/Events";
import Glossary from "./glossary/Glossary";
import styles from "./ResourcesTabs.module.css";
import { useUrlSubfolder } from '../utils';

// Create a new context for the currentTab state
const CurrentTabContext = createContext();

// Define the ResourcesTabs component
const ResourcesTabs = () => {
  const { subfolder, updateSubfolder } = useUrlSubfolder();

  const handleTabChange = (newTab) => {
    updateSubfolder(newTab);
  };

  let currentTabContent;
  switch (subfolder) {
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
    <CurrentTabContext.Provider value={{ currentTab: subfolder, setCurrentTab: updateSubfolder }}>
      <div className={styles.resourcesTabs}>
        <TabsNav currentTab={subfolder} handleTabChange={handleTabChange} />
        {currentTabContent}
      </div>
    </CurrentTabContext.Provider>
  );
};

export default ResourcesTabs;
export { CurrentTabContext };
