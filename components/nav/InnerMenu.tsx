import { useIsomorphicEffect } from "../../hooks/useIsomorphicEffect";
import { EIcons } from "../Icons";
import NavItem, { INavMenuItem } from "./NavItem";

const navMenu: Array<INavMenuItem> = [
    {
        path: "/",
        title: "Home",
        icon: EIcons.HOME,
    },
    {
        path: "/user",
        title: "User",
        icon: EIcons.USER,
    },
]

function InnerMenu({isCollapsed = false}) {
    const isomorphicEffect = useIsomorphicEffect()

    isomorphicEffect(()=>{
        const root = document.documentElement;
        let sidebarWidth = '76px'
        if(!isCollapsed){ sidebarWidth = '208px'}
        root.style.setProperty('--sidebar-width', sidebarWidth)
    },[isCollapsed])

    return (
        <div>
            {
                navMenu.map(n => <NavItem isCollapsed={isCollapsed} key={n.path} {...n}/>)
            }
        </div>
    );
}

export default InnerMenu;
