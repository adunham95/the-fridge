// @flow
import React, { useEffect, useState } from 'react';
import { EToastType, IToast, useToast } from './ToastContext';
import ClientOnlyPortal from '../ClientOnlyPortal';
import Icon, { EIcons } from '../Icons';
import generatePalette from '../../util/generatePalette';

interface IPalletList {
  [key: string]: string;
}

const defaultPalette = {
  '50': '#f7f6f9',
  '100': '#efedf2',
  '200': '#d6d2e0',
  '300': '#bdb7cd',
  '400': '#8c81a7',
  '500': '#5b4b81',
  '600': '#524474',
  '700': '#443861',
  '800': '#372d4d',
  '900': '#2d253f',
};

type Props = {
  id: number,
  children: React.ReactChild,
  icon?: EIcons,
  color: string,
};
export function Toast({ children, id, icon, color = '#475569' }: Props) {
  const { removeToast } = useToast();
  const [colorPalette, setColorPalette] = useState<IPalletList>(defaultPalette);

  useEffect(() => {
    const palette = generatePalette(color);
    console.log(palette);
    setColorPalette(palette.colors);
  }, [color]);

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [id, removeToast]);

  return (
    <button
      onClick={() => {
        removeToast(id);
      }}
      style={{ background: colorPalette[100], color: colorPalette[700] }}
      className={`text-center w-full shadow-lg text-sm text-white px-3 py-2 m-1 rounded-md flex items-center`}
    >
      {icon && (
        <span className="h-6 w-6 mr-2">
          <Icon name={icon} height="auto" width="100%" />
        </span>
      )}
      {children}
    </button>
  );
}

interface IProps {
  toasts: Array<IToast>;
}

const ToastContainer = ({ toasts }: IProps) => {
  return (
    <ClientOnlyPortal>
      <div className="absolute top-[60px] sm:top-0 right-0 p-2">
        {toasts.map((item: IToast) => (
          <Toast
            key={item.id}
            id={item.id}
            color={item.color ? item.color : '#475569'}
            icon={item.icon ? item.icon : undefined}
          >
            {item.content}
          </Toast>
        ))}
      </div>
    </ClientOnlyPortal>
  );
};

export default ToastContainer;
