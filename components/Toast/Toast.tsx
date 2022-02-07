// @flow
import React, { useEffect } from 'react';
import { EToastType, IToast, useToast } from './ToastContext';
import ClientOnlyPortal from '../ClientOnlyPortal';

type Props = {
  id: number,
  children: React.ReactChild,
  type?: EToastType,
};
export function Toast({ children, id, type }: Props) {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [id, removeToast]);

  function setTypeStyles() {
    switch (type) {
      case EToastType.INFO:
        return 'bg-brand-600 shadow-brand-900';
      default:
        return 'bg-slate-900 shadow-slate-600';
    }
  }

  return (
    <div
      className={`${setTypeStyles()} shadow-lg text-sm text-white px-3 py-2 m-1 rounded-md`}
    >
      {children}
    </div>
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
          <Toast key={item.id} id={item.id} type={item.type}>
            {item.content}
          </Toast>
        ))}
      </div>
    </ClientOnlyPortal>
  );
};

export default ToastContainer;
