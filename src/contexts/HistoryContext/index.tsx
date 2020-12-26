import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { RadioType } from '~/types/Station';

type ContextProps = {
  addHistory: (arg: RadioType) => void;
  getHistory: () => RadioType[];
};

const HistoryContext = createContext<ContextProps>({
  addHistory: () => {},
  getHistory: () => [],
});

export const HistoryProvider: React.FC = ({ children }) => {
  const historyRef = useRef<RadioType[]>([]);
  const { getItem, setItem } = useAsyncStorage('@radios:history');

  const addHistory = useCallback(
    (radio: RadioType) => {
      const historyRefWithoutRadio = historyRef.current.filter(
        (h) => h.id !== radio.id,
      );

      historyRef.current = [radio, ...historyRefWithoutRadio];

      setItem(JSON.stringify(historyRef.current));
    },
    [setItem],
  );

  const readHistoryFromStorage = useCallback(async () => {
    const historyRefFromStorage = await getItem();
    if (historyRefFromStorage) {
      historyRef.current = JSON.parse(historyRefFromStorage);
    }
  }, [getItem]);

  const getHistory = useCallback((): RadioType[] => {
    return historyRef.current;
  }, []);

  useEffect(() => {
    readHistoryFromStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <HistoryContext.Provider value={{ getHistory, addHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = () => useContext(HistoryContext);
