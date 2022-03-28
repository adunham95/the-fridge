// @flow
import React from 'react';

export enum EButtonStyle {
  SUCCESS = 'Success',
  ERROR = 'Error',
  WARN = 'Warning',
  BRAND = 'Brand',
  BRAND_BLUE = 'Brand_Blue',
  CUSTOM = 'custom',
}
type Props = {
  type?: 'button' | 'submit' | 'reset' | undefined,
  children: React.ReactChild,
  size?: 'sm' | 'md' | 'base' | 'xl',
  onClick?: () => void,
  className?: string,
  disabled?: boolean,
  rounded?: boolean,
  buttonStyle?: EButtonStyle,
  label?: string,
};
export function Button({
  type = 'button',
  children,
  size = 'base',
  onClick,
  className = '',
  disabled = false,
  rounded = true,
  buttonStyle = EButtonStyle.CUSTOM,
  label = '',
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

  function getButtonStyle() {
    switch (buttonStyle) {
      case EButtonStyle.SUCCESS:
        return 'bg-emerald-500 text-white';
      case EButtonStyle.ERROR:
        return 'bg-rose-500 hover:bg-rose-700 text-white';
      case EButtonStyle.WARN:
        return 'bg-carrot-500 hover:bg-carrot-700 text-white';
      case EButtonStyle.BRAND:
        return 'bg-brand-500 hover:bg-brand-700 text-white';
      case EButtonStyle.BRAND_BLUE:
        return 'bg-brand-blue-500 hover:bg-brand-blue-700 text-white';
      default:
        return '';
    }
  }

  return (
    <button
      className={`${getButtonSize()} ${getButtonStyle()} ${className} ${
        rounded && 'rounded-md'
      } disabled:cursor-not-allowed disabled:bg-opacity-50 `}
      type={type}
      onClick={onClick}
      disabled={disabled}
      title={label}
    >
      {children}
    </button>
  );
}
