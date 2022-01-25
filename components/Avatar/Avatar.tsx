// @flow
import * as React from 'react';
import theme from '../../theme/theme.json';
type IProps = {
  name: string,
  color?: string,
};

export const Avatar = ({ name, color = theme.COLORS.blue[500] }: IProps) => {
  return (
    <span
      style={{ backgroundColor: color }}
      className=" h-8 w-8 rounded-full inline-flex justify-center items-center mr-1 text-white"
    >
      {name[0]}
    </span>
  );
};
