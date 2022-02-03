import React, { useState } from 'react';
import IconArrow from '../Icons/Icon-arrow';
import InnerMenu from './InnerMenu';

// eslint-disable-next-line no-empty-pattern
const Sidebar = ({}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  return (
    <>
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute left-[calc(var(--sidebar-width)+5px)] z-40 bg-white shadow-md text-sm top-[3px] p-1 rounded-md"
      >
        {/* {isCollapsed ? 'Open' : 'Close'} */}
        <span
          className={`transition-transform block ${
            isCollapsed ? 'rotate-0' : 'rotate-180'
          }`}
        >
          <IconArrow height={15} width={15} />
        </span>
      </button>
      <div>
        <InnerMenu isCollapsed={isCollapsed} className="shadow-lg z-40" />
      </div>
    </>
  );
};

export default Sidebar;
