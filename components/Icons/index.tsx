import IconHouse from "./Icon-house";
import IconUser from "./Icon-User";

export interface IIconProps{
    name: string,
    height?: number,
    width?: number
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
    switch (name) {
        case EIcons.HOME:
            return <IconHouse {...props}/>;
        case EIcons.USER:
            return <IconUser {...props}/>;
        default:
            return <></>
    }
}

export default Icon