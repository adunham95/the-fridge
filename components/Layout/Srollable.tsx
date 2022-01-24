import React, { ReactChild } from 'react'

interface IProps{
    children: ReactChild
}

function Scrollable({children}: IProps) {
    return (<div className="w-full h-full p-5 overflow-y-auto">
        {children}
    </div>);
}

export default Scrollable;