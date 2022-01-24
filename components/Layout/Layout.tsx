import React, { ReactChild, useEffect, useState } from 'react'
import { useWindowSize } from '../../hooks/useWidowSize'
import Nav from '../nav/Nav'
import Sidebar from '../nav/Sidebar'
import Scrollable from './Srollable'

interface IProps{
    children: ReactChild
}

const Layout = ({children}: IProps) => {
    const [isMobile, setIsMobile] = useState(false)
    const {width} = useWindowSize()

    useEffect(()=>{
        if(width <= 768){
            setIsMobile(true)
        }
        else{
            setIsMobile(false)
        }
    },[width])

    return (
        <div className={`flex ${isMobile && 'flex-col'}`}>
            {isMobile ? <Nav/> : <Sidebar/> }
            <Scrollable >
            {children}
            </Scrollable>
        </div>
    )
}

export default Layout