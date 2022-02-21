// @flow
import * as React from 'react';
type Props = {
  index: number,
  url: string,
};
export function SingleImage({ index, url }: Props) {
  return (
    <div className="h-[5em] aspect-square ml-[1em] my-[1em] relative">
      <span className="absolute top-[-0.5em] left-[-0.5em] h-[1.5em] w-[1.5em] flex justify-center items-center rounded-full text-xs bg-brand-blue-600 text-white">
        {index}
      </span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="h-full object-cover rounded border border-gray-600"
        src={url}
      />
    </div>
  );
}
