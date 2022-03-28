// @flow
import * as React from 'react';
type Props = {
  title: string,
  children?: React.ReactChild,
};
export function PageBanner({ children, title }: Props) {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 flex items-center sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 inline-block w-full">
          {title}
        </h1>
        <div className="w-full" />
        <div className=" flex-shrink-0">{children}</div>
      </div>
    </header>
  );
}
