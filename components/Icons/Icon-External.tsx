import React from 'react';
import { IIconProps } from '.';

const IconExternal = (props: IIconProps) => {
  return (
    <svg
      height={props.height}
      width={props.width}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="user"
      className="svg-inline--fa fa-user fa-w-14"
      role="img"
      viewBox="0 0 512 512"
    >
      <path
        fill="currentColor"
        d="M448 80v352c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h352c26.51 0 48 21.49 48 48zm-64 47.111C384 109.929 370.071 96 352.889 96H220.667c-12.887 0-23.333 10.447-23.333 23.334v14.904c0 13.138 10.843 23.686 23.976 23.324l56.002-1.588L69.908 361.908c-7.858 7.802-7.88 20.504-.05 28.334l19.899 19.899c7.83 7.83 20.532 7.808 28.334-.05l205.935-207.404-1.588 56.003c-.362 13.133 10.186 23.976 23.324 23.976h14.904c12.887 0 23.334-10.447 23.334-23.333V127.111z"
      />
    </svg>
  );
};

export default IconExternal;
