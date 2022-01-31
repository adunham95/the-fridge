import React, { useState } from 'react';
import InnerMenu from './InnerMenu';

// eslint-disable-next-line no-empty-pattern
const Sidebar = ({}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  return (
    <>
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute left-[calc(var(--sidebar-width)+3px)] z-40 bg-white shadow-md text-sm top-[3px] p-1 rounded-md"
      >
        {isCollapsed ? 'Open' : 'Close'}
      </button>
      <div>
        <InnerMenu isCollapsed={isCollapsed} className="shadow-lg z-40" />
      </div>
    </>
  );
};

export default Sidebar;
