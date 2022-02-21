import { useSession } from 'next-auth/react';
import { useIsomorphicEffect } from '../../hooks/useIsomorphicEffect';
import { EUserPermissions } from '../../models/UserModel';
import { EIcons } from '../Icons';
import IconLogo from '../Icons/Icon-Logo';
import NavItem, { INavMenuItem } from './NavItem';
import theme from '../../theme/theme.json';
import { ERoutes } from '../../models/Routes';
import { usePermissions } from '../../hooks/usePermissions';

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
    icon: EIcons.GEAR,
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

interface IProps {
  isCollapsed?: boolean;
  className?: string;
  showLogo?: boolean;
}

function InnerMenu({
  isCollapsed = false,
  showLogo = true,
  className = '',
}: IProps) {
  const isomorphicEffect = useIsomorphicEffect();
  const { data: session } = useSession();
  const { userHasPermissions } = usePermissions();

  isomorphicEffect(() => {
    const root = document.documentElement;
    let sidebarWidth = '76px';
    if (!isCollapsed) {
      sidebarWidth = '208px';
    }
    root.style.setProperty('--sidebar-width', sidebarWidth);
  }, [isCollapsed]);

  function showNavItem(navItem: INavMenuItem) {
    if (navItem.showIf?.loggedIn && !session?.user) {
      return false;
    }
    if (navItem.showIf?.loggedOut && session?.user) {
      return false;
    }
    if (navItem?.permissions) {
      // const myPermissions =
      //   session?.user.orgs.map((o) => o.group.permissions).flat() || [];
      // const found = myPermissions.some((r) =>
      //   (navItem?.permissions || []).includes(r),
      // );
      // return found;
      return userHasPermissions({
        hasPermissions: navItem.permissions || [],
      });
    }
    return true;
  }

  return (
    <div
      className={`p-2 h-screen min-w-[var(--sidebar-width)] bg-white ${className}`}
    >
      {showLogo && (
        <div className="pb-2">
          <span
            className={` max-w-[calc(var(--sidebar-width)-1rem]  rounded flex p-2 ${
              isCollapsed &&
              'p-2 aspect-square justify-center items-center bg-brand-400'
            }`}
          >
            <span className="flex items-center justify-center p-2">
              <IconLogo
                size={28}
                color={isCollapsed ? 'white' : theme.COLORS.brand[400]}
              />
            </span>
            {!isCollapsed && (
              <span className="text-brand-400 text-xl flex flex-col justify-center">
                The Fridge
              </span>
            )}
          </span>
        </div>
      )}
      {navMenu.filter(showNavItem).map((n) => (
        <NavItem isCollapsed={isCollapsed} key={n.path} {...n} />
      ))}
    </div>
  );
}

export default InnerMenu;
