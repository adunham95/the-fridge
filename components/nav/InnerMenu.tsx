import { useSession } from 'next-auth/react';
import { useIsomorphicEffect } from '../../hooks/useIsomorphicEffect';
import { EUserPermissions } from '../../models/UserModel';
import { EIcons } from '../Icons';
import IconLogo from '../Icons/Icon-Logo';
import NavItem, { INavMenuItem } from './NavItem';
import theme from '../../theme/theme.json';

const navMenu: Array<INavMenuItem> = [
  {
    path: '/',
    title: 'Home',
    icon: EIcons.HOME,
    exact: true,
  },
  {
    path: '/wall',
    title: 'Wall',
    icon: EIcons.BOOK,
    showIf: {
      loggedIn: true,
    },
  },
  {
    path: '/admin',
    title: 'Admin',
    icon: EIcons.GEAR,
    showIf: {
      loggedIn: true,
    },
    permissions: [EUserPermissions.IS_ADMIN],
  },
  {
    path: '/api/auth/signin',
    title: 'Log In',
    icon: EIcons.LOCK,
    showIf: {
      loggedOut: true,
    },
  },
  {
    path: '/api/auth/signout',
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
      const myPermissions =
        session?.user.orgs.map((o) => o.group.permissions).flat() || [];
      const found = myPermissions.some((r) =>
        (navItem?.permissions || []).includes(r),
      );
      return found;
    }
    return true;
  }

  return (
    <div className={`p-2 h-screen min-w-[var(--sidebar-width)] ${className}`}>
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
