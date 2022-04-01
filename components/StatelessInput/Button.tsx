// @flow
import React from 'react';

export enum EButtonVariation {
  SOLID = 'Solid',
  TEXT = 'Text',
}

export enum EButtonStyle {
  SUCCESS = 'Success',
  ERROR = 'Error',
  WARN = 'Warning',
  BRAND = 'Brand',
  BRAND_BLUE = 'Brand Blue',
}

interface ICustomStyle {
  bg: string;
  bgHover: string;
  text: string;
  textHover?: string;
  border?: string;
}

const Styles = {
  [EButtonStyle.SUCCESS]: {
    [EButtonVariation.SOLID]: {
      bg: 'bg-emerald-500',
      bgHover: 'hover:bg-emerald-700',
      text: 'text-white',
      textHover: 'text-white',
      border: 'transparent',
    },
    [EButtonVariation.TEXT]: {
      bg: 'transparent',
      bgHover: 'hover:bg-emerald-200',
      text: 'text-emerald-500',
      textHover: 'hover:text-emerald-700',
      border: 'transparent',
    },
  },
  [EButtonStyle.ERROR]: {
    [EButtonVariation.SOLID]: {
      bg: 'bg-rose-500',
      bgHover: 'hover:bg-rose-700',
      text: 'text-white',
      textHover: 'text-white',
      border: 'transparent',
    },
    [EButtonVariation.TEXT]: {
      bg: 'transparent',
      bgHover: 'hover:bg-rose-200',
      text: 'text-rose-500',
      textHover: 'hover:text-rose-700',
      border: 'transparent',
    },
  },
  [EButtonStyle.WARN]: {
    [EButtonVariation.SOLID]: {
      bg: 'bg-carrot-500',
      bgHover: 'hover:bg-carrot-700',
      text: 'text-white',
      textHover: 'text-white',
      border: 'transparent',
    },
    [EButtonVariation.TEXT]: {
      bg: 'transparent',
      bgHover: 'hover:bg-carrot-200',
      text: 'text-carrot-500',
      textHover: 'hover:text-carrot-700',
      border: 'transparent',
    },
  },
  [EButtonStyle.BRAND]: {
    [EButtonVariation.SOLID]: {
      bg: 'bg-brand-500',
      bgHover: 'hover:bg-brand-700',
      text: 'text-white',
      textHover: 'text-white',
      border: 'transparent',
    },
    [EButtonVariation.TEXT]: {
      bg: 'transparent',
      bgHover: 'hover:bg-brand-200',
      text: 'text-brand-500',
      textHover: 'hover:text-brand-700',
      border: 'transparent',
    },
  },
  [EButtonStyle.BRAND_BLUE]: {
    [EButtonVariation.SOLID]: {
      bg: 'bg-brand-blue-500',
      bgHover: 'hover:bg-brand-blue-700',
      text: 'text-white',
      textHover: 'text-white',
      border: 'transparent',
    },
    [EButtonVariation.TEXT]: {
      bg: 'transparent',
      bgHover: 'hover:bg-brand-blue-200',
      text: 'text-brand-blue-500',
      textHover: 'hover:text-brand-blue-700',
      border: 'transparent',
    },
  },
};

type Props = {
  type?: 'button' | 'submit' | 'reset' | undefined,
  children: React.ReactChild,
  size?: 'sm' | 'md' | 'base' | 'xl',
  onClick?: () => void,
  className?: string,
  disabled?: boolean,
  rounded?: boolean,
  buttonStyle?: EButtonStyle,
  variation?: EButtonVariation,
  label?: string,
  customStyle?: ICustomStyle,
};

export function Button({
  type = 'button',
  children,
  size = 'base',
  onClick,
  className = '',
  disabled = false,
  rounded = true,
  buttonStyle = EButtonStyle.SUCCESS,
  variation = EButtonVariation.SOLID,
  label = '',
  customStyle,
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

  function getButtonVariation() {
    const data = customStyle ? customStyle : Styles[buttonStyle][variation];

    return Object.values(data).join(' ');
  }

  return (
    <button
      className={`${getButtonSize()} ${getButtonVariation()} ${className} ${
        rounded && 'rounded-md'
      } disabled:cursor-not-allowed disabled:bg-opacity-50 font-bold`}
      type={type}
      onClick={onClick}
      disabled={disabled}
      title={label}
    >
      {children}
    </button>
  );
}
