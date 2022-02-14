// @flow
import * as React from 'react';
import theme from '../../theme/theme.json';
type IProps = {
  name?: string,
  color?: string,
  height?: string,
  width?: string,
  className?: string,
};

export const Avatar = ({
  name = 'A',
  color = theme.COLORS.blue[500],
  height = 'h-8',
  width = 'h-8',
  className = '',
}: IProps) => {
  return (
    <span
      style={{ backgroundColor: color }}
      className={`${height} ${width} rounded-full inline-flex justify-center items-center mr-1 text-white flex-none ${className}`}
    >
      {name[0]}
    </span>
  );
};
