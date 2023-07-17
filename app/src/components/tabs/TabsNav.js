import React, { useContext } from 'react';
import { CurrentTabContext } from '../ResourcesTabs';
import './TabsNav.scss';

// Define the TabsNav component
const TabsNav = () => {
  const { currentTab, setCurrentTab } = useContext(CurrentTabContext);

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
  };

  return (
    <div id="TabsNav">
      <button
        className={`${currentTab === 'blog' ? 'active' : ''}`}
        onClick={() => handleTabChange('blog')}
        disabled={currentTab === 'blog'}
      >
        Blog
      </button>
      <button
        className={`${currentTab === 'events' ? 'active' : ''}`}
        onClick={() => handleTabChange('events')}
        disabled={currentTab === 'events'}
      >
        Events
      </button>
      <button
        className={`${currentTab === 'glossary' ? 'active' : ''}`}
        onClick={() => handleTabChange('glossary')}
        disabled={currentTab === 'glossary'}
      >
        Glossary
      </button>
    </div>
  );
};

export default TabsNav;
