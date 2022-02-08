import React, { createContext, ReactChild, useContext, useState } from 'react';

interface IModalContext {
  modalID: string;
  setModalID: (id: string) => void;
}

const ModalContext = createContext<IModalContext>({
  modalID: '',
  setModalID: () => {
    console.log();
  },
});

interface IProps {
  children: ReactChild;
}

const ModalProvider = ({ children }: IProps) => {
  const [modalID, setModalID] = useState('');
  return (
    <ModalContext.Provider value={{ modalID, setModalID }}>
      {children}
    </ModalContext.Provider>
  );
};

function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider');
  }
  return context;
}

export { ModalProvider, useModal };
