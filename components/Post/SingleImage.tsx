// @flow
import * as React from 'react';
import IconClose from '../Icons/Icon-Close';
type Props = {
  index: number,
  url: string,
  onRemove?: (url: string) => void,
};
export function SingleImage({ index, url, onRemove = () => {} }: Props) {
  const [showRemove, setShowRemove] = React.useState(false);
  return (
    <div
      className="h-[5em] aspect-square ml-[1em] my-[1em] relative"
      onMouseEnter={() => setShowRemove(true)}
      onMouseLeave={() => setShowRemove(false)}
    >
      <span className="absolute top-[-0.5em] left-[-0.5em] h-[1.5em] w-[1.5em] flex justify-center items-center rounded-full text-xs bg-brand-blue-600 text-white">
        {index}
      </span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="h-full object-cover rounded border border-gray-600"
        src={url}
      />
      {showRemove && (
        <button
          className="absolute top-[-0.5em] right-[-0.5em] h-[1.5em] w-[1.5em] bg-rose-500 flex justify-center items-center rounded-full"
          onClick={() => onRemove(url)}
        >
          <IconClose height={'1em'} width={'1em'} fill="white" />
        </button>
      )}
    </div>
  );
}
