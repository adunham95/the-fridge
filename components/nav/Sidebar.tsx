import React, { useState } from 'react'
import InnerMenu from './InnerMenu'


// eslint-disable-next-line no-empty-pattern
const Sidebar = ({}) => {
    const [isCollapsed, setIsCollapsed] = useState(false)
    return <>
        <button
          onClick={()=> setIsCollapsed(!isCollapsed)}
          className='absolute left-[calc(var(--sidebar-width)+10px)]'
        >{isCollapsed ? "Open" : "Close" }</button>
        <div>
            <InnerMenu isCollapsed={isCollapsed} className="shadow-lg"/>
        </div>
    </>
}

export default Sidebar