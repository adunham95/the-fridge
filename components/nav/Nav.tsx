import React, { useState } from 'react'
import IconLogo from '../Icons/Icon-Logo';
import InnerMenu from './InnerMenu';

// eslint-disable-next-line no-empty-pattern
const Nav = ({}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    return (
        <>
        <nav className='h-[60px] sticky top-0 shadow-lg bg-white flex items-center justify-around p-1'>
            <div className='flex flex-1'>
            <button className='' onClick={()=>setIsMenuOpen(true)}>Open</button>
            </div>
            <div className='flex justify-center items-center'>
                <IconLogo transparent size={40}/>
                <span className=' text-xl'>The Fridge</span>
            </div>
            <div className='flex flex-1'>

            </div>
        </nav>
        {
            isMenuOpen && <div className='fixed inset-0 bg-black bg-opacity-30'>
                <div className='bg-white w-[var(--sidebar-width)] h-full'>
            <button onClick={()=>setIsMenuOpen(false)}>Close</button>
                <InnerMenu/>
                </div>
        </div>
        }
        </>
    )
}

export default Nav;