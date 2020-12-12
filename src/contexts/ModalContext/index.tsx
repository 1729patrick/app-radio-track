import React, { createContext, useCallback, useContext, useRef } from 'react';
import Animated, { useSharedValue } from 'react-native-reanimated';
import Congratulation from '~/components/Congratulation';

type ContextProps = {};

const ModalContext = createContext<ContextProps>({});

export const ModalProvider: React.FC = ({ children }) => {
  return (
    <ModalContext.Provider value={{}}>
      {children}
      <Congratulation />
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
