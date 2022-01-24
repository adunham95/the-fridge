import React, { useState } from 'react'
import Icon, { EIcons } from '../Icons'

export interface INavMenuItem{
    icon: EIcons,
    path: string,
    title: string,
} 

interface IProps extends INavMenuItem{
    isCollapsed?: boolean
}

const NavItem = ({title, icon, isCollapsed = false}: IProps) => {
    const [showToolTip, setShowToolTip] = useState(false)
    return (
        <div 
          onMouseEnter={()=>setShowToolTip(true)}
          onMouseLeave={()=>setShowToolTip(false)}
          className={`flex w-full relative items-center justify-start mt-2 border border-transparent text-black bg-blue-400 h-10 p-1 ${isCollapsed ? 'max-w-[30px]' :'max-w-[var(--sidebar-width)]'}`}
        >
            <span className='flex items-center justify-center'><Icon name={icon} height={20}/></span>
            {
                !isCollapsed &&
                <span className='uppercase font-semibold text-left block w-full pl-1'>
                    {title}
                </span>
            }
            {
                (isCollapsed && showToolTip) && 
                <div className='absolute left-[calc(var(--sidebar-width))]'>
                    <span>{title}</span>
                </div>
            }
        </div>
    )
}

export default NavItem