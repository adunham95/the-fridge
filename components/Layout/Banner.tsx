import React, { useEffect, useState } from 'react';
import { SpeakerphoneIcon, XIcon } from '@heroicons/react/outline';
import { useWindowSize } from '../../hooks/useWidowSize';
import { useIsomorphicEffect } from '../../hooks/useIsomorphicEffect';
import generatePalette, { getTextColor } from '../../util/generatePalette';
import Icon, { EIcons } from '../Icons';

export enum EBannerStyleType {
  WARN = 'warn',
  ERROR = 'error',
  INFO = 'info',
  SUCCESS = 'success',
  CUSTOM = 'custom',
  BRAND = 'brand',
}

interface IProps {
  id: string;
  link?: string;
  linkText?: string;
  copy: string;
  color: string;
  icon: EIcons;
}

interface IPalletList {
  [key: string]: string;
}

const defaultPalette = {
  '50': '#f7f6f9',
  '100': '#efedf2',
  '200': '#d6d2e0',
  '300': '#bdb7cd',
  '400': '#8c81a7',
  '500': '#5b4b81',
  '600': '#524474',
  '700': '#443861',
  '800': '#372d4d',
  '900': '#2d253f',
};

const Banner = ({
  id,
  link = '',
  linkText = 'Learn More',
  icon,
  copy,
  color,
}: IProps) => {
  const [bannerIds, setBannerIds] = useState([]);
  const [showBanner, setShowBanner] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { width } = useWindowSize();
  const isomorphicEffect = useIsomorphicEffect();
  const [colorPalette, setColorPalette] = useState<IPalletList>(defaultPalette);

  useEffect(() => {
    if (width <= 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [width]);

  useEffect(() => {
    const palette = generatePalette(color);
    setColorPalette(palette.colors);
  }, [color]);

  isomorphicEffect(() => {
    if (id === 'test') {
      setShowBanner(true);
      return;
    }
    const banners = localStorage.getItem('bannerIds');
    if (banners) {
      const selectedBanners = JSON.parse(banners);
      setBannerIds(selectedBanners);
      if (!selectedBanners.includes(id)) {
        setShowBanner(true);
      }
      if (id === '') setShowBanner(false);
    }
  }, []);

  const closeBanner = () => {
    setShowBanner(false);
    localStorage.setItem('bannerIds', JSON.stringify([...bannerIds, id]));
  };

  if (!showBanner) {
    return <></>;
  }

  return (
    <div
      style={{ background: colorPalette[600] }}
      className={`z-30 sticky ${isMobile ? 'top-0' : 'bottom-0'}`}
    >
      <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between flex-wrap">
          <div className="w-0 flex-1 flex items-center">
            <span
              style={{ background: colorPalette[800] }}
              className={`flex p-2 rounded-lg`}
            >
              <span
                style={{ color: getTextColor(colorPalette[500]) }}
                className="h-6 w-6"
              >
                <Icon height="auto" width="100%" name={icon} />
              </span>
            </span>
            <p
              style={{ color: getTextColor(colorPalette[500]) }}
              className={`ml-3 font-medium truncate`}
            >
              <span className="md:inline">{copy}</span>
            </p>
          </div>
          {link !== '' && (
            <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
              <a
                style={{
                  background: getTextColor(colorPalette[500]),
                  color: colorPalette[500],
                }}
                href="#"
                className={`flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium`}
              >
                {linkText}
              </a>
            </div>
          )}
          <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
            <button
              type="button"
              className={`-mr-1 flex p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2`}
              onClick={closeBanner}
            >
              <span className="sr-only">Dismiss</span>
              <XIcon
                style={{ color: colorPalette[800] }}
                className={`h-6 w-6`}
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
