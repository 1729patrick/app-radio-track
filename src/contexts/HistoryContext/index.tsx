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
  const history = useRef<RadioType[]>([]);
  const { getItem, setItem } = useAsyncStorage('@radios:history');

  const addHistory = useCallback(
    (radio: RadioType) => {
      const historyWithoutRadio = history.current.filter(
        (h) => h.id !== radio.id,
      );

      history.current = [radio, ...historyWithoutRadio];

      setItem(JSON.stringify(history.current));
    },
    [setItem],
  );

  const readHistoryFromStorage = useCallback(async () => {
    const historyFromStorage = await getItem();
    if (historyFromStorage) {
      history.current = JSON.parse(historyFromStorage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getHistory = useCallback((): RadioType[] => {
    return history.current;
  }, []);

  useEffect(() => {
    readHistoryFromStorage();
  }, [readHistoryFromStorage]);

  return (
    <HistoryContext.Provider value={{ getHistory, addHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = () => useContext(HistoryContext);
