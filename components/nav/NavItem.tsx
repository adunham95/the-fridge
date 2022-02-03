import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Icon, { EIcons } from '../Icons';

export interface INavMenuItem {
  icon: EIcons;
  path: string;
  title: string;
  showIf?: {
    loggedIn?: boolean,
    loggedOut?: boolean,
  };
  permissions?: Array<string>;
}

interface IProps extends INavMenuItem {
  isCollapsed?: boolean;
}

const NavItem = ({
  title,
  icon,
  path,
  permissions = [],
  isCollapsed = false,
}: IProps) => {
  const [showToolTip, setShowToolTip] = useState(false);
  const router = useRouter();

  function getWrapperStyles() {
    if (isCollapsed) {
      return 'max-w-[calc(var(--sidebar-width)-1rem] h-[calc(var(--sidebar-width)-1rem)] justify-center';
    } else {
      return 'max-w-[var(--sidebar-width)] h-[calc(76px-1rem)] justify-start';
    }
  }

  function getActiveClassStyles() {
    if (router.pathname === path) {
      return 'bg-brand-400 text-white';
    } else {
      return 'text-brand-400';
    }
  }

  return (
    <Link href={path} passHref>
      <a
        onMouseEnter={() => setShowToolTip(true)}
        onMouseLeave={() => setShowToolTip(false)}
        className={`flex w-full relative items-center justify-start mb-2 border border-transparent hover:bg-brand-200 hover:bg-opacity-70 p-1 rounded hover:text-brand-500 ${getWrapperStyles()} ${getActiveClassStyles()}`}
      >
        <span className="flex items-center justify-center p-2">
          <Icon name={icon} width={28} />
        </span>
        {!isCollapsed && (
          <span className="uppercase text-left block w-full pl-1">{title}</span>
        )}
        {isCollapsed && showToolTip && (
          <div className="absolute left-[calc(var(--sidebar-width))] text-white whitespace-nowrap text-xs bg-slate-700 rounded p-1">
            <span>{title}</span>
          </div>
        )}
      </a>
    </Link>
  );
};

export default NavItem;
