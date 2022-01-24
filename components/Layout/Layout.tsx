import React, { ReactChild, useEffect, useState } from 'react'
import { useWindowSize } from '../../hooks/useWidowSize'
import Nav from '../nav/Nav'
import Sidebar from '../nav/Sidebar'

interface IProps{
    children: ReactChild
}

const Layout = ({children}: IProps) => {
    const [isMobile, setIsMobile] = useState(false)
    const {width} = useWindowSize()

    useEffect(()=>{
        if(width <= 768){
            setIsMobile(false)
        }
        else{
            setIsMobile(true)
        }
    },[width])

    return (
        <div>
            {isMobile ? <Nav/> : <Sidebar/> }
            <div>
                {children}
            </div>
        </div>
    )
}

export default Layout