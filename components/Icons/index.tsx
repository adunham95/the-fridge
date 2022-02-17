import IconArrow from './Icon-arrow';
import IconArrowCircle from './Icon-Arrow-Circle';
import IconBell from './Icon-Bell';
import IconBellAlert from './Icon-Bell-Alert';
import IconBook from './Icon-book';
import IconBullhorn from './Icon-Bullhorn';
import IconCalender from './Icon-Calender';
import IconCheckCircle from './Icon-Check-Circle';
import IconComment from './Icon-Comment';
import IconCowbell from './Icon-Cowbwll';
import IconExclamation from './Icon-Exclamation';
import IconExclamationTriangle from './Icon-ExlamationTriangle';
import IconExternal from './Icon-External';
import IconGear from './Icon-gear';
import IconHeart from './Icon-Heart';
import IconHouse from './Icon-house';
import IconInfo from './Icon-Info';
import IconLock from './Icon-lock';
import IconPalette from './Icon-Palette';
import IconPlane from './Icon-Plane';
import IconThumbUp from './Icon-Thumb-Up';
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
  CHECK_CIRCLE = 'CheckCircle',
  THUMB_UP = 'ThumbUp',
  PALETTE = 'Palette',
  BULLHORN = 'Bullhorn',
  ARROW_CIRCLE = ' ArrowCircle',
  ARROW = 'Arrow',
  COMMENT = 'Comment',
  EXTERNAL = 'External',
  HEART = 'Heart',
  PLANE = 'Plane',
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
    case EIcons.CHECK_CIRCLE:
      return <IconCheckCircle {...props} />;
    case EIcons.THUMB_UP:
      return <IconThumbUp {...props} />;
    case EIcons.PALETTE:
      return <IconPalette {...props} />;
    case EIcons.BULLHORN:
      return <IconBullhorn {...props} />;
    case EIcons.ARROW_CIRCLE:
      return <IconArrowCircle {...props} />;
    case EIcons.ARROW:
      return <IconArrow {...props} />;
    case EIcons.COMMENT:
      return <IconComment {...props} />;
    case EIcons.EXTERNAL:
      return <IconExternal {...props} />;
    case EIcons.HEART:
      return <IconHeart {...props} />;
    case EIcons.PLANE:
      return <IconPlane {...props} />;
    default:
      return <></>;
  }
};

export default Icon;
