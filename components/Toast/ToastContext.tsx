import {
  ReactChild,
  useCallback,
  useContext,
  useState,
  createContext,
} from 'react';
import ToastContainer from './Toast';

interface IToastContext {
  addToast: (content: any, type?: EToastType) => void;
  removeToast: (id: any) => void;
}

const ToastContext = createContext<IToastContext>({
  addToast: () => {
    console.log();
  },
  removeToast: () => {
    console.log();
  },
});

let id = 0;

export enum EToastType {
  INFO = 'info',
  DEFAULT = 'default',
  ERROR = 'error',
}

export interface IToast {
  id: number;
  content: string;
  type?: EToastType;
}

interface IProps {
  children: ReactChild;
}

const ToastProvider = ({ children }: IProps) => {
  const [toasts, setToasts] = useState<Array<IToast>>([]);

  const addToast = useCallback(
    (content: string, type: EToastType = EToastType.DEFAULT) => {
      setToasts((toasts: Array<IToast>) => [
        ...toasts,
        { id: id++, content, type },
      ]);
    },
    [setToasts],
  );

  const removeToast = useCallback(
    (id: number) => {
      setToasts((toasts) => toasts.filter((t) => t.id !== id));
    },
    [setToasts],
  );

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      <ToastContainer toasts={toasts} />
      {children}
    </ToastContext.Provider>
  );
};

function useToast() {
  const toastHelpers = useContext(ToastContext);
  return toastHelpers;
}

export { ToastContext, useToast };
export default ToastProvider;
