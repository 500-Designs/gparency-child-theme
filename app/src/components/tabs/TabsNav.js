import React, { useContext } from 'react';
import { CurrentTabContext } from '../ResourcesTabs';
import styles from './TabsNav.module.css';

// Define the TabsNav component
const TabsNav = () => {
  const { currentTab, setCurrentTab } = useContext(CurrentTabContext);

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
  };

  return (
    <div className={styles.tabsContainer}>
      <button
        className={`${styles.tabButton} ${currentTab === 'blog' ? styles.active : ''}`}
        onClick={() => handleTabChange('blog')}
        disabled={currentTab === 'blog'}
      >
        Blog
      </button>
      <button
        className={`${styles.tabButton} ${currentTab === 'events' ? styles.active : ''}`}
        onClick={() => handleTabChange('events')}
        disabled={currentTab === 'events'}
      >
        Events
      </button>
      <button
        className={`${styles.tabButton} ${currentTab === 'glossary' ? styles.active : ''}`}
        onClick={() => handleTabChange('glossary')}
        disabled={currentTab === 'glossary'}
      >
        Glossary
      </button>
    </div>
  );
};

export default TabsNav;
