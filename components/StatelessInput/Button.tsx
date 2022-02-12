// @flow
import React from 'react';
type Props = {
  type?: 'button' | 'submit' | 'reset' | undefined,
  children: React.ReactChild,
  size?: 'sm' | 'md' | 'base' | 'xl',
  onClick?: () => void,
  className?: string,
  disabled?: boolean,
  rounded?: boolean,
};
export function Button({
  type = 'button',
  children,
  size = 'base',
  onClick,
  className = '',
  disabled = false,
  rounded = true,
}: Props) {
  function getButtonSize() {
    switch (size) {
      case 'sm':
        return 'px-2 py-1 text-sm';
      case 'md':
        return '';
      case 'xl':
        return '';
      default:
        return 'px-3 py-2';
    }
  }

  return (
    <button
      className={`${getButtonSize()} ${className} ${
        rounded && 'rounded-md'
      } disabled:cursor-not-allowed disabled:bg-opacity-50 `}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
