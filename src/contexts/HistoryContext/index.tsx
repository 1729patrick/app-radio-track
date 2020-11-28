import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { RadioType } from '~/types/Station';

type ContextProps = {
  addHistory: (arg: RadioType) => void;
  history: RadioType[];
};

const HistoryContext = createContext<ContextProps>({
  addHistory: () => {},
  history: [],
});

export const HistoryProvider: React.FC = ({ children }) => {
  const [history, setHistory] = useState<RadioType[]>([]);
  const { getItem, setItem } = useAsyncStorage('@radios:history');

  const addHistory = (radio: RadioType) => {
    setTimeout(() => {
      setHistory((history) => {
        if (history.find((h) => h.id === radio.id)) {
          return history;
        }

        const newHistory = [radio, ...history];
        setItem(JSON.stringify(newHistory));

        return newHistory;
      });
    }, 1000);
  };

  const readHistoryFromStorage = useCallback(async () => {
    const historyFromStorage = await getItem();
    if (historyFromStorage) {
      setHistory(JSON.parse(historyFromStorage));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    readHistoryFromStorage();
  }, [readHistoryFromStorage]);

  return (
    <HistoryContext.Provider value={{ history, addHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = () => useContext(HistoryContext);
