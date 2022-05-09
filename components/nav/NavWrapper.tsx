import React from 'react';
import { usePermissions } from '../../hooks/usePermissions';
import { ERoutes } from '../../models/Routes';
import { EUserPermissions } from '../../models/UserModel';
import { EIcons } from '../Icons';
import Nav from './Nav';
import { INavMenuItem } from './NavItem';

const navMenu: Array<INavMenuItem> = [
  {
    path: ERoutes.WALL,
    title: 'Wall',
    icon: EIcons.BOOK,
    exact: true,
    showIf: {
      loggedIn: true,
    },
    permissions: [EUserPermissions.CAN_VIEW_POST],
  },
  {
    path: ERoutes.ADMIN,
    title: 'Admin',
    icon: EIcons.USER_COG,
    showIf: {
      loggedIn: true,
    },
    permissions: [EUserPermissions.IS_ADMIN],
  },
  {
    path: ERoutes.USER,
    title: 'Profile',
    icon: EIcons.USER,
    showIf: {
      loggedIn: true,
    },
  },
  {
    path: ERoutes.TIMELINE,
    title: 'Timeline',
    icon: EIcons.CALENDER,
    showIf: {
      loggedIn: true,
    },
    permissions: [EUserPermissions.CAN_VIEW_POST],
  },
  {
    path: ERoutes.THEME,
    title: 'Theme',
    icon: EIcons.PALETTE,
    showIf: {
      loggedIn: true,
    },
    permissions: [EUserPermissions.IS_ADMIN],
  },
  {
    path: ERoutes.AUTH_SIGN_IN,
    title: 'Log In',
    icon: EIcons.LOCK,
    showIf: {
      loggedOut: true,
    },
  },
  {
    path: ERoutes.AUTH_SIGN_OUT,
    title: 'Log Out',
    icon: EIcons.LOCK,
    showIf: {
      loggedIn: true,
    },
  },
];

const NavWrapper = () => {
  const { userHasPermissions, isLoggedIn } = usePermissions();
  function showNavItem(navItem: INavMenuItem) {
    if (navItem.showIf?.loggedIn && isLoggedIn) {
      return false;
    }
    if (navItem.showIf?.loggedOut && !isLoggedIn) {
      return false;
    }
    if (navItem?.permissions) {
      return userHasPermissions({
        hasPermissions: navItem.permissions || [],
      });
    }
    return true;
  }

  return <Nav navMenu={navMenu.filter(showNavItem)} />;
};

export default NavWrapper;
