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
    const [showToolTip, setShowToolTip] = useState(false);

    function getWrapperStyles(){
        if(isCollapsed){
            return 'max-w-[calc(var(--sidebar-width)-1rem] h-[calc(var(--sidebar-width)-1rem)] justify-center'
        }
        else{
            return 'max-w-[var(--sidebar-width)] h-[calc(76px-1rem)] justify-start'
        }
    }

    return (
        <div 
          onMouseEnter={()=>setShowToolTip(true)}
          onMouseLeave={()=>setShowToolTip(false)}
          className={`flex w-full relative items-center justify-start mb-2 border border-transparent hover:bg-brand-400 hover:bg-opacity-70 p-1 rounded text-brand-400 hover:text-white hover:fill-white ${getWrapperStyles()}`}
        >
            <span className='flex items-center justify-center p-2'><Icon name={icon} width={28}/></span>
            {
                !isCollapsed &&
                <span className='uppercase font-semibold text-left block w-full pl-1'>
                    {title}
                </span>
            }
            {
                (isCollapsed && showToolTip) && 
                <div className='absolute left-[calc(var(--sidebar-width))] text-white text-xs bg-slate-700 rounded p-1'>
                    <span>{title}</span>
                </div>
            }
        </div>
    )
}

export default NavItem