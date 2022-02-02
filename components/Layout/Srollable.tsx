import React, { ReactChild } from 'react';
import Banner, { EBannerStyleType } from './Banner';

interface IProps {
  children: ReactChild;
  className?: string;
  isMobile: boolean;
}

const bannerData = {
  id: 'adrian',
  link: 'google.com',
  linkText: 'Test',
  copy: 'Banner Data',
  bannerType: EBannerStyleType.CUSTOM,
  customStyles: {
    background: 'bg-fuchsia-600',
    iconColor: 'bg-fuchsia-800',
    text: 'text-white',
    button: 'text-fuchsia-600 bg-white hover:bg-fuchsia-50',
    close: 'hover:bg-fuchsia-500 focus:ring-white',
  },
};

function Scrollable({ children, isMobile, className = '' }: IProps) {
  return (
    <div
      className={`w-full ${
        isMobile ? 'h-[calc(100vh-60px)]' : 'h-screen'
      } overflow-y-auto ${className}`}
    >
      {isMobile && <Banner {...bannerData} />}
      <div
        className={`py-5 ${
          isMobile ? 'min-h-[calc(100vh-60px)]' : 'min-h-screen'
        }`}
      >
        {children}
      </div>
      {!isMobile && <Banner {...bannerData} />}
    </div>
  );
}

export default Scrollable;
