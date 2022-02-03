import { useSession } from 'next-auth/react';
import { useIsomorphicEffect } from '../../hooks/useIsomorphicEffect';
import { EUserPermissions } from '../../models/UserModel';
import { EIcons } from '../Icons';
import IconLogo from '../Icons/Icon-Logo';
import NavItem, { INavMenuItem } from './NavItem';

const navMenu: Array<INavMenuItem> = [
  {
    path: '/',
    title: 'Home',
    icon: EIcons.HOME,
  },
  {
    path: '/wall',
    title: 'Wall',
    icon: EIcons.USER,
    showIf: {
      loggedIn: true,
    },
  },
  {
    path: '/admin',
    title: 'Admin',
    icon: EIcons.USER,
    showIf: {
      loggedIn: true,
    },
    permissions: [EUserPermissions.IS_ADMIN],
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
    if (navItem?.permissions) {
      const myPermissions =
        session?.user.orgs.map((o) => o.group.permissions).flat() || [];
      console.log(myPermissions);
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
            className={` max-w-[calc(var(--sidebar-width)-1rem] bg-brand-500 rounded flex py-2 ${
              isCollapsed && 'p-3 aspect-square justify-center items-center'
            }`}
          >
            <IconLogo size={isCollapsed ? 28 : 75} color="white" />
            {!isCollapsed && (
              <span className="text-white text-xl flex flex-col justify-center">
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
