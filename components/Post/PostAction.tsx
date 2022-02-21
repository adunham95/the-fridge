// @flow
import React, { useState } from 'react';
import Icon, { EIcons } from '../Icons';
type Props = {
  onClick: () => void,
  className?: string,
  icon: EIcons,
  children?: React.ReactChild,
  actionName: string,
};
export function PostActionButton({
  onClick,
  className = '',
  icon,
  children,
  actionName,
}: Props) {
  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <>
      <button
        className={`flex items-center h-[1em] mr-2 text-xl md:text-base relative ${className}`}
        onClick={onClick}
        onMouseOver={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <Icon width={'100%'} height={'1em'} name={icon} />
        {children}
        {showTooltip && (
          <span className="absolute p-[0.5em] leading-[1] rounded bottom-[-150%] left-[50%] translate-x-[-50%] bg-gray-700 text-white text-[10px]">
            {actionName}
          </span>
        )}
      </button>
    </>
  );
}
