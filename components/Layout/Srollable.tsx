import React, { ReactChild } from 'react'

interface IProps{
    children: ReactChild,
    className?: string
}

function Scrollable({children, className = ""}: IProps) {
    return (<div className={`w-full h-full p-5 overflow-y-auto ${className}`}>
        {children}
    </div>);
}

export default Scrollable;