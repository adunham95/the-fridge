// @flow
import * as React from 'react';
import { usePallette } from '../../hooks/usePallette';
import theme from '../../theme/theme.json';

type IProps = {
  name?: string,
  color?: string,
  height?: string,
  width?: string,
  className?: string,
  mouseToggle?: (isOver: boolean) => void,
  rounded?: boolean,
};

export const Avatar = ({
  name = 'A',
  color = theme.BASE_COLOR['brand-blue'],
  height = 'h-8',
  width = 'w-8',
  className = '',
  rounded = false,
  mouseToggle = () => {},
}: IProps) => {
  const { colorPalette } = usePallette(
    color !== '' ? color : theme.BASE_COLOR['brand-blue'],
  );

  return (
    <span
      style={{
        background: `linear-gradient(135deg, ${colorPalette[400]}, ${colorPalette[600]})`,
      }}
      onMouseEnter={() => mouseToggle(true)}
      onMouseLeave={() => mouseToggle(false)}
      className={`${height} ${width} ${
        rounded ? 'rounded-full' : 'rounded-[25%]'
      } inline-flex justify-center items-center mr-1 text-white flex-none ${className}`}
    >
      {name[0]}
    </span>
  );
};
