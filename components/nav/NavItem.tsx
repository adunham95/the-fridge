import React from 'react'
import Icon, { EIcons } from '../Icons'

interface IProps{
    title: string
    icon: EIcons
}

const NavItem = ({title, icon}: IProps) => {
    return (
        <div>
            <span><Icon name={icon}/></span>
            {title}
        </div>
    )
}

export default NavItem