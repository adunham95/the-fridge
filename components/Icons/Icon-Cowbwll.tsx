import React from 'react';
import { IIconProps } from '.';

const IconCowbell = (props: IIconProps) => {
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
      viewBox="0 0 448 512"
    >
      <path
        fill="currentColor"
        d="M384.19 122.35A32 32 0 0 0 352.64 96h-16V48a48.1 48.1 0 0 0-48.12-48H160.29a48.1 48.1 0 0 0-48.09 48v48H95.36a32 32 0 0 0-31.55 26.35l-63.3 352A32 32 0 0 0 32.07 512h383.86a32 32 0 0 0 31.56-37.65zM144.2 48a16.07 16.07 0 0 1 16.09-16h128.23a16.07 16.07 0 0 1 16.09 16v48H144.2zM32 480l63.36-352H352.7l63.23 352z"
      />
    </svg>
  );
};

export default IconCowbell;
