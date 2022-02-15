import React, { ReactChild } from 'react';
import { EIcons } from '../Icons';
import Banner from './Banner';

interface IProps {
  children: ReactChild;
  className?: string;
  isMobile: boolean;
}

const bannerData = {
  id: 'test',
  link: 'google.com',
  linkText: 'Test',
  copy: 'Banner Data',
  color: '#af0606',
  icon: EIcons.BELL,
};

function Scrollable({ children, isMobile, className = '' }: IProps) {
  return (
    <div
      id="scrollable-container"
      className={`w-full ${
        isMobile ? 'h-[calc(100vh-60px)]' : 'h-screen'
      } overflow-y-auto ${className}`}
    >
      {isMobile && <Banner {...bannerData} />}
      <div
        className={`${isMobile ? 'min-h-[calc(100vh-60px)]' : 'min-h-screen'}`}
      >
        {children}
      </div>
      {!isMobile && <Banner {...bannerData} />}
    </div>
  );
}

export default Scrollable;
