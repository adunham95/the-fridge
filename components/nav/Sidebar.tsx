import React, { useState } from 'react'
import InnerMenu from './InnerMenu'


// eslint-disable-next-line no-empty-pattern
const Sidebar = ({}) => {
    const [isCollapsed, setIsCollapsed] = useState(false)
    return <>
        <button
          onClick={()=> setIsCollapsed(!isCollapsed)}
          className='absolute left-[calc(var(--sidebar-width)+10px)] z-40 bg-white shadow-md top-2 p-1 rounded-md'
        >{isCollapsed ? "Open" : "Close" }</button>
        <div>
            <InnerMenu isCollapsed={isCollapsed} className="shadow-lg z-40"/>
        </div>
    </>
}

export default Sidebar