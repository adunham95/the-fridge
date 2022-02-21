import React, { ReactChild } from 'react';
import ClientOnlyPortal from '../ClientOnlyPortal';
import IconClose from '../Icons/Icon-Close';
import { useModal } from './ModalContext';

interface IProps {
  id: string;
  children: ReactChild;
  background?: 'transparent' | 'half' | 'full' | 'light';
  position?: 'center' | 'center bottom' | 'center top';
  className?: string;
  closeClassName?: string;
}

const Modal = ({
  id,
  children,
  background,
  position,
  className = '',
  closeClassName = '',
}: IProps) => {
  const { modalID, setModalID } = useModal();

  function setBackground() {
    switch (background) {
      case 'light':
        return 'bg-opacity-20';
      case 'half':
        return 'bg-opacity-50';
      case 'full':
        return 'bg-opacity-75';
      default:
        return 'bg-opacity-0';
    }
  }

  function setPosition() {
    switch (position) {
      case 'center top':
        return 'items-start justify-center';
      case 'center bottom':
        return 'items-end justify-center';
      default:
        return 'items-center justify-center';
    }
  }

  return id === modalID ? (
    <ClientOnlyPortal>
      <div
        id={id}
        className={`fixed z-20 top-0 left-0 h-screen w-full flex  ${setBackground()} ${setPosition()} bg-black`}
      >
        <div
          className={`relative flex flex-col items-start text-lg ${className}`}
          aria-modal
          aria-hidden
          tabIndex={-1}
          role="dialog"
        >
          <button
            type="button"
            className={`absolute right-2 -top-6 text-5xl ${closeClassName}`}
            data-dismiss="modal"
            aria-label="Close"
            onClick={() => setModalID('')}
          >
            <span aria-hidden="true">
              <IconClose height={25} width={25} />
            </span>
          </button>
          {children}
        </div>
      </div>
    </ClientOnlyPortal>
  ) : null;
};

export default Modal;
