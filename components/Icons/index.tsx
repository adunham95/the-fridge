import IconBell from './Icon-Bell';
import IconBellAlert from './Icon-Bell-Alert';
import IconBook from './Icon-book';
import IconCalender from './Icon-Calender';
import IconCowbell from './Icon-Cowbwll';
import IconExclamation from './Icon-Exclamation';
import IconExclamationTriangle from './Icon-ExlamationTriangle';
import IconGear from './Icon-gear';
import IconHouse from './Icon-house';
import IconInfo from './Icon-Info';
import IconLock from './Icon-lock';
import IconUser from './Icon-User';
import IconWarning from './Icon-Warning';

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
  BELL = 'Bell',
  Bell_ALERT = 'BellAlert',
  EXCLAMATION = 'Exclamation',
  EXCLAMATION_TRIANGLE = 'ExclamationTriangle',
  COWBELL = 'Cowbell',
  WARNING = 'Warning',
  INFO = 'Info',
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
    case EIcons.BELL:
      return <IconBell {...props} />;
    case EIcons.Bell_ALERT:
      return <IconBellAlert {...props} />;
    case EIcons.EXCLAMATION:
      return <IconExclamation {...props} />;
    case EIcons.EXCLAMATION_TRIANGLE:
      return <IconExclamationTriangle {...props} />;
    case EIcons.COWBELL:
      return <IconCowbell {...props} />;
    case EIcons.WARNING:
      return <IconWarning {...props} />;
    case EIcons.INFO:
      return <IconInfo {...props} />;
    default:
      return <></>;
  }
};

export default Icon;
