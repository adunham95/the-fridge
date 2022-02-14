import IconBook from './Icon-book';
import IconCalender from './Icon-Calender';
import IconGear from './Icon-gear';
import IconHouse from './Icon-house';
import IconLock from './Icon-lock';
import IconUser from './Icon-User';

export interface IIconProps {
  name?: string;
  height?: number | '100%' | 'auto';
  width?: number | '100%' | 'auto';
  fill?: string;
}

export enum EIcons {
  HOME = 'Home',
  USER = 'User',
  BOOK = 'Book',
  GEAR = 'Gear',
  LOCK = 'Lock',
  CALENDER = 'Calender',
}

export const IconList = Object.values(EIcons);

const Icon = (props: IIconProps) => {
  const { name } = props;
  switch (name) {
    case EIcons.HOME:
      return <IconHouse {...props} />;
    case EIcons.USER:
      return <IconUser {...props} />;
    case EIcons.BOOK:
      return <IconBook {...props} />;
    case EIcons.GEAR:
      return <IconGear {...props} />;
    case EIcons.LOCK:
      return <IconLock {...props} />;
    case EIcons.CALENDER:
      return <IconCalender {...props} />;
    default:
      return <></>;
  }
};

export default Icon;
