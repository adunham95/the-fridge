import React from 'react';

interface IProps {
  children: React.ReactChild;
  margin?: string;
  padding?: string;
  display?: string;
  border?: string;
  background?: string;
  onClick?: () => void;
}

function Card({
  children,
  margin = '',
  padding = '',
  display = 'block',
  border = 'border',
  background = 'bg-white',
  onClick,
}: IProps) {
  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${display} ${border} ${background} h-full rounded transition cursor-pointer border-gray-200 hover:border-brand-400 ${margin} ${padding} hover:shadow-md shadow-brand-200`}
      >
        {children}
      </button>
    );
  }
  return (
    <div
      className={`${display} ${border} ${background} h-full rounded transition border-gray-200 hover:border-brand-400 ${margin} ${padding} hover:shadow-md shadow-brand-200`}
    >
      {children}
    </div>
  );
}

export default Card;
