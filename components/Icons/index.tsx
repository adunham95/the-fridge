import IconHouse from "./Icon-house";
import IconUser from "./Icon-User";

export interface IIconProps{
    name: string,
    height?: number
}

export enum EIcons{
    HOME = 'Home',
    USER = 'User'
} 

export const IconList = Object.values(EIcons);

const Icon = (props: IIconProps) => {
    const {
        name,
    } = props
    const defaults = {
        height: 50,
    }
    switch (name) {
        case EIcons.HOME:
            return <IconHouse {...defaults} {...props}/>;
        case EIcons.USER:
            return <IconUser {...defaults} {...props}/>;
        default:
            return <></>
    }
}

export default Icon