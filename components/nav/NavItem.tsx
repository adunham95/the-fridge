import React from 'react'
import Icon, { EIcons } from '../Icons'

interface IProps{
    title: string
    icon: EIcons
}

const NavItem = ({title, icon}: IProps) => {
    return (
        <div className='flex bg-blue-200'>
            <span><Icon name={icon}/></span>
            {title}
        </div>
    )
}

export default NavItem