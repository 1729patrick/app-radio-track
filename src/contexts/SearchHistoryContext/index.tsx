import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

type ContextProps = {
  addSearchHistory: (searchTerm: string) => void;
  getSearchHistory: () => string[];
};

const SearchHistoryContext = createContext<ContextProps>({
  addSearchHistory: () => {},
  getSearchHistory: () => [],
});

export const SearchHistoryProvider: React.FC = ({ children }) => {
  const searchHistoryRef = useRef<string[]>([]);
  const { getItem, setItem } = useAsyncStorage('@radios:search:history');

  const addSearchHistory = useCallback(
    (searchTerm: string) => {
      const historyWithoutRadio = searchHistoryRef.current.filter(
        (search) => search !== searchTerm,
      );
      searchHistoryRef.current = [searchTerm, ...historyWithoutRadio].slice(
        0,
        5,
      );

      setItem(JSON.stringify(searchHistoryRef.current));
    },
    [setItem],
  );

  const readSearchHistoryFromStorage = useCallback(async () => {
    const historyFromStorage = await getItem();
    if (historyFromStorage) {
      searchHistoryRef.current = JSON.parse(historyFromStorage);
    }
  }, [getItem]);

  const getSearchHistory = useCallback((): string[] => {
    return searchHistoryRef.current;
  }, []);

  useEffect(() => {
    readSearchHistoryFromStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SearchHistoryContext.Provider
      value={{ getSearchHistory, addSearchHistory }}>
      {children}
    </SearchHistoryContext.Provider>
  );
};

export const useSearchHistory = () => useContext(SearchHistoryContext);
