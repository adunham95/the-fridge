// @flow
import * as React from 'react';
import { useModal } from './ModalContext';
type Props = {
  children: React.ReactChild,
};
export function ModalContainer({ children }: Props) {
  const { setModalID } = useModal();
  return (
    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
      <div className="flex justify-end p-2">
        <button
          type="button"
          className="text-red-400 bg-transparent hover:bg-red-200 hover:text-red-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
          data-modal-toggle="popup-modal"
          onClick={() => setModalID('')}
        >
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
      <div className="p-6 pt-0 text-center">{children}</div>
    </div>
  );
}
