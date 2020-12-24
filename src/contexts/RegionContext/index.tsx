import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

const STATES = {
  EMPTY: 'empty',
  REQUEST_LATER: 'request_later',
};

type ContextProps = {
  regionId: string;
  STATES: { EMPTY: string; REQUEST_LATER: string };
  setRegionId: (regionId: string) => void;
};

const RegionContext = createContext<ContextProps>({
  regionId: STATES.EMPTY,
  STATES,
  setRegionId: () => {},
});

export const RegionProvider: React.FC = ({ children }) => {
  const [id, setId] = useState('');
  const { getItem, setItem } = useAsyncStorage('@regions:region');

  const setRegionId = useCallback(
    (regionId: string) => {
      setId(regionId);
      setItem(regionId);
    },
    [setItem],
  );

  const readRegionFromStorage = useCallback(async () => {
    const regionId = await getItem();
    setId(STATES.EMPTY);
  }, [getItem]);

  useEffect(() => {
    readRegionFromStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <RegionContext.Provider value={{ regionId: id, setRegionId, STATES }}>
      {children}
    </RegionContext.Provider>
  );
};

export const useRegion = () => useContext(RegionContext);
