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
    return (
        <div>
            {
                navMenu.map(n => <NavItem isCollapsed={isCollapsed} key={n.path} {...n}/>)
            }
        </div>
    );
}

export default InnerMenu;
