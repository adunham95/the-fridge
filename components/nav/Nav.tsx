import React, { useState } from 'react';
import IconClose from '../Icons/Icon-Close';
import IconLogo from '../Icons/Icon-Logo';
import IconMenu from '../Icons/Icon-Menu';
import InnerMenu from './InnerMenu';

// eslint-disable-next-line no-empty-pattern
const Nav = ({}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <nav className="h-[60px] sticky top-0 shadow-lg bg-white flex items-center justify-around py-1 px-2 z-40">
        <div className="flex flex-1">
          <button
            className="flex border border-slate-500 rounded p-2"
            onClick={() => setIsMenuOpen(true)}
          >
            <IconMenu fill="grey" height={25} width={25} />
          </button>
        </div>
        <div className="flex justify-center items-center">
          <IconLogo transparent size={40} />
          <span className=" text-xl">The Fridge</span>
        </div>
        <div className="flex flex-1"></div>
      </nav>
      {isMenuOpen && (
        <div className="fixed inset-0 flex z-50">
          <div className="bg-white w-[var(--sidebar-width)] h-full">
            {/* <button onClick={() => setIsMenuOpen(false)}>Close</button> */}
            <InnerMenu showLogo={false} />
          </div>
          <button
            className="w-full h-full bg-black bg-opacity-30 relative"
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="bg-white h-[2em] absolute top-2 left-2 flex justify-center items-center p-2 rounded">
              <IconClose height={20} width={20} />
            </span>
          </button>
        </div>
      )}
    </>
  );
};

export default Nav;
