import React from 'react';

interface IProps {
  children: React.ReactChild;
  margin?: string;
  padding?: string;
  display?: string;
  border?: string;
  background?: string;
}

function Card({
  children,
  margin = '',
  padding = '',
  display = 'block',
  border = 'border',
  background = 'bg-white',
}: IProps) {
  return (
    <div
      className={`${display} ${border} ${background} h-full rounded transition cursor-pointer border-gray-200 hover:border-brand-400 ${margin} ${padding} hover:shadow-md shadow-brand-200`}
    >
      {children}
    </div>
  );
}

export default Card;
