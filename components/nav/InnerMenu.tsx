import { useIsomorphicEffect } from '../../hooks/useIsomorphicEffect';
import { EIcons } from '../Icons';
import IconLogo from '../Icons/Icon-Logo';
import NavItem, { INavMenuItem } from './NavItem';
import theme from '../../theme/theme.json';
import { useModal } from '../Modal/ModalContext';

interface IProps {
  isCollapsed?: boolean;
  className?: string;
  showLogo?: boolean;
  onClick?: () => void;
  navMenu: Array<INavMenuItem>;
}

function InnerMenu({
  isCollapsed = false,
  showLogo = true,
  className = '',
  onClick = () => {},
  navMenu = [],
}: IProps) {
  const isomorphicEffect = useIsomorphicEffect();
  const { setModalID } = useModal();

  isomorphicEffect(() => {
    const root = document.documentElement;
    let sidebarWidth = '76px';
    if (!isCollapsed) {
      sidebarWidth = '208px';
    }
    root.style.setProperty('--sidebar-width', sidebarWidth);
  }, [isCollapsed]);

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
                showDogFood={process.env.NODE_ENV === 'development'}
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
      {navMenu.map((n) => (
        <NavItem
          isCollapsed={isCollapsed}
          key={n.path}
          {...n}
          linkClick={onClick}
        />
      ))}
      {process.env.NEXT_PUBLIC_SHOW_SUPER_ADMIN_TOOLS && (
        <NavItem
          isCollapsed={isCollapsed}
          title="User Permissions"
          icon={EIcons.USER_SHIELD}
          path="/"
          onClick={() => {
            setModalID('userPermissions');
            onClick();
          }}
        />
      )}
    </div>
  );
}

export default InnerMenu;
