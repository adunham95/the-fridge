import React, { useEffect, useState } from 'react';
import { SpeakerphoneIcon, XIcon } from '@heroicons/react/outline';
import { useWindowSize } from '../../hooks/useWidowSize';
import { useIsomorphicEffect } from '../../hooks/useIsomorphicEffect';

interface IStyle {
  background: string;
  iconColor: string;
  text?: string;
  button: string;
  close?: string;
}

interface IStyles {
  info: IStyle;
  error: IStyle;
  warn: IStyle;
  success: IStyle;
  brand: IStyle;
}

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
  bannerType?: EBannerStyleType;
  link?: string;
  linkText?: string;
  copy: string;
  customStyles?: IStyle;
}

const styles: IStyles = {
  info: {
    background: 'bg-indigo-600',
    iconColor: 'bg-indigo-800',
    text: 'text-white',
    button: 'text-indigo-600 bg-white hover:bg-indigo-50',
    close: 'hover:bg-indigo-500 focus:ring-white',
  },
  error: {
    background: 'bg-red-600',
    iconColor: 'bg-red-800',
    text: 'text-white',
    button: 'text-red-600 bg-white hover:bg-red-50',
    close: 'hover:bg-red-500',
  },
  warn: {
    background: 'bg-amber-600',
    iconColor: 'bg-amber-800',
    text: 'text-white',
    button: 'text-amber-600 bg-white hover:bg-amber-50',
    close: 'hover:bg-yellow-500',
  },
  success: {
    background: 'bg-green-600',
    iconColor: 'bg-green-800',
    text: 'text-white',
    button: 'text-green-600 bg-white hover:bg-green-50',
    close: 'hover:bg-green-500',
  },
  brand: {
    background: 'bg-brand-600',
    iconColor: 'bg-brand-800',
    text: 'text-white',
    button: 'text-brand-600 bg-white hover:bg-brand-50',
    close: 'hover:bg-brand-500',
  },
};

const Banner = ({
  id,
  bannerType = EBannerStyleType.BRAND,
  link = '',
  linkText = 'Learn More',
  customStyles,
  copy,
}: IProps) => {
  const [bannerIds, setBannerIds] = useState([]);
  const [showBanner, setShowBanner] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const { width } = useWindowSize();
  const isomorphicEffect = useIsomorphicEffect();

  useEffect(() => {
    if (width <= 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [width]);

  isomorphicEffect(() => {
    const banners = localStorage.getItem('bannerIds');
    if (banners) {
      if (id === 'test') {
        setShowBanner(true);
        return;
      }
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

  const getStyles = (type: EBannerStyleType) => {
    switch (type) {
      case EBannerStyleType.WARN:
        return styles.warn;
      case EBannerStyleType.ERROR:
        return styles.error;
      case EBannerStyleType.SUCCESS:
        return styles.success;
      case EBannerStyleType.BRAND:
        return styles.brand;
      case EBannerStyleType.CUSTOM:
        return { ...styles.brand, ...customStyles };
      default:
        return styles.info;
    }
  };

  if (!showBanner) {
    return <></>;
  }

  return (
    <div
      className={`${getStyles(bannerType).background} z-30 sticky ${
        isMobile ? 'top-0' : 'bottom-0'
      }`}
    >
      <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between flex-wrap">
          <div className="w-0 flex-1 flex items-center">
            <span
              className={`flex p-2 rounded-lg ${
                getStyles(bannerType).iconColor
              }`}
            >
              <SpeakerphoneIcon
                className={`h-6 w-6 ${getStyles(bannerType).text}`}
                aria-hidden="true"
              />
            </span>
            <p
              className={`ml-3 font-medium truncate ${
                getStyles(bannerType).text
              }`}
            >
              <span className="md:inline">{copy}</span>
            </p>
          </div>
          {link !== '' && (
            <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
              <a
                href="#"
                className={`flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium ${
                  getStyles(bannerType).button
                }`}
              >
                {linkText}
              </a>
            </div>
          )}
          <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
            <button
              type="button"
              className={`-mr-1 flex p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2 ${
                getStyles(bannerType).close
              }`}
              onClick={closeBanner}
            >
              <span className="sr-only">Dismiss</span>
              <XIcon
                className={`h-6 w-6 ${getStyles(bannerType).text}`}
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
